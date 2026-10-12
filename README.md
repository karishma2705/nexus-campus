# NexusCampus AI

NexusCampus is a college discovery and admissions guidance website. It includes the existing college finder, full preference order, campus map, aptitude activity, visit planner and a private student dashboard. Student profiles are saved in the local database and Excel workbook; enquiry receipt history is saved in SQLite.

## Mathura college explorer

The **Mathura colleges** section combines the public Mathura district college directory with Mathura institutions found in the supplied UPTAC Preference Order PDF. The current set contains 10 profiles after deduplicating the shared entries. Search by institution, course or campus area; open a profile for course summaries, faculty-directory links, source notes and a campus-specific Maps search. Use the main college finder to shortlist and compare profiles.

The dataset lives in `data/mathura-colleges.json`. The city map is a Google Maps search for Mathura colleges; each profile also has a campus-specific Maps link. The supplied schematic walking-navigation map remains HCST-specific because the other campuses do not include surveyed building/path data. The set is a useful discovery directory, not a census of every school, college, university or training centre in the district. Verify current programmes, faculty, eligibility, fees and intake with each institution.

## Engineering branch guide

The **Find Your Best Branch** page is available from the main navigation and directly at `http://localhost:5173/branch-recommendation.html`. It combines Class 12 PCM marks, a 15-question timed test, selected interests and optional work/learning preferences. The transparent rule weights and sample question bank live in `branch-recommendation.js` and `data/branch-test-questions.json`.

The server randomizes question and option order, keeps the answer key out of the browser until submission, enforces the timed attempt, grades once, and limits attempts by IP. The page requests fullscreen where supported and records tab switches; two visibility warnings submit the attempt. These are deterrents for casual switching, not a guarantee against cheating on an unproctored browser. Marks and results are not stored in the profile database. Recommendations are exploration guidance and do not determine college eligibility or admission.

## Mathura scholarships

The **Scholarships** page is available in the main navigation and at `http://localhost:5173/scholarships.html`. Enter Physics, Chemistry and Mathematics marks to estimate Hindustan College of Science & Technology's PCM merit slab (select board group and B.Tech course group), GLA University's published B.Tech PCM award, and Sanskriti University's first-year tuition-waiver percentage. It compares published Eshan College awards, notes conflicting official values, and shows B.S.A. College / Uttar Pradesh government scholarship routes without inventing a fixed award. The source-backed rules live in `data/scholarships.json`.

Scholarship information was checked on 11 October 2026 against the official Hindustan Campus, GLA University and Eshan College websites. Awards depend on current policy, course, board, approval, seat availability and continuation rules. The estimate is guidance only; confirm your exact award with the college before paying fees.

## Start the project

Install Node.js 24 or newer. From the extracted project folder, use PowerShell:

~~~powershell
node server.mjs
~~~

Open <http://localhost:5173>. Use the website through this address; opening `index.html` directly bypasses the backend. The site and `/api/*` routes use the same origin and port. No npm packages or `.env` file are needed to run the local site. If npm is installed, `npm start` runs the same backend command. Copy `.env.example` to `.env` only when configuring real email or WhatsApp delivery.

## Real OTP delivery

The app has no demo OTP path. It generates a fresh six-digit OTP for each request and sends it through the channel chosen by the student. Email uses Resend. WhatsApp uses a Twilio-approved WhatsApp sender and OTP Content Template. The backend stores only an HMAC digest, waits for Twilio or Resend to accept the message, and verifies the submitted code. A provider acceptance means the message was queued for processing; it cannot guarantee arrival in the recipient's inbox or WhatsApp.

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Server-only Resend API credential |
| `OTP_EMAIL_FROM` | Sender address verified in Resend |
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Server-only Twilio auth token |
| `TWILIO_WHATSAPP_FROM` | Approved WhatsApp business sender, in `whatsapp:+...` format |
| `TWILIO_WHATSAPP_OTP_CONTENT_SID` | Approved WhatsApp OTP template Content SID |
| `SESSION_SECRET` | Random secret for signing browser sessions |
| `OTP_PEPPER` | Different random secret for hashing OTP/session data |
| `APP_ORIGIN` | Exact site origin, normally `http://localhost:5173` during local use |

For production, use separate random values of at least 32 characters for `SESSION_SECRET` and `OTP_PEPPER`, serve over HTTPS, and configure `TLS_KEY_PATH` and `TLS_CERT_PATH`. Keep `.env` on the backend computer and do not commit it.

### Test email OTP

1. Verify a sender address/domain in Resend, then add `RESEND_API_KEY` and `OTP_EMAIL_FROM` to `.env`.
2. Restart with `npm start`.
3. In **Create profile**, enter your email and phone number, select **Email**, choose **Send email OTP**, and check the inbox.
4. Enter the received six-digit code, verify it, complete the student details and consent, then save the profile.

