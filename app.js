const colleges = [
  {
    id: "hcst",
    name: "Hindustan College of Science & Technology",
    shortName: "HCST",
    city: "Mathura",
    location: "Farah, Mathura · NH-19, Agra-Delhi Highway",
    entrance: ["JEE Main", "CUET"],
    guidanceScore: 55,
    value: 2,
    featured: true,
    source: "HCST public site",
    overview: "HCST is located at the 26 km milestone from Agra on the Agra-Delhi Highway. Its official faculty page describes a 29.4-acre campus with 1,00,000 sq. m of covered area.",
    programs: [
      ["AIML", "B.Tech CSE - AI & ML", "AI & Data"],
      ["IT", "B.Tech Information Technology", "Software & Cloud"],
      ["ECE", "B.Tech Electronics & Communication", "Electronics & VLSI"],
      ["BBA", "Bachelor of Business Administration", "Business & Finance"],
      ["MBA", "Master of Business Administration", "Business & Finance"],
      ["BCA", "Bachelor of Computer Applications", "Software & Cloud"],
      ["MTECH", "M.Tech ECE - VLSI Design", "Electronics & VLSI"]
    ],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI", "Business & Finance"],
    facts: [["29.4", "acres (official overview)"], ["1L", "sq. m covered area"], ["HCST-064", "college identifier"]],
    faculty: [
      ["Dr. Pavithra Rajnampalle", "Computer Science & Engineering", "Professor / Director", "Verify with college", "Use official directory"],
      ["Dr. Shankar Thawkar", "Computer Science & Engineering", "Associate Professor, HOD", "Verify with college", "Use official directory"],
      ["Mr. Vijay Subhash Katta", "Computer Science & Engineering", "Associate Professor & Assistant Dean Academics", "Verify with college", "Use official directory"],
      ["Dr. Dinesh Rai", "Computer Science & Engineering", "Associate Professor & Dy. HOD", "Verify with college", "Use official directory"],
      ["Dr. Sanjay Jain", "Electronics & Communication", "Professor & HOD", "Verify with college", "Use official directory"],
      ["Mr. Sanjay Singh", "Electronics & Communication", "Associate Professor & Dy. HOD", "Verify with college", "Use official directory"],
      ["Dr. Priya Kaushik", "Master of Business Administration", "Associate Professor / Dy. GM", "Verify with college", "Use official directory"],
      ["Mr. Shobhit Kant Sharma", "Master of Business Administration", "Assistant Professor / Head T&P", "Verify with college", "Use official directory"],
      ["Deepti Mittal", "Information Technology", "HOD", "Not provided", "Not provided", "7895225654"],
      ["Utkarsh Gupta", "Information Technology", "Not provided", "Not provided", "Not provided", "9368353243"]
    ]
  },
  {
    id: "iet-lucknow",
    name: "Institute of Engineering & Technology",
    shortName: "IET Lucknow",
    city: "Lucknow",
    location: "Lucknow, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 77,
    value: 3,
    source: "UPTAC 2024 reference",
    programs: [["AIML", "CSE (Artificial Intelligence)", "AI & Data"], ["IT", "Information Technology", "Software & Cloud"], ["ECE", "Electronics & Communication Engineering", "Electronics & VLSI"]],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI"]
  },
  {
    id: "jss-noida",
    name: "J.S.S. Academy of Technical Education",
    shortName: "JSS Noida",
    city: "Gautam Buddh Nagar",
    location: "Gautam Buddh Nagar, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 73,
    value: 2,
    source: "UPTAC 2024 reference",
    programs: [["AIML", "CSE (AI & ML)", "AI & Data"], ["IT", "Information Technology", "Software & Cloud"], ["ECE", "Electronics & Communication Engineering", "Electronics & VLSI"]],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI"]
  },
  {
    id: "knit-sultanpur",
    name: "Kamla Nehru Institute of Technology",
    shortName: "KNIT Sultanpur",
    city: "Sultanpur",
    location: "Sultanpur, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 72,
    value: 3,
    source: "UPTAC 2024 reference",
    programs: [["IT", "Information Technology", "Software & Cloud"], ["ECE", "Electronics Engineering", "Electronics & VLSI"], ["AIML", "Computer Science & Engineering", "AI & Data"]],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI"]
  },
  {
    id: "akgec-ghaziabad",
    name: "Ajay Kumar Garg Engineering College",
    shortName: "AKGEC",
    city: "Ghaziabad",
    location: "Ghaziabad, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 72,
    value: 2,
    source: "UPTAC 2024 reference",
    programs: [["AIML", "Artificial Intelligence & Machine Learning", "AI & Data"], ["IT", "Information Technology", "Software & Cloud"], ["ECE", "Electronics & Communication Engineering", "Electronics & VLSI"]],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI"]
  },
  {
    id: "kiet-ghaziabad",
    name: "KIET Group of Institutions",
    shortName: "KIET",
    city: "Ghaziabad",
    location: "Ghaziabad, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 70,
    value: 2,
    source: "UPTAC 2024 reference",
    programs: [["AIML", "CSE (AI & ML)", "AI & Data"], ["IT", "Information Technology", "Software & Cloud"], ["ECE", "Electronics & Communication Engineering", "Electronics & VLSI"]],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI"]
  },
  {
    id: "galgotias-noida",
    name: "Galgotia's College of Engineering & Technology",
    shortName: "GCET",
    city: "Gautam Buddh Nagar",
    location: "Gautam Buddh Nagar, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 68,
    value: 1,
    source: "UPTAC 2024 reference",
    programs: [["AIML", "CSE (AI & ML)", "AI & Data"], ["IT", "Information Technology", "Software & Cloud"], ["ECE", "Electronics & Communication Engineering", "Electronics & VLSI"]],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI"]
  },
  {
    id: "glb-noida",
    name: "G.L. Bajaj Institute of Technology & Management",
    shortName: "G.L. Bajaj",
    city: "Gautam Buddh Nagar",
    location: "Gautam Buddh Nagar, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 67,
    value: 1,
    source: "UPTAC 2024 reference",
    programs: [["AIML", "CSE (AI & ML)", "AI & Data"], ["IT", "Information Technology", "Software & Cloud"], ["ECE", "Electronics & Communication Engineering", "Electronics & VLSI"]],
    domains: ["AI & Data", "Software & Cloud", "Electronics & VLSI"]
  },
  {
    id: "cbs-agra",
    name: "Chaudhary Beeri Singh College of Engineering & Management",
    shortName: "CBS Agra",
    city: "Agra",
    location: "Agra, Uttar Pradesh",
    entrance: ["JEE Main"],
    guidanceScore: 55,
    value: 2,
    source: "UPTAC 2024 reference",
    programs: [["CSE", "Computer Science & Engineering", "Software & Cloud"]],
    domains: ["Software & Cloud"]
  }
];

let mathuraCollegeProfiles = [];
let mathuraDirectoryScope = "";
let admissionCollegeProfiles = [];
let admissionSelectedIds = [];
let admissionVerifiedEmail = false;

const state = {
  domains: new Set(),
  shortlist: [],
  facultyDepartment: "All",
  profile: { created: false, verified: false, name: "", branch: "AIML" },
  otpVerified: { phone: false, email: false },
  lastMatchCount: colleges.length,
  rankMode: false
};

const campusStops = [
  { id: "car-parking", name: "Car Parking", x: 82, y: 24, road: "g1" },
  { id: "gate1", name: "Gate 1", x: 87, y: 31, road: "g1" },
  { id: "water-treatment", name: "Water Treatment Plant", x: 8, y: 37, road: "westNorth" },
  { id: "faculty-quarters-west", name: "Faculty Quarters", x: 14, y: 37, road: "westNorth" },
  { id: "park-west", name: "Park", x: 14, y: 48, road: "westMid" },
  { id: "ro-plant-1", name: "RO Plant 1", x: 38, y: 26, road: "lib" },
  { id: "ro-plant-2", name: "RO Plant 2", x: 46, y: 26, road: "lib" },
  { id: "generator", name: "Generator", x: 50, y: 26, road: "lib" },
  { id: "library", name: "Library · Reading Room", x: 60, y: 25, road: "lib" },
  { id: "computer-lab", name: "Computer Lab · Library side", x: 66, y: 28, road: "lib" },
  { id: "mess", name: "Mess", x: 36, y: 37, road: "westNorth" },
  { id: "auditorium", name: "Auditorium", x: 72, y: 34, road: "east" },
  { id: "supporting-staff", name: "Supporting Staff Quarters", x: 25, y: 27, road: "westNorth" },
  { id: "new-building", name: "New Building · Biotech / Chemical", x: 22, y: 37, road: "westNorth" },
  { id: "girls-hostel", name: "Girls Hostel", x: 29, y: 36, road: "westNorth" },
  { id: "canteen", name: "Canteen", x: 21, y: 54, road: "westMid" },
  { id: "imcs", name: "IMCS Building", x: 34, y: 50, road: "imcs" },
  { id: "open-theatre", name: "Open Theatre", x: 53, y: 46, road: "theatre" },
  { id: "academic-ee", name: "EE Department", x: 53, y: 39, road: "ee" },
  { id: "academic-cs", name: "CS Department", x: 53, y: 44, road: "cs" },
  { id: "academic-ec", name: "EC Department", x: 53, y: 48, road: "ec" },
  { id: "academic-me", name: "ME Department", x: 53, y: 56, road: "me" },
  { id: "academic-it", name: "IT Department", x: 53, y: 58, road: "it" },
  { id: "gardens", name: "Garden", x: 66, y: 45, road: "garden" },
  { id: "bus-parking", name: "Bus Parking", x: 68, y: 64, road: "bus" },
  { id: "main-entrance", name: "Main Entrance", x: 73, y: 51, road: "eGarden" },
  { id: "front-lawn", name: "Front Lawn", x: 81, y: 51, road: "east" },
  { id: "two-wheel-parking", name: "2 Wheel Vehicle Parking", x: 86, y: 53, road: "eMid" },
  { id: "volleyball", name: "Volleyball Court", x: 45, y: 67, road: "south" },
  { id: "faculty-quarters-south", name: "Faculty Quarters", x: 34, y: 68, road: "south" },
  { id: "senior-boys-hostel", name: "Senior Boys Hostel", x: 32, y: 86, road: "south" },
  { id: "first-year-hostel", name: "First Year Hostel", x: 46, y: 86, road: "south" },
  { id: "ground", name: "Ground", x: 61, y: 80, road: "south" },
  { id: "tennis", name: "Tennis Court", x: 43, y: 76, road: "south" },
  { id: "cricket", name: "Cricket Ground", x: 19, y: 78, road: "cricket" },
  { id: "gate2", name: "Gate 2", x: 87, y: 71, road: "g2" }
];
const campusRoads = {
  g1: [87,31], east: [78,36], eMid: [77,44], eGarden: [70,44], cseEast: [61,44], cseCenter: [53,44], cseWest: [44,44], westNorth: [30,38], westMid: [29,53], imcs: [36,52], theatre: [53,48], ee: [53,40], cs: [53,44], ec: [53,49], me: [53,56], it: [53,60], garden: [66,46], bus: [68,64], south: [44,65], cricket: [22,68], g2: [87,71], lib: [63,30]
};
const campusRoadEdges = [
  ["g1","east"],["east","eMid"],["eMid","eGarden"],["eGarden","cseEast"],["cseEast","cseCenter"],["cseCenter","cseWest"],["cseWest","westMid"],["westMid","westNorth"],
  ["westNorth","lib"],["lib","eGarden"],["cseCenter","ee"],["cseCenter","cs"],["cseCenter","ec"],["ec","me"],["me","it"],["it","south"],
  ["eGarden","garden"],["garden","bus"],["bus","g2"],["south","bus"],["south","cricket"],["westMid","imcs"],["westMid","cricket"],["imcs","south"],["eMid","g2"]
];
let campusPosition = { x: 50, y: 50 };
let campusHeading = 0;
let campusZoom = 1.35;
let campusWatchId = null;
let priorGpsPosition = null;
let campusRoute = [];
let campusCollegesData = null;
let otpCooldownTimer = null;

