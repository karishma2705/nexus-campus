import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, randomInt, randomUUID, createHmac, timingSafeEqual } from 'node:crypto';
import { deflateRawSync } from 'node:zlib';
import { DatabaseSync } from 'node:sqlite';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
function loadDotEnv() {
  const filename = path.join(ROOT, '.env');
  if (!fs.existsSync(filename)) return;
  for (const line of fs.readFileSync(filename, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !Object.hasOwn(process.env, match[1])) process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
loadDotEnv();
const PORT = Number(process.env.PORT || 5173);
const PROD = process.env.NODE_ENV === 'production';
const SESSION_SECRET = process.env.SESSION_SECRET || (!PROD ? 'local-development-only-change-before-deploy' : '');
const OTP_PEPPER = process.env.OTP_PEPPER || (!PROD ? 'local-development-only-change-before-deploy' : '');
if (PROD && (SESSION_SECRET.length < 32 || OTP_PEPPER.length < 32 || /replace-with|change-before-deploy/i.test(SESSION_SECRET+OTP_PEPPER))) throw new Error('Production requires strong SESSION_SECRET and OTP_PEPPER values.');
if (PROD && (!process.env.TLS_KEY_PATH || !process.env.TLS_CERT_PATH)) throw new Error('Production requires TLS_KEY_PATH and TLS_CERT_PATH; serve OTP traffic over HTTPS.');

const dbPath = path.resolve(ROOT, process.env.DB_PATH || 'data/nexus.sqlite');
const publicDbPath = path.relative(ROOT, dbPath).split(path.sep).join('/') || path.basename(dbPath);
const profileWorkbookPath = path.join(ROOT, 'data', 'student_profiles.xlsx');
const protectedStoragePaths = new Set([dbPath, dbPath+'-wal', dbPath+'-shm', profileWorkbookPath, path.join(ROOT, '.env')].map((filename) => path.resolve(filename).toLowerCase()));
const branchTestAttempts = new Map();
const BRANCH_TEST_DURATION_MS = 20 * 60 * 1000;
fs.mkdirSync(path.dirname(dbPath), { recursive: true, mode: 0o700 });
const db = new DatabaseSync(dbPath);
try { fs.chmodSync(dbPath, 0o600); } catch {}
db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS sessions (sid_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS otp_challenges (sid_hash TEXT PRIMARY KEY, code_hash TEXT NOT NULL, expires_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, email_verified INTEGER NOT NULL DEFAULT 0, phone_verified INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, email_hash TEXT NOT NULL DEFAULT '', phone_hash TEXT NOT NULL DEFAULT '', otp_channel TEXT NOT NULL DEFAULT 'email');
CREATE TABLE IF NOT EXISTS send_cooldowns (sid_hash TEXT PRIMARY KEY, sent_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS rate_limits (bucket_key TEXT PRIMARY KEY, window_start INTEGER NOT NULL, hit_count INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS student_profiles (profile_id TEXT PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT NOT NULL, branch TEXT NOT NULL, class10 TEXT NOT NULL, class10_score TEXT NOT NULL, class12 TEXT NOT NULL, class12_score TEXT NOT NULL, entrance TEXT NOT NULL, entrance_score TEXT NOT NULL, consented_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS session_profiles (sid_hash TEXT PRIMARY KEY, profile_id TEXT NOT NULL, notify_channel TEXT NOT NULL DEFAULT 'email', email_verified INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS admission_enquiries (enquiry_id TEXT PRIMARY KEY, profile_id TEXT NOT NULL, created_at TEXT NOT NULL, college_name TEXT NOT NULL, branch TEXT NOT NULL, question TEXT NOT NULL, channel TEXT NOT NULL, delivery_status TEXT NOT NULL, provider_message_id TEXT NOT NULL DEFAULT '', error_summary TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS admission_information_requests (request_id TEXT PRIMARY KEY, profile_id TEXT NOT NULL, created_at TEXT NOT NULL, college_names TEXT NOT NULL, course TEXT NOT NULL, delivery_status TEXT NOT NULL, provider_message_id TEXT NOT NULL DEFAULT '', error_summary TEXT NOT NULL DEFAULT '');
`);
const otpColumns = new Set(db.prepare('PRAGMA table_info(otp_challenges)').all().map((column) => column.name));
if (!otpColumns.has('email_hash')) db.exec("ALTER TABLE otp_challenges ADD COLUMN email_hash TEXT NOT NULL DEFAULT ''");
if (!otpColumns.has('phone_hash')) db.exec("ALTER TABLE otp_challenges ADD COLUMN phone_hash TEXT NOT NULL DEFAULT ''");
if (!otpColumns.has('otp_channel')) db.exec("ALTER TABLE otp_challenges ADD COLUMN otp_channel TEXT NOT NULL DEFAULT 'email'");
const sessionProfileColumns = new Set(db.prepare('PRAGMA table_info(session_profiles)').all().map((column) => column.name));
if (!sessionProfileColumns.has('email_verified')) db.exec('ALTER TABLE session_profiles ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0');
const statements = {
  session: db.prepare('SELECT expires_at FROM sessions WHERE sid_hash = ?'),
  putSession: db.prepare('INSERT INTO sessions(sid_hash, expires_at) VALUES(?, ?) ON CONFLICT(sid_hash) DO UPDATE SET expires_at=excluded.expires_at'),
  challenge: db.prepare('SELECT code_hash, expires_at, attempts, email_verified, phone_verified, email_hash, phone_hash, otp_channel FROM otp_challenges WHERE sid_hash = ?'),
  saveChallenge: db.prepare(`INSERT INTO otp_challenges(sid_hash,code_hash,expires_at,attempts,email_verified,phone_verified,created_at,email_hash,phone_hash,otp_channel) VALUES(?,?,?,0,0,0,?,?,?,?) ON CONFLICT(sid_hash) DO UPDATE SET code_hash=excluded.code_hash,expires_at=excluded.expires_at,attempts=0,email_verified=0,phone_verified=0,created_at=excluded.created_at,email_hash=excluded.email_hash,phone_hash=excluded.phone_hash,otp_channel=excluded.otp_channel`),
  failChallenge: db.prepare('UPDATE otp_challenges SET code_hash = ?, attempts = ? WHERE sid_hash = ?'),
  verifyChannel: db.prepare('UPDATE otp_challenges SET email_verified = CASE WHEN ? = \'email\' THEN 1 ELSE email_verified END, phone_verified = CASE WHEN ? = \'phone\' THEN 1 ELSE phone_verified END WHERE sid_hash = ?'),
  cooldown: db.prepare('SELECT sent_at FROM send_cooldowns WHERE sid_hash = ?'),
  saveCooldown: db.prepare('INSERT INTO send_cooldowns(sid_hash,sent_at) VALUES(?,?) ON CONFLICT(sid_hash) DO UPDATE SET sent_at=excluded.sent_at'),
  deleteChallenge: db.prepare('DELETE FROM otp_challenges WHERE sid_hash = ?'),
  saveProfile: db.prepare('INSERT INTO student_profiles(profile_id,created_at,name,email,phone,branch,class10,class10_score,class12,class12_score,entrance,entrance_score,consented_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET created_at=excluded.created_at,name=excluded.name,phone=excluded.phone,branch=excluded.branch,class10=excluded.class10,class10_score=excluded.class10_score,class12=excluded.class12,class12_score=excluded.class12_score,entrance=excluded.entrance,entrance_score=excluded.entrance_score,consented_at=excluded.consented_at'),
  allProfiles: db.prepare('SELECT profile_id,created_at,name,email,phone,branch,class10,class10_score,class12,class12_score,entrance,entrance_score,consented_at FROM student_profiles ORDER BY created_at,profile_id'),
  profileByEmail: db.prepare('SELECT profile_id FROM student_profiles WHERE email=?'),
  profileBySession: db.prepare('SELECT p.profile_id,p.created_at,p.name,p.email,p.phone,p.branch,p.class10,p.class10_score,p.class12,p.class12_score,p.entrance,p.entrance_score,sp.notify_channel,sp.email_verified FROM session_profiles sp JOIN student_profiles p ON p.profile_id=sp.profile_id WHERE sp.sid_hash=?'),
  bindProfile: db.prepare('INSERT INTO session_profiles(sid_hash,profile_id,notify_channel,email_verified) VALUES(?,?,?,?) ON CONFLICT(sid_hash) DO UPDATE SET profile_id=excluded.profile_id,notify_channel=excluded.notify_channel,email_verified=excluded.email_verified'),
  setNotificationChannel: db.prepare('UPDATE session_profiles SET notify_channel=? WHERE sid_hash=?'),
  saveEnquiry: db.prepare('INSERT INTO admission_enquiries(enquiry_id,profile_id,created_at,college_name,branch,question,channel,delivery_status,provider_message_id,error_summary) VALUES(?,?,?,?,?,?,?,?,?,?)'),
  updateEnquiry: db.prepare('UPDATE admission_enquiries SET delivery_status=?,provider_message_id=?,error_summary=? WHERE enquiry_id=?'),
  enquiriesForProfile: db.prepare('SELECT enquiry_id,created_at,college_name,branch,question,channel,delivery_status FROM admission_enquiries WHERE profile_id=? ORDER BY created_at DESC LIMIT 20'),
  saveAdmissionRequest: db.prepare('INSERT INTO admission_information_requests(request_id,profile_id,created_at,college_names,course,delivery_status,provider_message_id,error_summary) VALUES(?,?,?,?,?,?,?,?)'),
  updateAdmissionRequest: db.prepare('UPDATE admission_information_requests SET delivery_status=?,provider_message_id=?,error_summary=? WHERE request_id=?'),
  admissionRequestsForProfile: db.prepare('SELECT request_id,created_at,college_names,course,delivery_status FROM admission_information_requests WHERE profile_id=? ORDER BY created_at DESC LIMIT 20')
};

const mime = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon' };
function hmac(secret, value) { return createHmac('sha256', secret).update(value).digest('hex'); }
function otpDigest(sidHash, code) { return hmac(OTP_PEPPER, sidHash + ':' + code); }
function contactDigest(contact) { return hmac(OTP_PEPPER, contact); }
function safeEqual(a, b) { const left=Buffer.from(a,'hex');const right=Buffer.from(b,'hex');return left.length===right.length&&timingSafeEqual(left,right); }
const CRC_TABLE = Uint32Array.from({ length: 256 }, (_, n) => { let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;return c>>>0; });
function crc32(buffer) { let c=0xffffffff;for(const byte of buffer)c=CRC_TABLE[(c^byte)&255]^(c>>>8);return (c^0xffffffff)>>>0; }
function zipOpenXml(files) {
  const localParts=[],centralParts=[];let offset=0;
  for(const [fileName,xml] of files){
    const name=Buffer.from(fileName,'utf8'),raw=Buffer.from(xml,'utf8'),packed=deflateRawSync(raw),crc=crc32(raw);
    const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);local.writeUInt16LE(0,6);local.writeUInt16LE(8,8);local.writeUInt16LE(0,10);local.writeUInt16LE(0x21,12);local.writeUInt32LE(crc,14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(raw.length,22);local.writeUInt16LE(name.length,26);local.writeUInt16LE(0,28);
    localParts.push(local,name,packed);
    const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50,0);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(0,8);central.writeUInt16LE(8,10);central.writeUInt16LE(0,12);central.writeUInt16LE(0x21,14);central.writeUInt32LE(crc,16);central.writeUInt32LE(packed.length,20);central.writeUInt32LE(raw.length,24);central.writeUInt16LE(name.length,28);central.writeUInt16LE(0,30);central.writeUInt16LE(0,32);central.writeUInt16LE(0,34);central.writeUInt16LE(0,36);central.writeUInt32LE(0,38);central.writeUInt32LE(offset,42);
    centralParts.push(central,name);offset+=local.length+name.length+packed.length;
  }
  const centralSize=centralParts.reduce((sum,part)=>sum+part.length,0),count=files.length,end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(0,4);end.writeUInt16LE(0,6);end.writeUInt16LE(count,8);end.writeUInt16LE(count,10);end.writeUInt32LE(centralSize,12);end.writeUInt32LE(offset,16);end.writeUInt16LE(0,20);
  return Buffer.concat([...localParts,...centralParts,end]);
}
function xmlEscape(value) { return String(value??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;'); }
function excelColumn(number) { let out='';for(let n=number;n>0;n=Math.floor((n-1)/26))out=String.fromCharCode(65+(n-1)%26)+out;return out; }
function studentWorkbookBuffer(profiles) {
  const headers=['Profile ID','Saved (UTC)','Student name','Email','Phone','Interested branch','Class 10 qualification','Class 10 score','Class 12 qualification','Class 12 score','Entrance route','Entrance score','Consent recorded (UTC)'];
  const values=[headers,...profiles.map(p=>[p.profile_id,p.created_at,p.name,p.email,p.phone,p.branch,p.class10,p.class10_score,p.class12,p.class12_score,p.entrance,p.entrance_score,p.consented_at])];
  const rows=values.map((row,ri)=>`<row r="${ri+1}"${ri===0?' ht="30" customHeight="1"':''}>${row.map((value,ci)=>`<c r="${excelColumn(ci+1)}${ri+1}" s="${ri===0?1:2}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`).join('')}</row>`).join('');
  const widths=[25,23,26,34,20,20,26,18,26,18,22,18,25];
  const cols=widths.map((width,i)=>`<col min="${i+1}" max="${i+1}" width="${width}" customWidth="1"/>`).join('');
  const endRow=values.length;
  const sheet=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:M${endRow}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="22"/><cols>${cols}</cols><sheetData>${rows}</sheetData><autoFilter ref="A1:M${endRow}"/><pageMargins left="0.25" right="0.25" top="0.5" bottom="0.5" header="0.2" footer="0.2"/></worksheet>`;
  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="10"/><name val="Arial"/></font><font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Arial"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF143C4B"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
  const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
  const rootRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
  const workbook=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="22000" windowHeight="12000"/></bookViews><sheets><sheet name="Student Profiles" sheetId="1" r:id="rId1"/></sheets></workbook>`;
  const wbRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  return zipOpenXml([['[Content_Types].xml',contentTypes],['_rels/.rels',rootRels],['xl/workbook.xml',workbook],['xl/_rels/workbook.xml.rels',wbRels],['xl/worksheets/sheet1.xml',sheet],['xl/styles.xml',styles]]);
}
function writeStudentWorkbook() {
  fs.mkdirSync(path.dirname(profileWorkbookPath),{recursive:true,mode:0o700});
  fs.writeFileSync(profileWorkbookPath,studentWorkbookBuffer(statements.allProfiles.all()),{mode:0o600});
  try { fs.chmodSync(profileWorkbookPath,0o600); } catch {}
}
writeStudentWorkbook();
function cookies(req) {
  const result={};
  for(const item of (req.headers.cookie||'').split(';')){const i=item.indexOf('=');if(i>0)result[item.slice(0,i).trim()]=decodeURIComponent(item.slice(i+1).trim());}
  return result;
}
function sessionFor(req,res,create=false) {
  const raw=cookies(req).nexus_session;
  if(raw&&/^[a-f0-9]{64}$/.test(raw)){
    const sidHash=hmac(SESSION_SECRET,raw);const stored=statements.session.get(sidHash);
    if(stored&&stored.expires_at>Date.now())return sidHash;
  }
  if(!create)return null;
  const token=randomBytes(32).toString('hex');const sidHash=hmac(SESSION_SECRET,token);
  statements.putSession.run(sidHash,Date.now()+60*60*1000);
  const secure=PROD?'; Secure':'';
  res.setHeader('Set-Cookie',`nexus_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600${secure}`);
  return sidHash;
}
function json(res,status,value) {
  const data=JSON.stringify(value);
  res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Content-Length':Buffer.byteLength(data),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);
}
async function readJson(req) {
  let raw='';for await(const part of req){raw+=part;if(raw.length>16384)throw Object.assign(new Error('Request too large.'),{status:413});}
  try{return JSON.parse(raw||'{}');}catch{return null;}
}
function requestIp(req) {
  if(process.env.TRUST_PROXY==='1'&&req.headers['x-forwarded-for'])return String(req.headers['x-forwarded-for']).split(',')[0].trim();
  return req.socket.remoteAddress||'unknown';
}
function checkOrigin(req) {
  const origin=req.headers.origin;
  if(process.env.APP_ORIGIN&&origin!==process.env.APP_ORIGIN)return false;
  if(PROD&&!origin)return false;
  return true;
}
function rateLimit(key,limit,windowMs) {
  const now=Date.now();const bucketKey=hmac(OTP_PEPPER,key);const row=db.prepare('SELECT window_start,hit_count FROM rate_limits WHERE bucket_key=?').get(bucketKey);
  if(!row||now-row.window_start>=windowMs){db.prepare('INSERT INTO rate_limits(bucket_key,window_start,hit_count) VALUES(?,?,1) ON CONFLICT(bucket_key) DO UPDATE SET window_start=excluded.window_start,hit_count=1').run(bucketKey,now);return true;}
  if(row.hit_count>=limit)return false;
  db.prepare('UPDATE rate_limits SET hit_count=hit_count+1 WHERE bucket_key=?').run(bucketKey);return true;
}
function providersReady(channel) {
  if(channel==='email')return Boolean(process.env.RESEND_API_KEY&&process.env.OTP_EMAIL_FROM);
  return Boolean(process.env.TWILIO_ACCOUNT_SID&&process.env.TWILIO_AUTH_TOKEN&&process.env.TWILIO_WHATSAPP_FROM&&process.env.TWILIO_WHATSAPP_OTP_CONTENT_SID);
}
function twilioHeaders() {
  const sid=process.env.TWILIO_ACCOUNT_SID;
  return {'Authorization':'Basic '+Buffer.from(sid+':'+process.env.TWILIO_AUTH_TOKEN).toString('base64'),'Content-Type':'application/x-www-form-urlencoded'};
}
async function sendWhatsAppOtp(phone,code) {
  const sender=process.env.TWILIO_WHATSAPP_FROM.startsWith('whatsapp:')?process.env.TWILIO_WHATSAPP_FROM:'whatsapp:'+process.env.TWILIO_WHATSAPP_FROM;
  const form=new URLSearchParams({To:'whatsapp:'+phone,From:sender,ContentSid:process.env.TWILIO_WHATSAPP_OTP_CONTENT_SID,ContentVariables:JSON.stringify({1:code})});
  const sid=process.env.TWILIO_ACCOUNT_SID;
  let response;
  try{response=await fetch('https://api.twilio.com/2010-04-01/Accounts/'+encodeURIComponent(sid)+'/Messages.json',{method:'POST',signal:AbortSignal.timeout(12000),headers:twilioHeaders(),body:form});}
  catch(error){throw providerNetworkFailure('Twilio',error);}
  if(!response.ok)throw await providerFailure('Twilio',response);
  const result=await response.json().catch(()=>({}));
  if(!result.sid)throw Object.assign(new Error('Twilio returned success without a message ID.'),{provider:'Twilio'});
  return result.sid;
}
async function sendEmailOtp(email,code) {
  let response;
  try{response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(12000),headers:{'Authorization':'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.OTP_EMAIL_FROM,to:[email],subject:'Your NexusCampus verification code',text:`Your NexusCampus verification code is ${code}. It expires in 5 minutes. If you did not request this code, ignore this message.`})});}
  catch(error){throw providerNetworkFailure('Resend',error);}
  if(!response.ok)throw await providerFailure('Resend',response);
  const result=await response.json().catch(()=>({}));
  if(!result.id)throw Object.assign(new Error('Resend returned success without an email ID.'),{provider:'Resend'});
  return result.id;
}
const HCST_ADMISSION_CONTACTS = [
  { name: 'Mr. Anurag Bajpai', phone: '+91 956 800 6059' },
  { name: 'Dr. Vinod Kumar Kushwah', phone: '+91 706 088 8544' },
  { name: 'Dr. Keshav Dev', phone: '+91 941 255 8688' },
  { name: 'Admission helpline', phone: '+91 910 533 3150' }
];

function escapeHtml(value) {
  return String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
async function sendAdmissionContactsEmail(email) {
  const contactsText = HCST_ADMISSION_CONTACTS
    .map(contact => `${contact.name}: ${contact.phone}`)
    .join('\n');

  const contactsHtml = HCST_ADMISSION_CONTACTS
    .map(contact => `<li><b>${escapeHtml(contact.name)}:</b> ${escapeHtml(contact.phone)}</li>`)
    .join('');

  const text = `Hello,\n\nYour email has been successfully verified for NexusCampus.\n\nHCST Admission Contacts\n${contactsText}\n\nYou can contact the admission team using the numbers above.\n\nNexusCampus`;
  const html = `<p>Hello,</p><p>Your email has been successfully verified for NexusCampus.</p><h3>HCST Admission Contacts</h3><ul>${contactsHtml}</ul><p>You can contact the admission team using the numbers above.</p><p>NexusCampus</p>`;

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(12000),
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.OTP_EMAIL_FROM,
        to: [email],
        subject: 'HCST Admission Contacts - NexusCampus',
        text,
        html
      })
    });
  } catch (error) {
    throw providerNetworkFailure('Resend', error);
  }
  if (!response.ok) throw await providerFailure('Resend', response);
  const result = await response.json().catch(() => ({}));
  if (!result.id) throw Object.assign(new Error('Resend returned success without an email ID.'), { provider: 'Resend' });
  return result.id;
}
async function sendEnquiryEmail(profile,enquiry) {
  const contactsText = HCST_ADMISSION_CONTACTS.map(contact => `${contact.name}: ${contact.phone}`).join('\n');
  const contactsHtml = HCST_ADMISSION_CONTACTS.map(contact => `<li><b>${escapeHtml(contact.name)}:</b> ${escapeHtml(contact.phone)}</li>`).join('');
  const text=`Hello ${profile.name},\n\nYour admission enquiry has been recorded.\n\nStudent details\nName: ${profile.name}\nMobile: ${profile.phone}\nEmail: ${profile.email}\n\nEnquiry details\nEnquiry ID: ${enquiry.id}\nCollege: ${enquiry.college}\nProgram: ${enquiry.branch}\nYour question: ${enquiry.question}\n\nHCST Admission Contacts\n${contactsText}\n\nThis is a receipt for your enquiry. The app has not submitted it to the college's admissions office.\n\nNexusCampus`;
  const html=`<p>Hello ${escapeHtml(profile.name)},</p><p>Your admission enquiry has been recorded.</p><h3>Student details</h3><ul><li><b>Name:</b> ${escapeHtml(profile.name)}</li><li><b>Mobile:</b> ${escapeHtml(profile.phone)}</li><li><b>Email:</b> ${escapeHtml(profile.email)}</li></ul><h3>Enquiry details</h3><ul><li><b>Enquiry ID:</b> ${escapeHtml(enquiry.id)}</li><li><b>College:</b> ${escapeHtml(enquiry.college)}</li><li><b>Program:</b> ${escapeHtml(enquiry.branch)}</li><li><b>Your question:</b> ${escapeHtml(enquiry.question)}</li></ul><h3>HCST Admission Contacts</h3><ul>${contactsHtml}</ul><p>This is a receipt for your enquiry. The app has not submitted it to the college's admissions office.</p><p>NexusCampus</p>`;
  let response;
  try{response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(12000),headers:{'Authorization':'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.OTP_EMAIL_FROM,to:[profile.email],subject:'Admission enquiry receipt · '+enquiry.college,text,html})});}
  catch(error){throw providerNetworkFailure('Resend',error);}
  if(!response.ok)throw await providerFailure('Resend',response);
  const result=await response.json().catch(()=>({}));
  if(!result.id)throw Object.assign(new Error('Resend returned success without an email ID.'),{provider:'Resend'});
  return result.id;
}
function admissionCollegeData() {
  const raw=fs.readFileSync(path.join(ROOT,'data','admission-colleges.json'),'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw).colleges||[];
}
function admissionCardText(college,course) {
  const fees=college.feeStructure?.[course];
  const contacts=Array.isArray(college.admissionContacts)?college.admissionContacts:[];
  return `COLLEGE: ${college.name}\nLOCATION: ${college.address||'Information currently unavailable'}\nSELECTED COURSE: ${course}\nCOURSES LISTED: ${(college.courses||[]).map(item=>item.name).join('; ')||'Information currently unavailable'}\nADMISSION CONTACT: ${contacts.length?contacts.map(item=>`${item.label}: ${item.number}`).join('; '):(college.admissionContact||'Information currently unavailable')}\nADMISSION EMAIL: ${college.admissionEmail||'Information currently unavailable'}\nADMISSION OFFICE: ${college.admissionOffice||'Information currently unavailable'}\nANNUAL FEE: ${fees?.annualFee||'Fee not currently verified – Please check official admission page'}\nTOTAL FEE: ${fees?.totalFee||'Fee not currently verified – Please check official admission page'}\nADDITIONAL CHARGES: ${fees?.additionalCharges||'Information currently unavailable'}\nOFFICIAL WEBSITE: ${college.collegeUrl||'Information currently unavailable'}\nADMISSION/APPLICATION LINK: ${college.admissionWebsite||college.collegeUrl||'Information currently unavailable'}\nIMPORTANT NOTES: Verify current fees, eligibility, intake and admission dates with the institution.\nINFORMATION SOURCE: ${college.admissionSource||college.collegeUrl||'Official website link'}\n`;
}
async function sendAdmissionInformationEmail(profile, request, colleges) {
  const sections=colleges.map(college=>{
    const fees=college.feeStructure?.[request.course];
    const contacts=Array.isArray(college.admissionContacts)?college.admissionContacts:[];
    const contactText=contacts.length?contacts.map(item=>`${item.label}: ${item.number}`).join(' · '):(college.admissionContact||'Information currently unavailable');
    const row=(label,value)=>`<tr><th style="padding:9px;text-align:left;color:#496257;border-bottom:1px solid #e3eae5">${escapeHtml(label)}</th><td style="padding:9px;border-bottom:1px solid #e3eae5">${escapeHtml(value||'Information currently unavailable')}</td></tr>`;
    const link=(label,url)=>url?`<a href="${escapeHtml(url)}" style="color:#176b51;font-weight:700">${escapeHtml(label)} ↗</a>`:'Information currently unavailable';
    return `<section style="margin:20px 0;padding:22px;border:1px solid #dbe7df;border-radius:14px;background:#fff"><p style="margin:0 0 6px;color:#638171;font-size:12px">${escapeHtml(college.category||'Mathura institution')}</p><h2 style="margin:0 0 8px;color:#173b2d;font-size:21px">${escapeHtml(college.name)}</h2><p style="margin:0 0 12px;color:#506158">${escapeHtml(college.address||'Information currently unavailable')}</p><p style="padding:10px;background:#f2f7f1"><b>Selected course</b> · ${escapeHtml(request.course)}</p><table style="width:100%;border-collapse:collapse;font-size:14px">${row('Courses listed',college.courses?.map(item=>item.name).join('; '))}${row('Admission contact',contactText)}${row('Admission email',college.admissionEmail||'Information currently unavailable')}${row('Admission office',college.admissionOffice||'Information currently unavailable')}${row('Annual fee',fees?.annualFee||'Fee not currently verified – Please check official admission page')}${row('Total fee',fees?.totalFee||'Fee not currently verified – Please check official admission page')}${row('Additional charges',fees?.additionalCharges||'Information currently unavailable')}${row('Fee last verified',fees?.lastVerified||'Not available')}</table><p style="margin:14px 0 6px">${link('Official website',college.collegeUrl)}</p><p style="margin:6px 0">${link('Admission / application link',college.admissionWebsite||college.collegeUrl)}</p><p style="margin:10px 0;color:#65756c;font-size:12px">Source: ${link(college.admissionSource?'Official admission source':'Official institution website',college.admissionSource||college.collegeUrl)}${fees?.source?` · Fee source: ${link('official website',fees.source)}`:''}</p></section>`;
  }).join('');
  const text=`NexusCampus AI – College Admission Information\n\nHello ${profile.name},\nRequest ID: ${request.id}\nRequested: ${request.createdAt}\n\n${colleges.map(c=>admissionCardText(c,request.course)).join('\n------------------------------\n')}\nThis information is provided for guidance. Students should verify the latest fees, eligibility, intake and admission dates from the official institution.`;
  const html=`<div style="margin:0;background:#f2f5f0;padding:28px 12px;font-family:Arial,sans-serif;color:#24362d"><main style="max-width:700px;margin:auto"><header style="padding:25px 28px;background:#12392d;border-radius:16px 16px 0 0;color:#fff"><div style="font-size:12px;letter-spacing:2px;color:#c8e88e">NEXUSCAMPUS AI</div><h1 style="margin:10px 0 5px;font-size:25px">College Admission Information</h1><p style="margin:0;color:#d0ddd2">Prepared for ${escapeHtml(profile.name)} · ${escapeHtml(request.course)}</p></header><div style="padding:18px 22px;background:#f7f8f4">${sections}<p style="color:#64736a;font-size:13px;line-height:1.6">This information is provided for guidance. Students should verify the latest fees, eligibility, intake and admission dates from the official institution.</p><p style="color:#829087;font-size:11px">Request ID: ${escapeHtml(request.id)} · Source checked: ${escapeHtml(new Date(request.createdAt).toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata'}))}</p></div><footer style="padding:17px 22px;background:#e7ede8;color:#6b7a70;font-size:12px">NexusCampus AI · College discovery and admissions guidance</footer></main></div>`;
  let response;
  try{response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(12000),headers:{'Authorization':'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.OTP_EMAIL_FROM,to:[profile.email],subject:`NexusCampus AI – Admission Information for ${colleges.length===1?colleges[0].name:colleges.length+' selected colleges'}`,text,html})});}
  catch(error){throw providerNetworkFailure('Resend',error);}
  if(!response.ok)throw await providerFailure('Resend',response);
  const result=await response.json().catch(()=>({}));if(!result.id)throw Object.assign(new Error('Resend returned success without an email ID.'),{provider:'Resend'});return result.id;
}
async function sendWhatsAppEnquiry(profile,enquiry) {
  if(!process.env.TWILIO_WHATSAPP_FROM||!process.env.TWILIO_WHATSAPP_ENQUIRY_CONTENT_SID)throw Object.assign(new Error('WhatsApp enquiry receipts require an approved sender and Content Template SID.'),{provider:'Twilio'});
  const sender=process.env.TWILIO_WHATSAPP_FROM.startsWith('whatsapp:')?process.env.TWILIO_WHATSAPP_FROM:'whatsapp:'+process.env.TWILIO_WHATSAPP_FROM;
  const variables={1:profile.name,2:enquiry.college,3:enquiry.branch,4:enquiry.question.slice(0,500),5:enquiry.id};
  const form=new URLSearchParams({To:'whatsapp:'+profile.phone,From:sender,ContentSid:process.env.TWILIO_WHATSAPP_ENQUIRY_CONTENT_SID,ContentVariables:JSON.stringify(variables)});
  const sid=process.env.TWILIO_ACCOUNT_SID;
  let response;
  try{response=await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`,{method:'POST',signal:AbortSignal.timeout(12000),headers:twilioHeaders(),body:form});}
  catch(error){throw providerNetworkFailure('Twilio',error);}
  if(!response.ok)throw await providerFailure('Twilio',response);
  const result=await response.json().catch(()=>({}));
  if(!result.sid)throw Object.assign(new Error('Twilio returned success without a message ID.'),{provider:'Twilio'});
  return result.sid;
}
function providerNetworkFailure(provider,error) {
  const detail=error.cause?.code||error.code||error.message||'unknown network error';
  const failure=new Error(`${provider} network failure (${error.name||'Error'}): ${String(detail).replace(/[\r\n\t]/g,' ').slice(0,200)}`);
  failure.provider=provider;failure.causeCode=error.cause?.code||error.code;
  return failure;
}
async function providerFailure(provider,response) {
  let detail='';
  try {
    const body=await response.json();
    detail=provider==='Twilio'?(body.message||body.more_info||''):(body.message||body.error||'');
    if(body.error_code)detail=`${body.error_code}: ${detail}`;
  } catch {}
  const error=new Error(`${provider} returned HTTP ${response.status}${detail?`: ${String(detail).replace(/[\r\n\t]/g,' ').slice(0,240)}`:''}`);
  error.provider=provider;error.status=response.status;
  return error;
}
function addSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy','geolocation=(self), camera=(), microphone=()');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-src https://maps.google.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
}
async function handle(req,res) {
  addSecurityHeaders(res);
  const url=new URL(req.url,'http://localhost');
  try {
    if(req.method==='POST'&&url.pathname.startsWith('/api/')){
      if(!checkOrigin(req))return json(res,403,{message:'Request origin not permitted.'});
      const body=await readJson(req);if(!body)return json(res,400,{message:'Invalid request body.'});
      if(url.pathname==='/api/branch-test/start'){
        if(!rateLimit('branch-test-start:'+requestIp(req),10,60*60*1000))return json(res,429,{message:'Too many test attempts. Try again later.'});
        const bank=JSON.parse(fs.readFileSync(path.join(ROOT,'data','branch-test-questions.json'),'utf8'));
        const shuffled=bank.slice().sort(()=>Math.random()-.5).slice(0,15);
        const questions=shuffled.map((q)=>{
          const choices=q.options.map((text,index)=>({text,index})).sort(()=>Math.random()-.5);
          return {id:q.id,subject:q.subject,question:q.question,options:choices.map((choice)=>choice.text),answer:choices.findIndex((choice)=>choice.index===q.answer),explanation:q.explanation};
        });
        const id=randomUUID();const now=Date.now();
        branchTestAttempts.set(id,{questions,startedAt:now,expiresAt:now+BRANCH_TEST_DURATION_MS,submitted:false});
        for(const [key,value] of branchTestAttempts)if(value.expiresAt<now||value.submitted)branchTestAttempts.delete(key);
        return json(res,200,{attemptId:id,questions:questions.map(({answer,explanation,...q})=>q),durationSeconds:BRANCH_TEST_DURATION_MS/1000,serverTime:now});
      }
      if(url.pathname==='/api/branch-test/submit'){
        if(!rateLimit('branch-test-submit:'+requestIp(req),20,60*60*1000))return json(res,429,{message:'Too many submission requests. Try again later.'});
        const attempt=typeof body.attemptId==='string'&&branchTestAttempts.get(body.attemptId);
        if(!attempt)return json(res,410,{message:'This test session expired. Start a new test.'});
        if(Date.now()>attempt.expiresAt+10000)return json(res,410,{message:'The test time expired before this submission reached the server.'});
        if(attempt.submitted)return json(res,409,{message:'This test has already been submitted.'});
        attempt.submitted=true;
        const submitted=body.answers&&typeof body.answers==='object'?body.answers:{};
        const review=attempt.questions.map((q)=>({id:q.id,subject:q.subject,question:q.question,options:q.options,correctAnswer:q.answer,selectedAnswer:Number.isInteger(submitted[q.id])?submitted[q.id]:null,correct:Number.isInteger(submitted[q.id])&&submitted[q.id]===q.answer,explanation:q.explanation}));
        const scores={Physics:0,Chemistry:0,Mathematics:0};
        review.forEach((q)=>{if(q.correct)scores[q.subject]++;});
        return json(res,200,{total:review.filter((q)=>q.correct).length,max:review.length,subjects:scores,review,elapsedSeconds:Math.min(Math.floor((Date.now()-attempt.startedAt)/1000),BRANCH_TEST_DURATION_MS/1000)});
      }
      if(url.pathname==='/api/otp/request'){
        const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
        const phone=typeof body.phone==='string'?body.phone.trim():'';
        const channel=body.channel;
        if(email.length>254||!/^\S+@\S+\.\S+$/.test(email)||!/^\+[1-9]\d{7,14}$/.test(phone))return json(res,400,{message:'Enter a valid email and phone number with country code.'});
        if(!['email','whatsapp'].includes(channel))return json(res,400,{message:'Choose email or WhatsApp for OTP delivery.'});
        const sidHash=sessionFor(req,res,true);const now=Date.now();
        const cooling=statements.cooldown.get(sidHash);
        if(cooling&&now-cooling.sent_at<60000)return json(res,429,{message:'Please wait before requesting another OTP.',retryAfter:Math.ceil((60000-(now-cooling.sent_at))/1000)});
        const ip=requestIp(req);
        if(!rateLimit('otp-ip:'+ip,6,60*60*1000)||!rateLimit('otp-contact:'+(channel==='email'?email:phone),5,60*60*1000))return json(res,429,{message:'Too many OTP requests. Try again later.',retryAfter:3600});
        if(!providersReady(channel))return json(res,503,{message:channel==='email'?'Email OTP is not configured. Set RESEND_API_KEY and OTP_EMAIL_FROM in the backend .env file.':'WhatsApp OTP is not configured. Set the Twilio sender and approved OTP template in the backend .env file.'});
        const code=String(randomInt(100000,1000000));
        statements.saveChallenge.run(sidHash,otpDigest(sidHash,code),now+5*60*1000,now,contactDigest(email),contactDigest(phone),channel);
        try{
          if(channel==='email')await sendEmailOtp(email,code);
          else await sendWhatsAppOtp(phone,code);
        }catch(error){
          statements.deleteChallenge.run(sidHash);
          console.error('[otp-provider] delivery failed:',error.provider||'network',error.status||'',error.message);
          const status=error.status===429?429:([400,422].includes(error.status)?400:502);
          const providerTag=error.provider?' ('+error.provider+')':'';
          return json(res,status,{message:'OTP delivery failed'+providerTag+': '+error.message.slice(0,260),retryAfter:60});
        }
        statements.saveCooldown.run(sidHash,now);
        return json(res,200,{channel:channel,message:channel==='email'?'Resend accepted the email OTP request.':'Twilio accepted the WhatsApp OTP template message.',expiresIn:300,resendAfter:60});
      }
      if(url.pathname==='/api/otp/verify'){
        const sidHash=sessionFor(req,res,false);if(!sidHash)return json(res,401,{message:'Request an OTP before verification.'});
        const channel=body.channel;const code=typeof body.code==='string'?body.code.trim():'';
        const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';const phone=typeof body.phone==='string'?body.phone.trim():'';
        if(!['email','whatsapp'].includes(channel)||!/^[0-9]{6}$/.test(code)||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||!/^\+[1-9]\d{7,14}$/.test(phone))return json(res,400,{message:'Enter valid contact details and the 6-digit code sent to your selected channel.'});
        const row=statements.challenge.get(sidHash);if(!row)return json(res,410,{message:'OTP expired. Request a new code.'});
        if(row.expires_at<=Date.now())return json(res,410,{message:'OTP expired. Request a new code.'});
        if(!safeEqual(row.email_hash,contactDigest(email))||!safeEqual(row.phone_hash,contactDigest(phone)))return json(res,409,{message:'The email or phone differs from the OTP request. Request a new code for the current contacts.'});
        if(row.otp_channel!==channel)return json(res,409,{message:'The verification channel differs from the OTP request. Request a new code for the selected channel.'});
        if(row.attempts>=3)return json(res,429,{message:'Maximum attempts reached. Request a new OTP after the countdown.'});
        const valid=safeEqual(row.code_hash,otpDigest(sidHash,code));
        if(!valid){const attempts=row.attempts+1;statements.failChallenge.run(attempts>=3?'':row.code_hash,attempts,sidHash);return json(res,400,{message:attempts>=3?'Invalid OTP. Maximum 3 attempts reached. Request a new code after the countdown.':'Invalid OTP. Please check the code and try again.',attemptsRemaining:Math.max(0,3-attempts)});}
        const verifiedColumn=channel==='email'?'email':'phone';
        statements.verifyChannel.run(verifiedColumn,verifiedColumn,sidHash);

        return json(res,200,{
          message:channel==='email'?'Email verified successfully.':'WhatsApp verified successfully.',
          verifiedChannel:channel,
          complete:true
        });
      }
      if(url.pathname==='/api/profile'){
        const sidHash=sessionFor(req,res,false);const challenge=sidHash&&statements.challenge.get(sidHash);
        if(!challenge||challenge.expires_at<=Date.now()||!(challenge.otp_channel==='email'?challenge.email_verified:challenge.phone_verified))return json(res,403,{message:'Verify your selected email or WhatsApp channel before continuing.'});
        const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';const phone=typeof body.phone==='string'?body.phone.trim():'';
        if(!safeEqual(challenge.email_hash,contactDigest(email))||!safeEqual(challenge.phone_hash,contactDigest(phone)))return json(res,409,{message:'The email or phone changed after verification. Request and verify a new OTP for the current contacts.'});
        const fields=['name','class10','class10Score','class12','class12Score','entrance'];
        if(fields.some((key)=>typeof body[key]!=='string'||!body[key].trim()||body[key].length>160))return json(res,400,{message:'Complete all required student profile fields.'});
        if(!['AIML','IT','ECE','BBA','MBA','BCA','MTECH'].includes(body.branch))return json(res,400,{message:'Choose a valid study branch.'});
        if(body.consent!==true)return json(res,400,{message:'Consent is required before saving student details.'});
        if(typeof body.score!=='string'||body.score.length>160)return json(res,400,{message:'Check the entrance score field and try again.'});
        const createdAt=new Date().toISOString();const profileId=randomUUID();
        db.exec('BEGIN IMMEDIATE');
        try{
          statements.saveProfile.run(profileId,createdAt,body.name.trim(),email,phone,body.branch,body.class10.trim(),body.class10Score.trim(),body.class12.trim(),body.class12Score.trim(),body.entrance.trim(),body.score.trim(),createdAt);
          writeStudentWorkbook();
          db.exec('COMMIT');
        }catch(error){db.exec('ROLLBACK');console.error('[profile-storage] save failed:',error.message);return json(res,500,{message:'The profile could not be written to the local database and Excel file. Check project folder permissions and try again.'});}
        const saved=statements.profileByEmail.get(email);
        statements.bindProfile.run(sidHash,saved.profile_id,challenge.otp_channel,challenge.email_verified?1:0);
        return json(res,201,{ready:true,saved:true,profileId:saved.profile_id,notifyChannel:challenge.otp_channel,excelFile:'data/student_profiles.xlsx',message:'Profile saved to the local SQLite database and Excel workbook.'});
      }
        if(url.pathname==='/api/admission-information/send'){
        const sidHash=sessionFor(req,res,false);const profile=sidHash&&statements.profileBySession.get(sidHash);
        if(!profile)return json(res,401,{message:'Sign in with your student profile before requesting admission information.'});
        if(!profile.email_verified)return json(res,403,{message:'Verify the profile email by email OTP before requesting admission information.'});
        if(!providersReady('email'))return json(res,503,{message:'Email delivery is temporarily unavailable. Please try again.'});
        const ids=Array.isArray(body.collegeIds)?Array.from(new Set(body.collegeIds)):[];
        const course=typeof body.course==='string'?body.course.trim():'';
        if(!ids.length||ids.length>10||ids.some(id=>typeof id!=='string'||id.length>120)||!course||course.length>180)return json(res,400,{message:'Select one or more colleges and a course.'});
        if(!rateLimit('admission-info:'+profile.profile_id,5,60*60*1000))return json(res,429,{message:'You have reached the admission information email limit. Try again in an hour.'});
        let directory;try{directory=admissionCollegeData();}catch(error){console.error('[admission-data] failed:',error.message);return json(res,500,{message:'Admission information is unavailable right now. Please try again.'});}
        const colleges=ids.map(id=>directory.find(item=>item.id===id));
        if(colleges.some(item=>!item))return json(res,400,{message:'One or more selected colleges are not in the current directory.'});
        if(course!=='Admission overview'&&colleges.some(item=>!item.courses?.some(entry=>entry.name===course)))return json(res,400,{message:'Choose a course listed for every selected college.'});
        const request={id:'NCA-'+randomUUID().slice(0,8).toUpperCase(),createdAt:new Date().toISOString(),course};
        const names=colleges.map(item=>item.name);
        statements.saveAdmissionRequest.run(request.id,profile.profile_id,request.createdAt,JSON.stringify(names),course,'pending','','');
        try{
          const providerMessageId=await sendAdmissionInformationEmail(profile,request,colleges);
          statements.updateAdmissionRequest.run('accepted',providerMessageId,'',request.id);
          return json(res,201,{sent:true,request:{id:request.id,createdAt:request.createdAt,collegeNames:names,course,status:'accepted'},message:'Admission information email accepted for delivery.'});
        }catch(error){
          console.error('[admission-information-email] delivery failed:',error.provider||'network',error.status||'',error.message);
          statements.updateAdmissionRequest.run('failed','',error.message.slice(0,240),request.id);
          return json(res,502,{sent:false,request:{id:request.id,createdAt:request.createdAt,collegeNames:names,course,status:'failed'},message:"We couldn't send the admission information right now. Please try again."});
        }
      }
      if(url.pathname==='/api/student/enquiries'){
        const sidHash=sessionFor(req,res,false);const profile=sidHash&&statements.profileBySession.get(sidHash);
        if(!profile)return json(res,401,{message:'Create or sign in to your student profile before sending an enquiry.'});
        const college=typeof body.college==='string'?body.college.trim():'';
        const question=typeof body.question==='string'?body.question.trim():'';
        if(!college||college.length>180||!question||question.length>1200)return json(res,400,{message:'Choose a college and enter a question up to 1,200 characters.'});
        if(!rateLimit('enquiry:'+profile.profile_id,5,60*60*1000))return json(res,429,{message:'You have reached the enquiry limit. Try again in an hour.'});
        const id='NC-'+randomUUID().slice(0,8).toUpperCase();const createdAt=new Date().toISOString();
        const enquiry={id:id,createdAt:createdAt,college:college,branch:profile.branch,question:question,channel:profile.notify_channel};
        statements.saveEnquiry.run(id,profile.profile_id,createdAt,college,profile.branch,question,profile.notify_channel,'pending','','');
        try{
          const providerMessageId=profile.notify_channel==='email'?await sendEnquiryEmail(profile,enquiry):await sendWhatsAppEnquiry(profile,enquiry);
          statements.updateEnquiry.run('accepted',providerMessageId,'',id);
          return json(res,201,{saved:true,deliveryAccepted:true,enquiry:{id:id,createdAt:createdAt,college:college,branch:profile.branch,question:question,channel:profile.notify_channel,status:'accepted'},message:'Your enquiry receipt was accepted by the selected message provider.'});
        }catch(error){
          console.error('[enquiry-provider] receipt failed:',error.provider||'network',error.status||'',error.message);
          statements.updateEnquiry.run('failed','',error.message.slice(0,240),id);
          const status=error.status===429?429:([400,422].includes(error.status)?400:502);
          const providerTag=error.provider?' by '+error.provider:'';
          const channelLabel=profile.notify_channel==='email'?'email':'WhatsApp';
          return json(res,status,{saved:true,deliveryAccepted:false,enquiryId:id,message:'The enquiry is saved, but the '+channelLabel+' receipt was not accepted'+providerTag+': '+error.message.slice(0,240)});
        }
      }
      return json(res,404,{message:'API route not found.'});
    }
    if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{message:'Method not allowed.'});
    if(url.pathname==='/api/health')return json(res,200,{ok:true,otpProviders:{email:providersReady('email'),whatsapp:providersReady('whatsapp'),whatsappEnquiry:Boolean(process.env.TWILIO_ACCOUNT_SID&&process.env.TWILIO_AUTH_TOKEN&&process.env.TWILIO_WHATSAPP_FROM&&process.env.TWILIO_WHATSAPP_ENQUIRY_CONTENT_SID)},databaseFile:publicDbPath,collegeDataFile:'data/admission-colleges.json'});
    if(url.pathname==='/api/student/dashboard'){
      const sidHash=sessionFor(req,res,false);const profile=sidHash&&statements.profileBySession.get(sidHash);
      if(!profile)return json(res,401,{message:'No student profile is connected to this browser session.'});
      const enquiries=statements.enquiriesForProfile.all(profile.profile_id);
      const admissionRequests=statements.admissionRequestsForProfile.all(profile.profile_id).map(item=>({...item,college_names:JSON.parse(item.college_names)}));
      const verifiedEmail=Boolean(profile.email_verified);
      return json(res,200,{profile:{id:profile.profile_id,name:profile.name,email:profile.email,phone:profile.phone,branch:profile.branch,class10:profile.class10,class10Score:profile.class10_score,class12:profile.class12,class12Score:profile.class12_score,entrance:profile.entrance,score:profile.entrance_score,notifyChannel:profile.notify_channel,createdAt:profile.created_at},verifiedEmail,enquiries,admissionRequests});
    }
    let name=decodeURIComponent(url.pathname);if(name==='/')name='/index.html';
    const filename=path.resolve(ROOT,'.'+name);
    if(!filename.startsWith(ROOT+path.sep))return json(res,404,{message:'Not found.'});
    const resolvedFilename=path.resolve(filename).toLowerCase();
    if(protectedStoragePaths.has(resolvedFilename)||/\.(?:sqlite(?:-wal|-shm)?|db)$/i.test(filename))return json(res,404,{message:'Not found.'});
    const stat=fs.statSync(filename);if(!stat.isFile())return json(res,404,{message:'Not found.'});
    const content=fs.readFileSync(filename);res.writeHead(200,{'Content-Type':mime[path.extname(filename).toLowerCase()]||'application/octet-stream','Content-Length':content.length,'Cache-Control':path.extname(filename)==='.html'?'no-store':'public, max-age=300'});
    if(req.method==='HEAD')return res.end();res.end(content);
  }catch(error){
    if(error.status)return json(res,error.status,{message:error.message});
    console.error('[server] request failed:',error.message);return json(res,500,{message:'The request could not be completed. Try again.'});
  }
}
const server=PROD?https.createServer({key:fs.readFileSync(process.env.TLS_KEY_PATH),cert:fs.readFileSync(process.env.TLS_CERT_PATH)},handle):http.createServer(handle);
server.listen(PORT,'0.0.0.0',()=>console.log(`NexusCampus running on ${PROD?'https':'http'} port ${PORT}`));