### Test WhatsApp OTP

1. Configure Twilio credentials and an approved WhatsApp sender. Create an approved OTP Content Template with the one-time code at `{{1}}`, then set its Content SID as `TWILIO_WHATSAPP_OTP_CONTENT_SID`.
2. Use a phone number you control in international E.164 format, such as `+91...`, and confirm it can receive WhatsApp messages from your Twilio business sender.
3. Select **WhatsApp**, choose **Send WhatsApp OTP**, enter the real received code and verify it.
4. Complete and save the student profile. WhatsApp becomes that profile's verified channel for enquiry receipts.

If provider credentials, sender setup, destination format or network connectivity is wrong, the page shows an error and the backend terminal records the provider, HTTP status and returned error detail. No code is displayed by the website. `http://localhost:5173/api/health` reports which server-side integrations are configured.

## Admission enquiry receipt

After creating a profile, open **Ask an admissions question**, choose a college and write a question. The backend saves it to the private enquiry table and sends a receipt to the profile's verified channel. The receipt includes the student name, college, program, question and enquiry ID. The dashboard shows whether the provider accepted the receipt or delivery failed.

Email receipts use the Resend sender above. WhatsApp receipts require a second approved Twilio Content Template. Set `TWILIO_WHATSAPP_ENQUIRY_CONTENT_SID` in `.env`. Create the template with these variables in order: `{{1}}` student name, `{{2}}` college, `{{3}}` program, `{{4}}` question and `{{5}}` enquiry ID. The app sends a receipt to the student; it does not submit the enquiry to a college admissions office.

## Student data storage

- `data/nexus.sqlite` is the private SQLite database. It holds OTP challenge digests, hashed sessions, profiles, rate limits, and enquiry history. The backend creates it on startup; `DB_PATH` can change its location.
- `data/student_profiles.xlsx` is rebuilt by the backend and contains consented profile records. Open it from the project's `data` folder on the server computer.
- The browser receives an HttpOnly session cookie. The server stores a keyed digest, not the cookie value. OTP codes and provider credentials are never written into browser JavaScript or the Excel workbook.
- The backend blocks web requests for `.env`, SQLite files and `student_profiles.xlsx`.

Keep the project folder private because the Excel workbook contains personal information. `data/Project_Data_Inventory.xlsx` is a separate college-data workbook and does not contain student records.

## Existing data and campus-map limits

`data/uptac-colleges.json` contains 165 college names and 636 ranked preference rows extracted from the supplied preference list. It is a discovery reference, not a current cutoff or admission guarantee. The campus map uses the supplied schematic, which has no surveyed GPS control points or walkable-path GIS. The UI reports that limitation rather than inventing a GPS-aligned route.

See [SOURCES.md](SOURCES.md) for source notes.

## Admission information request

The student dashboard includes a searchable, dataset-driven admission information request flow. Only a profile whose email was verified by email OTP can request delivery. The server binds that proof to the HttpOnly session profile, accepts college IDs and a shared course (never a destination email), reads the current details from `data/mathura-colleges.json`, applies the existing per-profile rate limiter, and sends a formatted HTML email through the configured Resend sender. Request status and IDs are saved privately in SQLite. A configured `RESEND_API_KEY` and `OTP_EMAIL_FROM` are required.

Each Mathura college JSON record has `admissionContact`, `admissionContacts`, `admissionEmail`, `admissionOffice`, `admissionWebsite`, `admissionSource`, `admissionVerifiedDate` and course-keyed `feeStructure`. New records automatically appear in the finder and request picker. Unknown contact or fee values remain unavailable/unverified; no amounts are inferred. A multi-college request can select a common listed course, or **Admission overview** to include each college's courses and contact summary.

The HCST campus panel supports a suggested Gate 1/Gate 2 to landmark line traced from the user-supplied schematic. It is not a GPS route, verified road, measured walking path, distance or travel time. Google Maps links open directions to each college campus.

## Expanded admission request directory

The login dashboard searches `data/admission-colleges.json`: 165 colleges and 636 branch/preference rows from the supplied UPTAC reference, merged with the Mathura directory (170 unique profiles after deduplication). When a student adds a college, its listed branches and the fee status for each branch display immediately. Course selection highlights the matching fee record, and the verified email request includes the selected institution and course.

Official fee information currently verified in this dataset includes current published fee pages from [HCST](https://hcst.edu.in/admission-process/fees-structure/), [GLA University Mathura](https://www.gla.ac.in/admissions/fee-structure), [Eshan College](https://www.eshancollege.com/fee_structure), and [B.S.A. College](https://bsacet.org/fee-details/). Other entries show a clearly labeled unverified fee status. The project source files do not contain a global or worldwide college catalog, and the included UPTAC directory is not represented as one. Add institutions and source-backed course data to `data/admission-colleges.json` to extend the searchable request directory.