function renderCampusMap() {
  const select = byId("campusDestination");
  const markers = byId("mapStops");
  if (!select || !markers) { return; }
  select.innerHTML = '<option value="">Choose a campus destination</option>' + campusStops.map(function (stop) { return '<option value="' + stop.id + '">' + escapeHTML(stop.name) + '</option>'; }).join("");
  markers.innerHTML = campusStops.map(function (stop, index) {
    return '<button type="button" class="campus-stop" style="--x:' + stop.x + '%;--y:' + stop.y + '%" data-campus-stop="' + stop.id + '" aria-label="Navigate to ' + escapeHTML(stop.name) + '" title="' + escapeHTML(stop.name) + '"></button>';
  }).join("");
  markers.querySelectorAll("[data-campus-stop]").forEach(function (button) {
    button.addEventListener("click", function () { selectCampusStop(button.dataset.campusStop); });
  });
  select.addEventListener("change", function () { if (select.value) selectCampusStop(select.value); });
  byId("startNavigation").addEventListener("click", showSchematicCampusRoute);
  byId("stopNavigation").addEventListener("click", function(){campusRoute=[];byId("walkRoutePath").setAttribute("d","");byId("routeArrows").setAttribute("d","");byId("gpsStatus").textContent="Route cleared. Choose a destination to plan another route.";byId("turnInstruction").textContent="Choose a destination";byId("turnDistance").textContent="Directions follow the schematic campus plan.";byId("stopNavigation").disabled=true;});
  byId("zoomIn").addEventListener("click", function () { campusZoom = Math.min(2.8, campusZoom + 0.15); setCampusCamera(); });
  byId("zoomOut").addEventListener("click", function () { campusZoom = Math.max(1, campusZoom - 0.15); setCampusCamera(); });
  byId("toggleMapView").addEventListener("click", function () { const viewport=byId("plan3dViewport");viewport.classList.toggle("flat");byId("toggleMapView").textContent=viewport.classList.contains("flat")?"2D":"3D";setCampusCamera(); });
  byId("resetCompass").addEventListener("click",function(){campusHeading=0;setCampusCamera();});
  byId("recenterMap").addEventListener("click",function(){byId("gpsStatus").textContent="Recenter needs a GPS fix and verified map alignment; neither can currently be projected onto this schematic.";});
  byId("fullscreenMap").addEventListener("click",function(){const viewport=byId("plan3dViewport");if(document.fullscreenElement)document.exitFullscreen();else if(viewport.requestFullscreen)viewport.requestFullscreen();});
  const search=byId("campusSearch");
  if(search) search.addEventListener("input",function(){
    const query=search.value.trim().toLocaleLowerCase();
    const matches=campusStops.filter(function(stop){return stop.name.toLocaleLowerCase().includes(query);});
    const results=matches.map(function(stop){return `<button type="button" data-search-stop="${stop.id}">${escapeHTML(stop.name)}</button>`;}).join("");
    byId("campusSearchResults").innerHTML=query?(results||'<span class="campus-search-empty">No matching location is listed in the supplied campus plan.</span>'):"";
    byId("campusSearchResults").querySelectorAll("[data-search-stop]").forEach(function(button){button.addEventListener("click",function(){search.value=campusStops.find(function(stop){return stop.id===button.dataset.searchStop;}).name;byId("campusSearchResults").innerHTML="";selectCampusStop(button.dataset.searchStop);});});
  });
  enableMapOrbit();
  setCampusCamera();
}

function showSchematicCampusRoute(){
  const id=byId("campusDestination").value;const destination=campusStops.find(function(stop){return stop.id===id;});
  if(!destination){byId("gpsStatus").textContent="Choose a campus destination first.";return;}
  const start=campusStops.find(function(stop){return stop.id===byId("campusRouteStart").value;})||campusStops.find(function(stop){return stop.id==="gate1";});
  campusRoute=shortestCampusRoute({x:start.x,y:start.y},destination);
  const d=campusRoute.map(function(p,i){return (i?"L ":"M ")+p.x+" "+p.y;}).join(" ");
  byId("walkRoutePath").setAttribute("d",d);
  byId("routeArrows").setAttribute("d","");
  byId("studentMarker").hidden=true;
  byId("destinationLabel").textContent=destination.name;
  byId("currentStopName").textContent=start.name+" → "+destination.name;
  byId("currentStopDetail").textContent="Suggested on-plan route · schematic only";
  byId("turnArrow").textContent="➤";
  byId("turnInstruction").textContent="Follow the pink line from "+start.name;
  byId("turnDistance").textContent="Suggested route through campus paths · no measured distance or travel time";
  byId("gpsStatus").textContent="Pink route shown from "+start.name+" to "+destination.name+". This is a schematic guide; confirm the way on site.";
  byId("stopNavigation").disabled=false;
  campusPosition={x:start.x,y:start.y};setCampusCamera();
}

function selectCampusStop(id) {
  const destination = campusStops.find(function (stop) { return stop.id === id; });
  if (!destination) return;
  byId("campusDestination").value=id;
  byId("destinationLabel").textContent = destination.name;
  byId("mapStops").querySelectorAll(".campus-stop").forEach(function (button) { const active=button.dataset.campusStop===id;button.classList.toggle("active",active);button.textContent=active?destination.name:""; });
  const info=byId("campusDestinationInfo");
  const kind=/lab/i.test(destination.name)?"Laboratory":/department/i.test(destination.name)?"Academic department":/hostel/i.test(destination.name)?"Hostel":/gate|entrance/i.test(destination.name)?"Entrance":/parking/i.test(destination.name)?"Parking":/garden|park|ground|court|theatre/i.test(destination.name)?"Outdoor facility":"Campus facility";
  if(info){info.hidden=false;info.innerHTML='<b>'+escapeHTML(destination.name)+'</b><span>'+kind+' · distance and walking time require a calibrated map and surveyed paths.</span><button type="button" id="infoNavigate">Navigate</button>';byId("infoNavigate").addEventListener("click",startCampusNavigation);}
}

function shortestCampusRoute(startPoint, destination) {
  const startNode = destination.road;
  const nodes = Object.keys(campusRoads);
  const edges = campusRoadEdges.map(function (edge) { return edge.slice(); });
  const tempStart = "__start";
  const nearest = nodes.slice().sort(function (a, b) {
    const pa = campusRoads[a], pb = campusRoads[b];
    return Math.hypot(pa[0] - startPoint.x, pa[1] - startPoint.y) - Math.hypot(pb[0] - startPoint.x, pb[1] - startPoint.y);
  })[0];
  edges.push([tempStart, nearest]);
  const distances = {}; const previous = {}; const open = new Set(nodes.concat(tempStart));
  distances[tempStart] = Math.hypot(campusRoads[nearest][0] - startPoint.x, campusRoads[nearest][1] - startPoint.y);
  while (open.size) {
    let current = null;
    open.forEach(function (node) { if (current === null || (distances[node] ?? Infinity) < (distances[current] ?? Infinity)) current = node; });
    if (current === null || !Number.isFinite(distances[current])) break;
    open.delete(current);
    if (current === startNode) break;
    edges.forEach(function (edge) {
      const next = edge[0] === current ? edge[1] : (edge[1] === current ? edge[0] : null);
      if (!next || !open.has(next)) return;
      const a = campusRoads[current] || startPoint, b = campusRoads[next];
      const candidate = distances[current] + Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (candidate < (distances[next] ?? Infinity)) { distances[next] = candidate; previous[next] = current; }
    });
  }
  const path = []; let node = startNode; path.push(node);
  while (node !== tempStart && previous[node]) { node = previous[node]; path.unshift(node); }
  const points = [{x:startPoint.x,y:startPoint.y}].concat(path.filter(function (id) { return id !== tempStart; }).map(function (id) { return {x:campusRoads[id][0],y:campusRoads[id][1]}; }));
  points.push({x:destination.x,y:destination.y});
  return simplifyRoute(points);
}

function simplifyRoute(points) {
  const result=[];
  points.forEach(function(p){const last=result[result.length-1]; if(!last||Math.hypot(last.x-p.x,last.y-p.y)>.25)result.push(p);});
  return result;
}

function routeDistanceMeters(points) {
  let distance=0;
  for(let i=1;i<points.length;i++) distance+=Math.hypot((points[i].x-points[i-1].x)*4.45,(points[i].y-points[i-1].y)*2.68);
  return distance;
}

function distanceToRouteMeters(point, route) {
  let best=Infinity;
  for(let i=1;i<route.length;i++){
    const a=route[i-1],b=route[i],dx=b.x-a.x,dy=b.y-a.y;
    const t=Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.y-a.y)*dy)/(dx*dx+dy*dy||1)));
    best=Math.min(best,Math.hypot(point.x-(a.x+t*dx),point.y-(a.y+t*dy))*3.4);
  }
  return best;
}

function calculateCampusRoute(rerouting) {
  const id=byId("campusDestination").value;
  const destination=campusStops.find(function(stop){return stop.id===id;});
  if(!destination)return;
  campusRoute=shortestCampusRoute(campusPosition,destination);
  const d=campusRoute.map(function(p,i){return (i?"L ":"M ")+p.x+" "+p.y;}).join(" ");
  byId("walkRoutePath").setAttribute("d",d);
  byId("routeArrows").setAttribute("d",campusRoute.slice(1,-1).map(function(p){return "M "+p.x+" "+p.y+" l 0.7 1.4 l -1.4 0 z";}).join(" "));
  const meters=routeDistanceMeters(campusRoute);
  const next=campusRoute[1]||{x:destination.x,y:destination.y};
  const angle=(Math.atan2(next.x-campusPosition.x,-(next.y-campusPosition.y))*180/Math.PI+360)%360;
  const delta=((angle-campusHeading+540)%360)-180;
  const instruction=Math.abs(delta)<30?"Continue on the campus path":(delta<0?"Turn left":"Turn right");
  const dist=Math.round(Math.hypot((next.x-campusPosition.x)*4.45,(next.y-campusPosition.y)*2.68));
  byId("turnArrow").textContent=Math.abs(delta)<30?"↑":(delta<0?"↰":"↱");
  byId("turnInstruction").textContent=rerouting?"Route recalculated · "+instruction:instruction;
  byId("turnDistance").textContent="About "+dist+" m to the next path point · approx. "+Math.round(meters)+" m total";
  byId("destinationLabel").textContent=destination.name;
  byId("currentStopName").textContent=destination.name;
  byId("currentStopDetail").textContent="Turn guidance is estimated from the plan drawing.";
}

function setCampusCamera() {
  const surface=byId("plan3dSurface"); if(!surface)return;
  const tilt=byId("plan3dViewport").classList.contains("flat")?0:22;
  surface.style.transform="translate(50%,50%) rotateX("+tilt+"deg) rotateZ("+(-campusHeading)+"deg) scale("+campusZoom+") translate("+(-campusPosition.x)+"% ,"+(-campusPosition.y)+"%)";
  byId("compassNeedle").style.transform="rotate("+(-campusHeading)+"deg)";
}

function campusPercentFromGps(latitude,longitude) {
  // The supplied campus plan has no verified georeferencing. Do not invent a GPS anchor.
  // Returning null prevents a real GPS fix from being placed at a fabricated map position.
  return null;
}

function startCampusNavigation() {
  if(!navigator.geolocation){byId("gpsStatus").textContent="This browser does not provide GPS location.";return;}
  const destination=byId("campusDestination").value;
  if(!destination){byId("gpsStatus").textContent="Choose a destination first.";return;}
  if(campusWatchId!==null)return;
  byId("gpsStatus").textContent="Waiting for location permission and a GPS fix…";
  byId("startNavigation").disabled=true;
  byId("stopNavigation").disabled=false;
  if(typeof DeviceOrientationEvent!=="undefined"&&typeof DeviceOrientationEvent.requestPermission==="function"){
    DeviceOrientationEvent.requestPermission().then(function(permission){if(permission==="granted")window.addEventListener("deviceorientation",onDeviceOrientation);startGpsWatch();}).catch(startGpsWatch);
  }else{window.addEventListener("deviceorientationabsolute",onDeviceOrientation);startGpsWatch();}
}

function onDeviceOrientation(event) {
  const heading=event.webkitCompassHeading!==undefined?event.webkitCompassHeading:(event.alpha===null?null:360-event.alpha);
  if(Number.isFinite(heading)) {campusHeading=heading;setCampusCamera();}
}

function startGpsWatch() {
  campusWatchId=navigator.geolocation.watchPosition(onCampusPosition,onCampusGpsError,{enableHighAccuracy:true,maximumAge:1000,timeout:20000});
}

function onCampusPosition(position) {
  const coords=position.coords;
  const p=campusPercentFromGps(coords.latitude,coords.longitude);
  if(!p){
    byId("gpsStatus").textContent="GPS fix received (±"+Math.round(coords.accuracy||0)+" m), but this schematic has no surveyed GPS alignment. Your location is not drawn and live routing is unavailable.";
    byId("studentMarker").hidden=true;byId("walkRoutePath").setAttribute("d","");byId("routeArrows").setAttribute("d","");
    byId("turnInstruction").textContent="Map alignment required";byId("turnDistance").textContent="Upload a georeferenced campus map/path network for real turn-by-turn navigation.";
    return;
  }
  campusPosition={x:p.x,y:p.y};
  if(Number.isFinite(coords.heading)){campusHeading=coords.heading;}else if(priorGpsPosition){
    const dy=coords.latitude-priorGpsPosition.lat,dx=(coords.longitude-priorGpsPosition.lon)*Math.cos(coords.latitude*Math.PI/180);
    if(Math.hypot(dx,dy)>0.00002)campusHeading=(Math.atan2(dx,dy)*180/Math.PI+360)%360;
  }
  priorGpsPosition={lat:coords.latitude,lon:coords.longitude};
  setCampusCamera();
  const accuracy=Math.round(coords.accuracy||0);
  byId("gpsStatus").textContent="Live GPS · accuracy ±"+accuracy+" m · updated "+new Date(position.timestamp).toLocaleTimeString();
  if(p.x<0||p.x>100||p.y<0||p.y>100){byId("gpsStatus").textContent+=" · GPS point is outside the campus plan bounds.";campusRoute=[];byId("walkRoutePath").setAttribute("d","");byId("routeArrows").setAttribute("d","");byId("turnInstruction").textContent="Return inside the mapped campus";byId("turnDistance").textContent="This schematic does not cover your current location.";}
  else if(campusRoute.length&&distanceToRouteMeters(p,campusRoute)>18){calculateCampusRoute(true);}else{calculateCampusRoute(false);}
}

function onCampusGpsError(error) {
  const messages={1:"Location permission was denied. Allow location access in browser settings to start live navigation.",2:"Your device could not get a location fix. Try again outdoors.",3:"GPS timed out. Check that location services are on, then retry."};
  byId("gpsStatus").textContent=messages[error.code]||"Could not read location.";
  byId("startNavigation").disabled=false;
  byId("stopNavigation").disabled=true;
  campusWatchId=null;
}

function stopCampusNavigation() {
  if(campusWatchId!==null)navigator.geolocation.clearWatch(campusWatchId);
  campusWatchId=null;priorGpsPosition=null;
  window.removeEventListener("deviceorientation",onDeviceOrientation);
  window.removeEventListener("deviceorientationabsolute",onDeviceOrientation);
  byId("startNavigation").disabled=false;
  byId("stopNavigation").disabled=true;
  byId("gpsStatus").textContent="Location is off. Your device position is not being collected.";
}

function enableMapOrbit() {
  const viewport=byId("plan3dViewport"); let drag=null;
  viewport.addEventListener("pointerdown",function(e){if(e.target.closest("button"))return;drag={x:e.clientX,heading:campusHeading};viewport.setPointerCapture(e.pointerId);viewport.classList.add("dragging");});
  viewport.addEventListener("pointermove",function(e){if(!drag)return;campusHeading=(drag.heading+(e.clientX-drag.x)*.35+360)%360;setCampusCamera();});
  const end=function(){drag=null;viewport.classList.remove("dragging");};viewport.addEventListener("pointerup",end);viewport.addEventListener("pointercancel",end);
  viewport.addEventListener("wheel",function(e){e.preventDefault();campusZoom=Math.max(1,Math.min(2.8,campusZoom+(e.deltaY<0?.06:-.06)));setCampusCamera();},{passive:false});
}

function startOtpCountdown(seconds) {
  const button=byId("sendOtp"); const label=byId("otpCountdown");
  let remaining=Math.max(0,Math.ceil(seconds)); button.disabled=true;label.hidden=false;
  if(otpCooldownTimer)window.clearInterval(otpCooldownTimer);
  const tick=function(){
    if(remaining<=0){window.clearInterval(otpCooldownTimer);otpCooldownTimer=null;button.disabled=false;updateOtpButtonLabel();label.hidden=true;return;}
    button.textContent="Resend in "+remaining+"s";label.textContent="You can request another code in "+remaining+" seconds.";remaining-=1;
  };
  tick();otpCooldownTimer=window.setInterval(tick,1000);
}

function updateOtpButtonLabel() {
  const button=byId("sendOtp");if(!button)return;
  button.textContent="Send "+(byId("otpChannel").value==="whatsapp"?"WhatsApp":"email")+" OTP";
}

async function requestRealOtp() {
  const email=byId("studentEmail").value.trim();const phone=byId("studentMobile").value.trim();
  const channel=byId("otpChannel").value;
  if(!byId("studentEmail").checkValidity()||!/^\+[1-9][0-9]{7,14}$/.test(phone)){
    byId("otpStatus").textContent="Enter a valid email and phone number with country code (for example +91…).";return;
  }
  const button=byId("sendOtp");button.disabled=true;byId("otpStatus").textContent="Requesting a real "+channel+" OTP from the provider…";
  try{
    const response=await fetch("/api/otp/request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email,phone:phone,channel:channel})});
    const result=await response.json();
    if(!response.ok){if(result.retryAfter)startOtpCountdown(result.retryAfter);throw new Error(result.message||"OTP delivery failed. Try again shortly.");}
    state.otpVerified={phone:false,email:false};state.profile.verified=false;
    state.profile.notifyChannel=channel;byId("otpCode").value="";
    byId("otpStatus").textContent=result.message+" Check your "+(channel==="whatsapp"?"WhatsApp":"email")+"; the code expires in 5 minutes.";
    startOtpCountdown(result.resendAfter||60);
  }catch(error){byId("otpStatus").textContent=error.message==="Failed to fetch"?"OTP service unavailable. Start the backend and check provider configuration.":error.message;if(!otpCooldownTimer)button.disabled=false;}
}

async function verifyRealOtp() {
  const channel=byId("otpChannel").value;const code=byId("otpCode").value.trim();
  if(!/^[0-9]{6}$/.test(code)){byId("otpStatus").textContent="Enter the 6-digit code sent to your "+(channel==="whatsapp"?"WhatsApp":"email")+".";return;}
  const button=byId("verifyOtp");button.disabled=true;
  try{
    const response=await fetch("/api/otp/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel:channel,code:code,email:byId("studentEmail").value.trim(),phone:byId("studentMobile").value.trim()})});
    const result=await response.json();
    if(!response.ok)throw new Error(result.message||"OTP verification failed.");
    state.otpVerified={phone:channel==="whatsapp",email:channel==="email"};state.profile.verified=Boolean(result.complete);state.profile.notifyChannel=channel;
    byId("otpStatus").textContent=(channel==="whatsapp"?"WhatsApp":"Email")+" verified. You can now save your student profile.";
    showToast((channel==="whatsapp"?"WhatsApp":"Email")+" verified.");
  }catch(error){byId("otpStatus").textContent=error.message==="Failed to fetch"?"OTP verification service is unreachable. Try again.":error.message;}
  finally{button.disabled=false;}
}

function showStudentDashboard(data) {
  const profile=data.profile;if(!profile)return;
  state.profile.created=true;state.profile.verified=true;state.profile.name=profile.name;state.profile.branch=profile.branch;state.profile.notifyChannel=profile.notifyChannel;
  byId("studentDashboard").hidden=false;byId("dashboardNavLink").hidden=false;byId("dashboardShortcut").hidden=false;
  byId("openAuth").textContent="Account active";
  byId("dashboardGreeting").textContent=(profile.name.split(/\s+/)[0]||"student")+".";
  byId("dashboardStudentName").textContent=profile.name;
  byId("dashboardStudentBranch").textContent=displayBranch(profile.branch)+" · admission pathway";
  byId("dashboardChannel").textContent=profile.notifyChannel==="whatsapp"?"WhatsApp":"Email";
  byId("dashboardContact").textContent=profile.notifyChannel==="whatsapp"?profile.phone:profile.email;
  byId("dashboardQualification").textContent=(profile.class12||"Profile saved")+(profile.class12Score?" · "+profile.class12Score:"");
  byId("dashboardEnquiryCount").textContent=String(data.enquiries.length);
  byId("dashboardNextStep").textContent=data.enquiries.length?"Follow up":"Explore";
  byId("dashboardInitials").textContent=profile.name.trim().split(/\s+/).slice(0,2).map(function(part){return part.charAt(0).toUpperCase();}).join("")||"NC";
  admissionVerifiedEmail=Boolean(data.verifiedEmail);
  byId("admissionVerifiedEmail").textContent=admissionVerifiedEmail?profile.email:"Email OTP verification required";
  if(!admissionVerifiedEmail){byId("admissionSendStatus").textContent="This profile was verified by WhatsApp. Verify the same email address with email OTP to unlock email requests.";}
  renderAdmissionHistory(data.admissionRequests||[]);
  loadAdmissionDirectoryData().then(renderAdmissionDirectory).catch(function(error){byId("admissionCollegeSelect").innerHTML='<option value="">College directory unavailable</option>';byId("admissionSendStatus").textContent="The college directory could not load. Refresh and try again.";console.warn("Admission directory unavailable.",error.message);});
  const list=byId("dashboardEnquiries");
  list.innerHTML=data.enquiries.length?data.enquiries.map(function(item){
    const college=escapeHTML(item.college_name);const id=escapeHTML(item.enquiry_id);const date=new Date(item.created_at).toLocaleDateString();
    const status=item.delivery_status==="accepted"?"provider accepted":item.delivery_status==="failed"?"delivery failed":"pending";
    return '<article class="dashboard-enquiry"><b>'+college+'</b><small>'+id+' · '+date+'</small><span class="dashboard-enquiry-status">'+status+'</span></article>';
  }).join(""):'<p class="dashboard-empty">Your first enquiry receipt will appear here.</p>';
}

async function loadAdmissionDirectoryData(){
  if(admissionCollegeProfiles.length)return;
  const response=await fetch("data/admission-colleges.json");if(!response.ok)throw new Error("College directory request failed");
  const data=await response.json();admissionCollegeProfiles=Array.isArray(data.colleges)?data.colleges:[];
  byId("admissionDirectoryCount").textContent=admissionCollegeProfiles.length+" colleges · included UPTAC list and Mathura directory";
}

function renderAdmissionDirectory(){
  const select=byId("admissionCollegeSelect");if(!select)return;
  const query=(byId("admissionCollegeSearch").value||"").trim().toLocaleLowerCase();
  const options=admissionCollegeProfiles.filter(function(item){const search=[item.name,item.address,item.category].concat(item.courses.map(c=>c.name)).join(" ").toLocaleLowerCase();return !admissionSelectedIds.includes(item.id)&&(!query||search.includes(query));});
  select.innerHTML='<option value="">Choose a college to add…</option>'+options.map(function(item){return '<option value="'+escapeHTML(item.id)+'">'+escapeHTML(item.name)+' · '+escapeHTML(item.city||item.address||'Uttar Pradesh')+'</option>';}).join("");
  renderAdmissionSelection();
}

function renderAdmissionSelection(){
  const selected=admissionSelectedIds.map(function(id){return admissionCollegeProfiles.find(function(c){return c.id===id;});}).filter(Boolean);
  const cards=byId("admissionSelectedCards");const courses=byId("admissionCourseSelect");const send=byId("sendAdmissionInformation");if(!cards||!courses||!send)return;
  send.innerHTML=(selected.length>1?'Send All Selected Colleges':'Send Selected College')+' Information to My Email <span aria-hidden="true">↗</span>';
  if(!selected.length){cards.innerHTML='<p class="admission-empty">Add one or more colleges to review their verified admission details.</p>';courses.innerHTML='<option value="">Select colleges first</option>';courses.disabled=true;send.disabled=true;return;}
  const shared=selected.length===1?selected[0].courses.map(c=>c.name):selected[0].courses.map(c=>c.name).filter(name=>selected.every(item=>item.courses.some(c=>c.name===name)));
  const previous=courses.value;courses.disabled=false;courses.innerHTML='<option value="">Choose a course…</option><option value="Admission overview">Admission overview · all selected colleges</option>'+shared.map(name=>'<option value="'+escapeHTML(name)+'">'+escapeHTML(name)+'</option>').join("");if(previous&&(previous==='Admission overview'||shared.includes(previous)))courses.value=previous;
  send.disabled=!admissionVerifiedEmail||!courses.value;
  const course=courses.value;
  cards.innerHTML=selected.map(function(item){
    const fee=course&&item.feeStructure?item.feeStructure[course]:null;
    const contacts=Array.isArray(item.admissionContacts)&&item.admissionContacts.length?item.admissionContacts.map(function(c){return escapeHTML(c.label)+': <a href="tel:'+escapeHTML(c.number)+'">'+escapeHTML(c.number)+'</a>';}).join('<br>'):'Information currently unavailable';
    const mail=item.admissionEmail?'<a href="mailto:'+escapeHTML(item.admissionEmail)+'">'+escapeHTML(item.admissionEmail)+'</a>':'Information currently unavailable';
    const verifiedFeeCount=Object.values(item.feeStructure||{}).filter(function(value){return Boolean(value.lastVerified);}).length;
    const feeText=fee?escapeHTML(fee.annualFee):course==='Admission overview'?'Branch-specific fee details are listed below.':verifiedFeeCount?'Select a branch to view its published fee.':'Fee not currently verified – Please check official admission page';
    const feeDate=fee?' · Last verified: '+escapeHTML(fee.lastVerified||'Not currently verified'):'';
    const map='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(item.mapQuery||item.name+', '+item.address);
    const branchList=item.courses.map(function(c){const courseFee=item.feeStructure&&item.feeStructure[c.name];const source=courseFee&&courseFee.source?'<a href="'+escapeHTML(courseFee.source)+'" target="_blank" rel="noreferrer">Official source ↗</a>':'Official fee source unavailable';return '<li><b>'+escapeHTML(c.name)+'</b><span>'+escapeHTML(courseFee?courseFee.annualFee:'Fee not currently verified')+' · Last verified: '+escapeHTML(courseFee&&courseFee.lastVerified?courseFee.lastVerified:'Not currently verified')+' · '+source+'</span></li>';}).join('');
    const website=item.collegeUrl?'<a href="'+escapeHTML(item.collegeUrl)+'" target="_blank" rel="noreferrer">Open college website ↗</a>':'Information currently unavailable';
    const admissionLink=item.admissionWebsite?'<a href="'+escapeHTML(item.admissionWebsite)+'" target="_blank" rel="noreferrer">Admissions / application ↗</a>':website;
    return '<article class="admission-college-card"><div class="admission-card-title"><div><span>'+escapeHTML(item.category||'College / university')+' · '+escapeHTML(item.city||'Uttar Pradesh')+'</span><h4>'+escapeHTML(item.name)+'</h4></div><button type="button" data-admission-remove="'+escapeHTML(item.id)+'" aria-label="Remove '+escapeHTML(item.shortName||item.name)+'">Remove</button></div><p>⌖ '+escapeHTML(item.address||'Location currently unavailable')+'</p><div class="admission-info-columns"><div><b>Admission contact</b><p>'+contacts+'</p><b>Admission email</b><p>'+mail+'</p><b>Selected course fee</b><p>'+feeText+feeDate+'</p><small>'+(fee&&fee.source?'Source: '+escapeHTML(fee.source):'Source: official fee schedule not currently verified')+'</small></div><div><b>Official website</b><p>'+website+'</p><b>Admission link</b><p>'+admissionLink+'</p><b>Directions</b><p><a href="'+escapeHTML(map)+'" target="_blank" rel="noreferrer">Route to campus in Maps ↗</a></p><small>Contact source: '+(item.admissionSource?'<a href="'+escapeHTML(item.admissionSource)+'" target="_blank" rel="noreferrer">Official source ↗</a>':'Not currently verified')+(item.admissionVerifiedDate?' · Checked '+escapeHTML(item.admissionVerifiedDate):'')+'</small></div></div><div class="admission-branches"><b>Available branches and fee status</b><ul>'+branchList+'</ul></div></article>';
  }).join("");
  cards.querySelectorAll('[data-admission-remove]').forEach(function(button){button.addEventListener('click',function(){admissionSelectedIds=admissionSelectedIds.filter(function(id){return id!==button.dataset.admissionRemove;});renderAdmissionDirectory();});});
}

function renderAdmissionHistory(requests){
  const target=byId("admissionRequestHistory");if(!target)return;
  target.innerHTML=requests.length?requests.map(function(item){const names=Array.isArray(item.college_names)?item.college_names.join(', '):item.college_names;const sent=item.delivery_status==='accepted';return '<article class="admission-history-row"><b>'+(sent?'✓ Sent':'• Send failed')+' · '+escapeHTML(names)+'</b><span>'+escapeHTML(item.course)+'</span><small>'+escapeHTML(item.request_id)+' · '+new Date(item.created_at).toLocaleString()+'</small><em class="'+(sent?'sent':'failed')+'">'+(sent?'Email accepted':'Retry available')+'</em></article>';}).join(''):'<p class="admission-empty">Requests you send will appear here.</p>';
}

async function sendSelectedAdmissionInformation(){
  const status=byId('admissionSendStatus');const button=byId('sendAdmissionInformation');
  if(!admissionVerifiedEmail){status.textContent='Verify your profile email with email OTP to use this feature.';return;}
  const course=byId('admissionCourseSelect').value;if(!admissionSelectedIds.length||!course){status.textContent='Select colleges and a course first.';return;}
  button.disabled=true;button.textContent='Sending admission information…';status.textContent='Sending to the verified email on your profile…';
  try{const response=await fetch('/api/admission-information/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({collegeIds:admissionSelectedIds,course})});const result=await response.json();if(!response.ok)throw new Error(result.message||"We couldn't send the admission information right now. Please try again.");status.textContent='Admission information sent to your verified email. Request ID: '+result.request.id;admissionSelectedIds=[];byId('admissionCollegeSearch').value='';await refreshStudentDashboard();}
  catch(error){status.textContent=error.message==='Failed to fetch'?"We couldn't send the admission information right now. Please try again.":error.message;await refreshStudentDashboard();}
  finally{renderAdmissionSelection();}
}

async function refreshStudentDashboard() {
  try{
    const response=await fetch("/api/student/dashboard");if(!response.ok)return;
    showStudentDashboard(await response.json());
  }catch(error){console.warn("Student dashboard could not be restored.",error.message);}
}

async function loadPdfColleges() {
  if(!campusCollegesData){const response=await fetch("data/uptac-colleges.json");if(!response.ok)throw new Error("College source unavailable");campusCollegesData=await response.json();}
  renderPdfCollegeSelection();byId("pdfCollegePage").hidden=false;
}

function renderPdfCollegeSelection() {
  if(!campusCollegesData)return;
  const query=(byId("pdfCollegeSearch").value||"").trim().toLocaleLowerCase();
  const visible=campusCollegesData.colleges.filter(function(name){
    if(name.toLocaleLowerCase().includes(query))return true;
    return campusCollegesData.preferenceRows.some(function(row){return row.college===name&&row.branch.toLocaleLowerCase().includes(query);});
  });
  byId("pdfCollegeCount").textContent="Showing "+visible.length+" of "+campusCollegesData.colleges.length+" distinct colleges · "+campusCollegesData.preferenceRows.length+" preference rows from "+campusCollegesData.pages+" PDF pages.";
  byId("pdfCollegeResults").innerHTML=visible.map(function(name){
    const choices=campusCollegesData.preferenceRows.filter(function(row){return row.college===name;});
    const first=choices.reduce(function(best,row){return Math.min(best,row.preference);},Infinity);
    return '<article class="pdf-college-card"><span class="pdf-rank">PREFERENCE #'+first+'</span><h3>'+escapeHTML(name)+'</h3><details><summary>'+choices.length+' branch preference'+(choices.length===1?'':'s')+'</summary><ol>'+choices.map(function(row){return '<li value="'+row.preference+'"><b>#'+row.preference+'</b> '+escapeHTML(row.branch)+'</li>';}).join('')+'</ol></details></article>';
  }).join("")||'<p class="pdf-empty">No matching college or branch found in the source list.</p>';
}

const byId = function (id) { return document.getElementById(id); };
const escapeHTML = function (value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
  });
};

function mathuraDomainsFor(profile) {
  const text = profile.courses.map(function (course) { return course.name + " " + course.group; }).join(" ").toLowerCase();
  const domains = [];
  if (/engineer|computer|technology|ai &|data science|electronics|mechanical|civil|electrical|biotechnology/.test(text)) domains.push("Engineering & Computing");
  if (/ai|data science/.test(text)) domains.push("AI & Data");
  if (/computer|software|application/.test(text)) domains.push("Software & Cloud");
  if (/electronics|electrical|vlsi/.test(text)) domains.push("Electronics & VLSI");
  if (/bba|mba|business|management|commerce/.test(text)) domains.push("Business & Finance");
  if (/arts|humanit|science|mathematics|physics|chemistry|botany|zoology/.test(text)) domains.push("Arts & Science");
  if (/law|ll\.b|education|pharmacy|pharm|professional/.test(text)) domains.push("Law & Professional Study");
  return domains.length ? domains : ["Engineering & Computing"];
}

async function loadMathuraDirectoryData() {
  const response = await fetch("data/mathura-colleges.json");
  if (!response.ok) throw new Error("Mathura college directory could not be loaded.");
  const data = await response.json();
  mathuraCollegeProfiles = Array.isArray(data.colleges) ? data.colleges : [];
  mathuraDirectoryScope = data.scope || "";
  mathuraCollegeProfiles.forEach(function (profile) {
    const programs = profile.courses.map(function (course) {
      let domain = "Software & Cloud";
      if (/bba|mba|business|commerce|management/i.test(course.name + " " + course.group)) domain = "Business & Finance";
      else if (/ece|electronic|electrical|vlsi/i.test(course.name)) domain = "Electronics & VLSI";
      else if (/arts|science|law|education|pharm|diploma/i.test(course.name + " " + course.group)) domain = "Arts & Science";
      else if (/ai|data/i.test(course.name)) domain = "AI & Data";
      return [course.code || "GENERAL", course.name, domain];
    });
    const existing = colleges.find(function (college) { return college.id === profile.id; });
    if (existing) {
      existing.mathuraProfile = profile;
      existing.city = "Mathura";
      existing.location = profile.address;
      existing.programs = programs;
      existing.domains = Array.from(new Set(existing.domains.concat(mathuraDomainsFor(profile))));
      existing.source = profile.directorySources.join(" + ");
      if (profile.preferenceRanks.length) existing.entrance = ["UPTAC", "JEE Main"];
    } else {
      colleges.push({
        id: profile.id,
        name: profile.name,
        shortName: profile.shortName,
        city: "Mathura",
        location: profile.address,
        entrance: profile.preferenceRanks.length ? ["UPTAC", "JEE Main"] : ["College process"],
        guidanceScore: 0,
        value: 1,
        featured: false,
        source: profile.directorySources.join(" + "),
        programs: programs,
        domains: mathuraDomainsFor(profile),
        mathuraProfile: profile
      });
    }
  });
  state.lastMatchCount = colleges.length;
  byId("mathuraScopeNote").textContent = mathuraDirectoryScope;
  byId("mathuraCount").textContent = String(mathuraCollegeProfiles.length).padStart(2, "0");
  byId("mathuraCollegeStat").textContent = String(mathuraCollegeProfiles.length).padStart(2, "0");
  byId("mathuraCourseStat").textContent = mathuraCollegeProfiles.reduce(function (sum, profile) { return sum + profile.courses.length; }, 0).toLocaleString("en-IN");
  renderMathuraDirectory();
}

function renderMathuraDirectory() {
  const target = byId("mathuraCollegeResults");
  if (!target) return;
  const query = (byId("mathuraSearch").value || "").trim().toLocaleLowerCase();
  const category = byId("mathuraCategory").value;
  const visible = mathuraCollegeProfiles.filter(function (profile) {
    const searchable = [profile.name, profile.shortName, profile.address, profile.category, profile.overview]
      .concat(profile.courses.map(function (course) { return course.name + " " + course.group; }))
      .join(" ").toLocaleLowerCase();
    return (category === "all" || profile.category === category) && (!query || searchable.includes(query));
  });
  byId("mathuraResultCount").textContent = "Showing " + visible.length + " of " + mathuraCollegeProfiles.length + " profiles · search across names, campus areas and published course summaries.";
  target.innerHTML = visible.map(function (profile) {
    const saved = state.shortlist.indexOf(profile.id) > -1;
    const sourceLabel = profile.directorySources.some(function (source) { return source.indexOf("district") > -1; }) ? "District listed" : "UPTAC listed";
    const preview = profile.courses.slice(0, 3).map(function (course) { return "<span>" + escapeHTML(course.name) + "</span>"; }).join("");
    const more = profile.courses.length > 3 ? '<span class="course-more">+' + (profile.courses.length - 3) + " more</span>" : "";
    const facultySummary = profile.facultyHighlights.length ? profile.facultyHighlights.length + " selected public faculty profiles" : "Faculty source linked";
    const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(profile.mapQuery || (profile.name + ", " + profile.address));
    return '<article class="mathura-college-card">' +
      '<div class="mathura-card-top"><span class="mathura-card-category">' + escapeHTML(profile.category) + '</span><span class="mathura-card-source">' + sourceLabel + '</span></div>' +
      '<h3>' + escapeHTML(profile.name) + '</h3>' +
      '<p class="mathura-card-address"><span aria-hidden="true">⌖</span>' + escapeHTML(profile.address) + '</p>' +
      '<div class="mathura-course-preview">' + preview + more + '</div>' +
      '<p class="mathura-card-meta">' + profile.courses.length + ' course groups · ' + escapeHTML(facultySummary) + '</p>' +
      '<div class="mathura-card-actions"><button type="button" data-mathura-open="' + escapeHTML(profile.id) + '">Explore profile →</button><button type="button" data-mathura-save="' + escapeHTML(profile.id) + '" aria-label="' + (saved ? "Remove " : "Save ") + escapeHTML(profile.shortName) + ' ' + (saved ? "from" : "to") + ' shortlist">' + (saved ? "✓ Saved" : "+ Compare") + '</button><a href="' + escapeHTML(mapUrl) + '" target="_blank" rel="noreferrer" aria-label="Open map for ' + escapeHTML(profile.shortName) + '">Map ↗</a></div>' +
      '</article>';
  }).join("") || '<p class="mathura-empty">No college or course matches that search. Try another name, branch or area.</p>';
  target.querySelectorAll("[data-mathura-open]").forEach(function (button) {
    button.addEventListener("click", function () { openMathuraCollegeDetails(button.dataset.mathuraOpen); });
  });
  target.querySelectorAll("[data-mathura-save]").forEach(function (button) {
    button.addEventListener("click", function () { toggleShortlist(button.dataset.mathuraSave); });
  });
}

function openMathuraCollegeDetails(id) {
  const profile = mathuraCollegeProfiles.find(function (item) { return item.id === id; });
  if (!profile) return;
  const saved = state.shortlist.indexOf(profile.id) > -1;
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(profile.mapQuery || (profile.name + ", " + profile.address));
  const ranks = profile.preferenceRanks.length ? "UPTAC preference rows in the supplied 2024 list: " + profile.preferenceRanks.map(function (rank) { return "#" + rank; }).join(", ") + "." : "Listed by the Mathura district administration.";
  const faculty = profile.facultyHighlights.length ? profile.facultyHighlights.map(function (person) {
    return '<div class="mathura-faculty-person"><b>' + escapeHTML(person.name) + '</b><span>' + escapeHTML(person.title) + ' · ' + escapeHTML(person.department) + '</span><small>' + escapeHTML(person.source) + '</small></div>';
  }).join("") : '<p>No current public faculty names were available in the linked source. Use the official link to request a current department-wise roster.</p>';
  byId("mathuraCollegeDetail").innerHTML =
    '<div class="mathura-detail-head"><p class="eyebrow"><span></span> ' + escapeHTML(profile.category) + ' · Mathura</p><h2 id="mathuraDetailTitle">' + escapeHTML(profile.name) + '</h2><p>⌖ ' + escapeHTML(profile.address) + '</p></div>' +
    '<div class="mathura-detail-actions"><button type="button" data-mathura-detail-save="' + escapeHTML(profile.id) + '">' + (saved ? "✓ Saved to shortlist" : "+ Add to shortlist") + '</button><a href="' + escapeHTML(mapUrl) + '" target="_blank" rel="noreferrer">Campus map ↗</a><a href="' + escapeHTML(profile.collegeUrl) + '" target="_blank" rel="noreferrer">Official website ↗</a><a href="' + escapeHTML(profile.coursesUrl) + '" target="_blank" rel="noreferrer">Course source ↗</a><a href="' + escapeHTML(profile.facultyUrl) + '" target="_blank" rel="noreferrer">Faculty source ↗</a></div>' +
    '<div class="mathura-detail-layout"><section class="mathura-detail-panel"><h3>Courses and study paths</h3><p>Published programme snapshot. Confirm current seats, eligibility, fees and admission routes with the institution.</p>' + profile.courses.map(function (course) { return '<div class="mathura-detail-course"><b>' + escapeHTML(course.name) + '</b><span>' + escapeHTML(course.group) + '</span></div>'; }).join("") + '</section>' +
    '<section class="mathura-detail-panel"><h3>Faculty and departments</h3><p>' + escapeHTML(profile.facultyNote) + '</p><div class="mathura-faculty-list">' + faculty + '</div><div class="mathura-detail-source"><b>Source status</b><br>' + escapeHTML(profile.facultySource) + '</div></section></div>' +
    '<p class="mathura-detail-source"><b>Course source:</b> ' + escapeHTML(profile.programSource) + '<br><b>List context:</b> ' + escapeHTML(ranks) + '<br><b>Campus map:</b> Google Maps search built from the published institution name and address.</p>';
  byId("mathuraCollegeDetail").querySelector("[data-mathura-detail-save]").addEventListener("click", function () {
    toggleShortlist(profile.id);
    openMathuraCollegeDetails(profile.id);
  });
  openModal("mathuraCollegeModal");
}

function displayBranch(code) {
  const branches = { AIML: "AI & Data", IT: "Information Technology", ECE: "Electronics & Communication", BBA: "BBA", MBA: "MBA", BCA: "BCA", MTECH: "M.Tech", CSE: "Computer Science & Engineering", ENGINEERING: "Engineering", MANAGEMENT: "Management & Computing", GENERAL: "Undergraduate", PROFESSIONAL: "Professional courses", POSTGRADUATE: "Postgraduate", DIPLOMA: "Diploma", COMPUTING: "Computer applications", LAW: "Law", CHEMICAL: "Chemical Engineering" };
  return branches[code] || code;
}

function selectedBranch() {
  return byId("branchFilter").value;
}

function getMatches() {
  const city = byId("cityFilter").value;
  const entrance = byId("entranceFilter").value;
  const score = Number(byId("scoreFilter").value);
  const branch = selectedBranch();
  const valueFocused = byId("valueFilter").checked;

  return colleges.filter(function (college) {
    const cityMatch = city === "all" || college.city === city;
    const entranceMatch = entrance === "all" || college.entrance.indexOf(entrance) > -1;
    const branchMatch = branch === "all" || college.programs.some(function (program) { return program[0] === branch; });
    const domainMatch = state.domains.size === 0 || Array.from(state.domains).some(function (domain) { return college.domains.indexOf(domain) > -1; });
    const scoreMatch = !score || !college.guidanceScore || score >= college.guidanceScore;
    const valueMatch = !valueFocused || college.mathuraProfile || college.value >= 2;
    return cityMatch && entranceMatch && branchMatch && domainMatch && scoreMatch && valueMatch;
  });
}

function createTags(college) {
  const labels = college.programs.slice(0, 3).map(function (program) { return displayBranch(program[0]); });
  return labels.map(function (label) { return "<span>" + escapeHTML(label) + "</span>"; }).join("");
}

function renderColleges() {
  let matches = getMatches();
  const rank = Number(byId("rankFilter").value);
  if (state.rankMode && rank > 0) {
    matches = matches.slice().sort(function (a, b) { return b.guidanceScore - a.guidanceScore; });
  }
  state.lastMatchCount = matches.length;
  byId("resultCount").textContent = String(matches.length).padStart(2, "0");
  byId("matchNumber").textContent = String(matches.length).padStart(2, "0");

  const city = byId("cityFilter").value;
  const branch = selectedBranch();
  const filters = [];
  if (city !== "all") { filters.push(city); }
  if (branch !== "all") { filters.push(displayBranch(branch)); }
  if (state.domains.size) { filters.push(Array.from(state.domains).join(" + ")); }
  byId("activeFilterText").textContent = filters.length ? "for " + filters.join(" · ") : "across Uttar Pradesh";

  const target = byId("collegeResults");
  if (!matches.length) {
    target.innerHTML = '<article class="college-card"><h3>No exact result yet</h3><p class="place">Try removing a score, domain or city filter. Your shortlist is still available.</p></article>';
    return;
  }
  target.innerHTML = matches.map(function (college) {
    const saved = state.shortlist.indexOf(college.id) > -1;
    const sourceClass = college.featured ? "" : " reference";
    const sourceText = college.featured ? "Featured college profile" : college.mathuraProfile ? "Mathura college profile" : "UPTAC reference sample";
    const action = college.featured || college.mathuraProfile ? "Explore profile" : "Save / compare";
    return '<article class="college-card' + (college.featured ? " featured" : "") + '">' +
      '<button class="save-college' + (saved ? " saved" : "") + '" data-save="' + college.id + '" aria-label="Save ' + escapeHTML(college.shortName) + '">' + (saved ? "✓" : "+") + '</button>' +
      '<span class="card-source' + sourceClass + '">' + (state.rankMode && rank > 0 ? (rank <= 10000 && college.guidanceScore >= 72 ? "Explore first · demo grouping" : rank <= 50000 && college.guidanceScore >= 67 ? "Explore next · demo grouping" : "Explore and verify · demo grouping") : sourceText) + '</span>' +
      '<h3>' + escapeHTML(college.name) + '</h3>' +
      '<p class="place">' + escapeHTML(college.location) + '</p>' +
      '<div class="card-tags">' + createTags(college) + '</div>' +
      '<div class="card-bottom"><span>' + escapeHTML(college.entrance.join(" / ")) + ' route</span><button data-explore="' + college.id + '">' + action + ' →</button></div>' +
    '</article>';
  }).join("");
  target.querySelectorAll("[data-save]").forEach(function (button) {
    button.addEventListener("click", function () { toggleShortlist(button.dataset.save); });
  });
  target.querySelectorAll("[data-explore]").forEach(function (button) {
    button.addEventListener("click", function () { exploreCollege(button.dataset.explore); });
  });
}

function renderShortlist() {
  const picked = state.shortlist.map(function (id) { return colleges.find(function (college) { return college.id === id; }); }).filter(Boolean);
  byId("shortlistCount").textContent = picked.length;
  byId("shortlistEmpty").hidden = picked.length > 0;
  byId("shortlistItems").innerHTML = picked.map(function (college, index) {
    return '<div class="shortlist-item"><span>0' + (index + 1) + '</span><div><b>' + escapeHTML(college.shortName) + '</b><small>' + escapeHTML(college.city) + '</small></div><button data-remove="' + college.id + '" aria-label="Remove ' + escapeHTML(college.shortName) + '">×</button></div>';
  }).join("");
  byId("shortlistItems").querySelectorAll("[data-remove]").forEach(function (button) {
    button.addEventListener("click", function () { toggleShortlist(button.dataset.remove); });
  });
  byId("compareButton").disabled = picked.length < 2;
}

function toggleShortlist(id) {
  const index = state.shortlist.indexOf(id);
  if (index > -1) {
    state.shortlist.splice(index, 1);
    showToast("Removed from your shortlist.");
  } else {
    if (state.shortlist.length >= 3) {
      showToast("Your shortlist has room for three colleges. Remove one to add another.");
      return;
    }
    state.shortlist.push(id);
    showToast("Saved to your shortlist.");
  }
  renderColleges();
  renderShortlist();
  if (mathuraCollegeProfiles.length) renderMathuraDirectory();
}

function exploreCollege(id) {
  const college = colleges.find(function (item) { return item.id === id; });
  if (!college) { return; }
  if (college.featured) {
    document.querySelector("#collegeProfile").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("HCST's featured profile includes currently verified public details.");
    return;
  }
  if (college.mathuraProfile) {
    openMathuraCollegeDetails(id);
    return;
  }
  if (state.shortlist.indexOf(id) === -1) { toggleShortlist(id); }
  showToast(college.shortName + " is a UPTAC 2024 discovery reference. Compare it, then verify the current details with the college.");
}

function renderFaculty(department) {
  const hcst = colleges[0];
  const allDepartments = ["All"].concat(Array.from(new Set(hcst.faculty.map(function (person) { return person[1]; }))));
  byId("facultyFilters").innerHTML = allDepartments.map(function (item) {
    return '<button class="' + (department === item ? "active" : "") + '" data-department="' + escapeHTML(item) + '">' + escapeHTML(item === "All" ? "All faculty" : item) + '</button>';
  }).join("");
  const people = department === "All" ? hcst.faculty : hcst.faculty.filter(function (person) { return person[1] === department; });
  byId("facultyRows").innerHTML = people.map(function (person) {
    return "<tr>" + person.map(function (value, index) {
      if(index===5&&/^\d{10}$/.test(value))return '<td><a href="tel:+91'+value+'">+91 '+escapeHTML(value)+'</a></td>';
      return "<td>" + (index > 2 ? "<small>" + escapeHTML(value) + "</small>" : escapeHTML(value)) + "</td>";
    }).join("") + (person.length<6?"<td><small>Not provided</small></td>":"") + "</tr>";
  }).join("");
  byId("facultyFilters").querySelectorAll("[data-department]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.facultyDepartment = button.dataset.department;
      renderFaculty(state.facultyDepartment);
    });
  });
}

function renderPrograms() {
  byId("programList").innerHTML = colleges[0].programs.map(function (program) {
    return '<article class="program-item"><strong>' + displayBranch(program[0]) + '</strong><span>' + escapeHTML(program[1]) + '</span><small>' + escapeHTML(program[2]) + '</small></article>';
  }).join("");
}

function fillCollegeSelects() {
  const options = colleges.map(function (college) {
    return '<option value="' + college.id + '">' + escapeHTML(college.name) + " - " + escapeHTML(college.city) + "</option>";
  }).join("");
  byId("enquiryCollege").innerHTML = options;
  byId("visitCollege").innerHTML = options;
}

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(function () { toast.classList.remove("show"); }, 4300);
}

function openModal(id) {
  const dialog = byId(id);
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeModal(id) {
  const dialog = byId(id);
  if (dialog.open && typeof dialog.close === "function") { dialog.close(); }
  else { dialog.removeAttribute("open"); }
}

function showComparison() {
  const picked = state.shortlist.map(function (id) { return colleges.find(function (college) { return college.id === id; }); }).filter(Boolean);
  if (picked.length < 2) {
    showToast("Save at least two colleges to compare them.");
    return;
  }
  const rows = [
    ["City", function (college) { return college.city; }],
    ["Program paths", function (college) { return college.programs.map(function (program) { return displayBranch(program[0]); }).join(", "); }],
    ["Entrance route", function (college) { return college.entrance.join(" / "); }],
    ["Information status", function (college) { return college.featured ? "Featured profile with public HCST context" : college.mathuraProfile ? "Mathura directory profile; source links shown" : "UPTAC 2024 discovery reference"; }],
    ["What to verify", function (college) { return college.featured ? "Current eligibility, fees, floor/classroom counts, personal faculty contacts" : "Current programme availability, fees, eligibility and faculty appointments"; }]
  ];
  byId("comparisonWrap").innerHTML = '<table class="comparison-table"><thead><tr><th>Compare</th>' + picked.map(function (college) { return "<th>" + escapeHTML(college.shortName) + "</th>"; }).join("") + "</tr></thead><tbody>" +
    rows.map(function (row) {
      return "<tr><td>" + row[0] + "</td>" + picked.map(function (college) { return "<td>" + escapeHTML(row[1](college)) + "</td>"; }).join("") + "</tr>";
    }).join("") + "</tbody></table>";
  openModal("compareModal");
}

function ensureProfile(forAction) {
  if (state.profile.created && state.profile.verified) { return true; }
  showToast("Create and verify your student profile before " + forAction + ".");
  openModal("authModal");
  return false;
}

function openChat() {
  const panel = byId("chatPanel");
  panel.hidden = false;
  byId("chatInput").focus();
}

function addChatMessage(text, type) {
  const message = document.createElement("div");
  message.className = type === "user" ? "user-message" : "bot-message";
  message.textContent = text;
  byId("chatLog").appendChild(message);
  byId("chatLog").scrollTop = byId("chatLog").scrollHeight;
}

function guideReply(prompt) {
  const value = prompt.toLowerCase();
  if (value.indexOf("jee") > -1 || value.indexOf("cuet") > -1 || value.indexOf("score") > -1) {
    return "Start in Find my matches: choose JEE Main or CUET, then enter your score as a discovery signal. Treat the results as a shortlist, not a cut-off prediction; confirm the current criteria with each college.";
  }
  if (value.indexOf("visit") > -1 || value.indexOf("campus") > -1 || value.indexOf("lab") > -1) {
    return "Book a visit, then ask to see the labs for your branch, a typical classroom, student support and the commute at class time. The campus tab has a ready-made checklist.";
  }
  if (value.indexOf("counsell") > -1 || value.indexOf("contact") > -1 || value.indexOf("question") > -1) {
    return "Use Ask a college question. In a production system, your consented enquiry goes to that college's counselling team with your selected branch. This prototype records the workflow without sending a real message.";
  }
  if (value.indexOf("fee") > -1 || value.indexOf("cost") > -1 || value.indexOf("pg") > -1 || value.indexOf("stay") > -1) {
    return "Switch on value-focused choices to prioritise the demo affordability signal. For any college, get the official fee structure in writing and compare commute, stay, food and deposit costs before deciding.";
  }
  return "I can help you narrow your city, branch, JEE/CUET route or visit questions. For formal eligibility and admission decisions, confirm the latest information with the college.";
}

function submitChat(prompt) {
  const cleaned = prompt.trim();
  if (!cleaned) { return; }
  addChatMessage(cleaned, "user");
  window.setTimeout(function () { addChatMessage(guideReply(cleaned), "bot"); }, 260);
}

function setupEvents() {
  ["cityFilter", "entranceFilter", "scoreFilter", "branchFilter", "valueFilter"].forEach(function (id) {
    byId(id).addEventListener("input", renderColleges);
    byId(id).addEventListener("change", renderColleges);
  });
  byId("applyFilters").addEventListener("click", function () {
    renderColleges();
    document.querySelector(".results-section").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  byId("resetFilters").addEventListener("click", function () {
    byId("cityFilter").value = "all";
    byId("entranceFilter").value = "all";
    byId("scoreFilter").value = "";
    byId("branchFilter").value = "all";
    byId("valueFilter").checked = false;
    state.domains.clear();
    byId("domainPicker").querySelectorAll("button").forEach(function (button) { button.classList.remove("active"); });
    renderColleges();
    showToast("Filters reset. HCST remains featured by default.");
  });
  byId("mathuraSearch").addEventListener("input", renderMathuraDirectory);
  byId("mathuraCategory").addEventListener("change", renderMathuraDirectory);
  byId("domainPicker").querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
      const domain = button.dataset.domain;
      if (state.domains.has(domain)) {
        state.domains.delete(domain);
        button.classList.remove("active");
      } else {
        state.domains.add(domain);
        button.classList.add("active");
      }
      renderColleges();
    });
  });
  byId("compareButton").addEventListener("click", showComparison);
  byId("scrollToTest").addEventListener("click", function () { byId("aptitude").scrollIntoView({ behavior: "smooth" }); });
  byId("placementToTest").addEventListener("click", function () { byId("aptitude").scrollIntoView({ behavior: "smooth" }); });

  document.querySelectorAll(".profile-tabs button").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".profile-tabs button").forEach(function (item) { item.classList.remove("active"); });
      document.querySelectorAll(".tab-pane").forEach(function (pane) { pane.classList.remove("active"); });
      button.classList.add("active");
      byId("tab-" + button.dataset.tab).classList.add("active");
    });
  });
  document.querySelectorAll(".zone").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".zone").forEach(function (zone) { zone.classList.remove("active"); });
      button.classList.add("active");
      byId("zoneText").textContent = button.dataset.zone + " - a helpful stop for your guided visit.";
    });
  });

  byId("openAuth").addEventListener("click", function () { if(state.profile.created)byId("studentDashboard").scrollIntoView({behavior:"smooth"});else openModal("authModal"); });
  byId("dashboardShortcut").addEventListener("click",function(){byId("studentDashboard").scrollIntoView({behavior:"smooth"});});
  byId("dashboardAskQuestion").addEventListener("click",function(){openModal("enquiryModal");});
  byId("admissionCollegeSearch").addEventListener("input",renderAdmissionDirectory);
  byId("admissionCollegeSelect").addEventListener("change",function(){const id=byId("admissionCollegeSelect").value;if(id&&!admissionSelectedIds.includes(id)){if(admissionSelectedIds.length>=10){byId("admissionSendStatus").textContent="Choose up to 10 colleges per email request.";return;}admissionSelectedIds.push(id);byId("admissionSendStatus").textContent="";renderAdmissionDirectory();}});
  byId("admissionCourseSelect").addEventListener("change",renderAdmissionSelection);
  byId("sendAdmissionInformation").addEventListener("click",sendSelectedAdmissionInformation);
  byId("dashboardProfileShortcut").addEventListener("click",function(){byId("dataStorage").scrollIntoView({behavior:"smooth"});});
  byId("otpChannel").addEventListener("change",function(){
    if(state.profile.verified){state.profile.verified=false;state.otpVerified={phone:false,email:false};byId("otpStatus").textContent="Channel changed. Request and verify a new code for this channel.";}
    updateOtpButtonLabel();
  });
  byId("openIsim").addEventListener("click", function () { openModal("isimModal"); });
  byId("isimCreateProfile").addEventListener("click", function () { closeModal("isimModal");openModal("authModal"); });
  byId("rankChoices").addEventListener("click", function () {
    const rank = Number(byId("rankFilter").value);
    if (!rank || rank < 1) { byId("rankNote").textContent = "Enter a positive rank to show demo grouping labels."; return; }
    state.rankMode = true;
    byId("rankNote").textContent = "Demo grouping for rank " + rank.toLocaleString("en-IN") + ". This is not an official UPTAC cutoff or allotment prediction.";
    renderColleges();
  });
  byId("rankFilter").addEventListener("input", function () { if (!byId("rankFilter").value) { state.rankMode = false; renderColleges(); } });
  byId("imageLinkForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const url = byId("imageUrl").value.trim();
    const image = byId("imagePreview");
    image.onload = function () { image.hidden = false; byId("imageStatus").textContent = "Image preview loaded."; };
    image.onerror = function () { image.hidden = true; byId("imageStatus").textContent = "Could not load that URL as an image. Check the direct image link."; };
    image.src = url;
  });
  document.querySelectorAll(".open-auth").forEach(function (button) { button.addEventListener("click", function () { if(state.profile.created)byId("studentDashboard").scrollIntoView({behavior:"smooth"});else openModal("authModal"); }); });
  document.querySelectorAll("[data-close]").forEach(function (button) { button.addEventListener("click", function () { closeModal(button.dataset.close); }); });
  byId("openEnquiry").addEventListener("click", function () { if(ensureProfile("sending an admission enquiry"))openModal("enquiryModal"); });
  byId("openVisit").addEventListener("click", function () { openModal("visitModal"); });
  byId("openVisitGallery").addEventListener("click", function () { openModal("visitModal"); });
  byId("showStayTips").addEventListener("click", function () {
    byId("stayCard").scrollIntoView({ behavior: "smooth", block: "center" });
    byId("stayCard").animate([{ transform: "translateY(0)" }, { transform: "translateY(-6px)" }, { transform: "translateY(0)" }], { duration: 460 });
  });

  byId("sendOtp").addEventListener("click", requestRealOtp);
  byId("verifyOtp").addEventListener("click", verifyRealOtp);
  byId("pdfCollegeSearch").addEventListener("input", renderPdfCollegeSelection);
  byId("openCollegeList").addEventListener("click", async function(event){event.preventDefault();try{await loadPdfColleges();byId("pdfCollegePage").scrollIntoView({behavior:"smooth",block:"start"});}catch(error){showToast("The full college list could not load. Refresh and try again.");}});
  byId("profileForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!state.profile.verified) {
      byId("profileStatus").textContent = "Verify the email or WhatsApp channel you selected before continuing.";
      return;
    }
    const profile={name:byId("studentName").value.trim(),email:byId("studentEmail").value.trim(),phone:byId("studentMobile").value.trim(),branch:byId("studentBranch").value,class10:byId("class10").value.trim(),class10Score:byId("class10Score").value.trim(),class12:byId("class12").value.trim(),class12Score:byId("class12Score").value.trim(),entrance:byId("studentEntrance").value,score:byId("studentScore").value.trim(),consent:byId("profileConsent").checked};
    byId("profileStatus").textContent="Creating your profile…";
    let savedFile="";
    try {
      const response=await fetch("/api/profile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(profile)});
      const result=await response.json();
      if(!response.ok)throw new Error(result.message||"Profile could not be created.");
      if(!result.saved||!result.excelFile)throw new Error("The server did not confirm that the profile was saved.");
      savedFile=result.excelFile;
    } catch(error) { byId("profileStatus").textContent=error.message==="Failed to fetch"?"The backend is unreachable. Start the NexusCampus server and try again.":error.message;return; }
    state.profile.created = true;
    state.profile.name = byId("studentName").value.trim();
    state.profile.branch = byId("studentBranch").value;
    state.profile.notifyChannel = byId("otpChannel").value;
    byId("admissionContacts").classList.add("contacts-unlocked");
    byId("profileStatus").textContent = "Profile saved for " + state.profile.name + " in " + savedFile + ". Your dashboard is ready.";
    await refreshStudentDashboard();
    showToast("Profile saved to " + savedFile + ".");
    try {
      await loadPdfColleges();
      window.setTimeout(function () { closeModal("authModal");byId("pdfCollegePage").scrollIntoView({behavior:"smooth"}); }, 400);
    } catch(error) { byId("profileStatus").textContent="Profile verified, but the PDF college list could not load. Refresh and try again."; }
  });
  byId("studentBranch").addEventListener("change", function () {
    byId("testBranchLabel").textContent = displayBranch(byId("studentBranch").value) + " path";
  });

  byId("sendToCollege").addEventListener("click", function () {
    if (!ensureProfile("sharing your profile")) { return; }
    showToast("Sharing consent recorded for HCST. Prototype mode: no student data or email was sent.");
  });
  byId("enquiryForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    if(!ensureProfile("sending an admission enquiry"))return;
    const college = colleges.find(function (item) { return item.id === byId("enquiryCollege").value; });
    const button=byId("enquiryForm").querySelector("button[type=submit]");button.disabled=true;
    byId("enquiryStatus").textContent="Saving your enquiry and requesting a receipt…";
    try{
      const response=await fetch("/api/student/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({college:college.name,question:byId("enquiryText").value.trim()})});
      const result=await response.json();
      if(!response.ok||!result.deliveryAccepted)throw new Error(result.message||"The receipt provider did not accept the request.");
      byId("enquiryStatus").textContent="Receipt accepted by "+(result.enquiry.channel==="whatsapp"?"WhatsApp":"email")+" for "+college.shortName+". Enquiry "+result.enquiry.id+".";
      byId("enquiryText").value="";showToast("Your enquiry receipt was accepted by the provider.");
      await refreshStudentDashboard();
    }catch(error){byId("enquiryStatus").textContent=error.message==="Failed to fetch"?"The backend is unreachable. Start the server and retry.":error.message;}
    finally{button.disabled=false;}
  });
  byId("visitForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const college = colleges.find(function (item) { return item.id === byId("visitCollege").value; });
    byId("visitStatus").textContent = "Visit request prepared for " + college.shortName + ". Confirm the appointment directly with the college.";
    showToast("Visit request saved as a demo - contact the college for confirmation.");
  });
  byId("aptitudeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const answers = Array.from(new FormData(byId("aptitudeForm")).entries()).filter(function (entry) { return entry[0].indexOf("q") === 0; });
    const result = byId("testResult");
    if (answers.length < 3) {
      result.className = "test-result show";
      result.textContent = "Answer all three questions to get your reflection.";
      return;
    }
    const score = answers.reduce(function (total, entry) { return total + Number(entry[1]); }, 0);
    const percentage = Math.round((score / 3) * 100);
    let message;
    if (percentage >= 80) {
      message = percentage + "% practice score - strong foundation. Explore a challenge project and ask a college about its branch learning plan.";
    } else if (percentage >= 50) {
      message = percentage + "% practice score - promising start. Review the answer themes, then try another branch-related activity.";
    } else {
      message = percentage + "% practice score - this is a starting point, not a verdict. Build fundamentals, ask questions and try again.";
    }
    result.className = "test-result show";
    result.textContent = message + " This does not determine admission or scholarship eligibility.";
  });

  byId("openChat").addEventListener("click", openChat);
  byId("closeChat").addEventListener("click", function () { byId("chatPanel").hidden = true; });
  byId("chatForm").addEventListener("submit", function (event) {
    event.preventDefault();
    submitChat(byId("chatInput").value);
    byId("chatInput").value = "";
  });
  document.querySelectorAll("[data-prompt]").forEach(function (button) {
    button.addEventListener("click", function () { submitChat(button.dataset.prompt); });
  });
}

async function init() {
  byId("currentYear").textContent = new Date().getFullYear();
  try {
    await loadMathuraDirectoryData();
  } catch (error) {
    console.error("Mathura directory load failed:", error);
    byId("mathuraResultCount").textContent = "The Mathura directory did not load. Restart the project using npm start, then refresh.";
  }
  renderPrograms();
  renderFaculty(state.facultyDepartment);
  fillCollegeSelects();
  renderColleges();
  renderCampusMap();
  renderShortlist();
  setupEvents();
  updateOtpButtonLabel();
  refreshStudentDashboard();
  fetch("/api/health").then(function(response){return response.ok?response.json():null;}).then(function(info){if(info&&info.databaseFile)byId("databaseLocation").textContent=info.databaseFile;}).catch(function(){});
}

init();
