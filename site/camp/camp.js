import * as THREE from "three";
import {MapControls} from "./vendor/MapControls.js";
import {mergeGeometries} from "./vendor/BufferGeometryUtils.js";
import {SITES, PLACES, SRC} from "./places.js";

// 1944 aerial photographs, warped onto the plan by tools/aerial_fit.py; ext = [x0, z0, x1, z1] in plan metres
const AERIAL = {
  a1: {img: "aerial/a1-1944-04-04.jpg", mask: "aerial/a1-1944-04-04-mask.png", ext: [-245.2, -204.8, 220.0, 277.0],
    date: {en: "4 April 1944", de: "4. April 1944", fr: "4 avril 1944", lb: "4. Abrëll 1944"},
    src: "https://commons.wikimedia.org/wiki/File:AerialAuschwitz1944.jpg"},
  bk: {img: "aerial/bk-1944-09-13.jpg", mask: "aerial/bk-1944-09-13-mask.png", ext: [-816.4, -678.3, 956.3, 1116.4],
    date: {en: "13 September 1944", de: "13. September 1944", fr: "13 septembre 1944", lb: "13. September 1944"},
    src: "https://commons.wikimedia.org/wiki/File:Birkenau_Extermination_Camp_-_Oswiecim,_Poland_-_NARA_-_305905.jpg"}
};

/* ---------- language ---------- */
const UIL = ["lb", "de", "fr", "en"];
const UI = {
  back: {en: "Back to the trip planning", de: "Zurück zum Reiseplan", fr: "Retour au planning du voyage", lb: "Zréck op de Reesplang"},
  grip: {en: "Drag to make the map bigger or smaller", de: "Ziehen, um die Karte zu vergrößern oder zu verkleinern", fr: "Faites glisser pour agrandir ou réduire le plan", lb: "Zéien, fir d’Kaart méi grouss oder méi kleng ze maachen"},
  h1: {en: "Camp explorer", de: "Die Lager erkunden", fr: "Explorer les camps", lb: "D’Lageren entdecken"},
  lede: {en: "Both memorial sites at real scale, drawn from OpenStreetMap. Tap a number on the map, or follow the places in the order of a typical guided visit.",
    de: "Beide Gedenkstätten im echten Maßstab, gezeichnet nach OpenStreetMap. Tippe auf eine Nummer auf der Karte oder folge den Orten in der Reihenfolge einer typischen Führung.",
    fr: "Les deux sites du mémorial à l’échelle réelle, dessinés d’après OpenStreetMap. Touchez un numéro sur le plan, ou suivez les lieux dans l’ordre d’une visite guidée habituelle.",
    lb: "Déi zwou Gedenkstätten an der richteger Gréisst, no OpenStreetMap gezeechent. Tipp op eng Nummer op der Kaart oder gëff de Plazen an der Reiefolleg vun enger typescher Féierung no."},
  respect: {en: "These are places where more than a million people were murdered. The 3D view is a way to understand the space, not a game. Anything that no longer exists is shown only on request and is always labelled.",
    de: "An diesen Orten wurden mehr als eine Million Menschen ermordet. Die 3D-Ansicht soll helfen, den Ort zu verstehen; sie ist kein Spiel. Was nicht mehr existiert, wird nur auf Wunsch gezeigt und ist immer gekennzeichnet.",
    fr: "Ce sont des lieux où plus d’un million de personnes ont été assassinées. La vue 3D sert à comprendre l’espace, ce n’est pas un jeu. Ce qui n’existe plus n’est montré qu’à la demande et toujours signalé.",
    lb: "Op dëse Plaze goufe méi wéi eng Millioun Mënschen ermord. D’3D-Usiicht soll hëllefen, d’Plaz ze verstoen; et ass kee Spill. Wat et net méi gëtt, gëtt nëmmen op Wonsch gewisen an ass ëmmer gekennzeechent."},
  plan: {en: "Plan", de: "Plan", fr: "Plan", lb: "Plang"},
  mode: {en: "Switch between plan (2D) and 3D", de: "Zwischen Plan (2D) und 3D wechseln", fr: "Basculer entre plan (2D) et 3D", lb: "Tëscht Plang (2D) an 3D wiesselen"},
  view2d: {en: "Plan view", de: "Planansicht", fr: "Vue en plan", lb: "Plangusiicht"},
  view3d: {en: "3D view", de: "3D-Ansicht", fr: "Vue 3D", lb: "3D-Usiicht"},
  on: {en: "on", de: "an", fr: "activés", lb: "un"}, off: {en: "off", de: "aus", fr: "désactivés", lb: "aus"},
  more: {en: "Tap to read more", de: "Tippen für mehr", fr: "Toucher pour en lire plus", lb: "Tippe fir méi"},
  recon: {en: "1944 volumes", de: "Volumen 1944", fr: "Volumes de 1944", lb: "Volumen 1944"},
  locate: {en: "Where am I?", de: "Wo bin ich?", fr: "Où suis-je ?", lb: "Wou sinn ech?"},
  whole: {en: "Whole site", de: "Ganzes Gelände", fr: "Tout le site", lb: "Ganzt Gelänn"},
  all: {en: "All places", de: "Alle Orte", fr: "Tous les lieux", lb: "All d’Plazen"},
  further: {en: "Go further", de: "Weiterführend", fr: "Pour aller plus loin", lb: "Fir méi ze wëssen"},
  credits: {en: "Map data © OpenStreetMap contributors (ODbL). 1944 aerial photographs: Allied reconnaissance, US National Archives, public domain; matched to today’s map to within a few metres. 3D: three.js (MIT). Texts: unofficial, checked against the Auschwitz Memorial’s history pages; sources are given for each place.",
    de: "Kartendaten © OpenStreetMap-Mitwirkende (ODbL). Luftbilder von 1944: alliierte Luftaufklärung, US-Nationalarchiv, gemeinfrei; auf wenige Meter genau an die heutige Karte angepasst. 3D: three.js (MIT). Texte: inoffiziell, abgeglichen mit den Geschichtsseiten der Gedenkstätte Auschwitz; die Quellen stehen bei jedem Ort.",
    fr: "Données cartographiques © contributeurs OpenStreetMap (ODbL). Photos aériennes de 1944 : reconnaissance alliée, Archives nationales américaines, domaine public ; calées sur le plan actuel à quelques mètres près. 3D : three.js (MIT). Textes : non officiels, vérifiés à partir des pages d’histoire du Mémorial d’Auschwitz ; les sources sont indiquées pour chaque lieu.",
    lb: "Kaartendaten © OpenStreetMap-Mataarbechter (ODbL). Loftbiller vun 1944: alliéiert Loftopklärung, US-Nationalarchiv, Domaine public; op e puer Meter genee un déi haiteg Kaart ugepasst. 3D: three.js (MIT). Texter: net offiziell, mat de Geschichtssäite vun der Gedenkstätt Auschwitz ofgeglach; d’Quelle stinn bei all Plaz."},
  overview: {en: "Overview", de: "Überblick", fr: "Vue d’ensemble", lb: "Iwwerbléck"},
  stop: {en: "Place {i} of {n}", de: "Ort {i} von {n}", fr: "Lieu {i} sur {n}", lb: "Plaz {i} vu {n}"},
  start: {en: "Start with place 1 →", de: "Mit Ort 1 beginnen →", fr: "Commencer par le lieu 1 →", lb: "Mat der Plaz 1 ufänken →"},
  then: {en: "What it was", de: "Was es war", fr: "Ce que c’était", lb: "Wat et war"},
  today: {en: "What you see today", de: "Was man heute sieht", fr: "Ce que l’on voit aujourd’hui", lb: "Wat ee haut gesäit"},
  people: {en: "A person", de: "Ein Mensch", fr: "Une personne", lb: "E Mënsch"},
  peoplen: {en: "People", de: "Menschen", fr: "Des personnes", lb: "Mënschen"},
  sources: {en: "Sources", de: "Quellen", fr: "Sources", lb: "Quellen"},
  k_orig: {en: "Original", de: "Original", fr: "D’origine", lb: "Original"},
  k_ruin: {en: "Ruins", de: "Ruinen", fr: "Ruines", lb: "Ruinen"},
  k_recon: {en: "Rebuilt after the war", de: "Nach dem Krieg wieder aufgebaut", fr: "Reconstruit après la guerre", lb: "Nom Krich nees opgebaut"},
  k_mem: {en: "Memorial", de: "Gedenkort", fr: "Mémorial", lb: "Gedenkplaz"},
  k_area: {en: "Camp sector", de: "Lagerabschnitt", fr: "Secteur du camp", lb: "Lagersektor"},
  legend: {en: "Grey volumes: approximate 1944 outlines, drawn from the footprints of the ruins. Not a historical reconstruction.",
    de: "Graue Volumen: ungefähre Umrisse von 1944, nach den Grundrissen der Ruinen gezeichnet. Keine historische Rekonstruktion.",
    fr: "Volumes gris : contours approximatifs de 1944, tracés d’après l’emprise des ruines. Ce n’est pas une reconstitution historique.",
    lb: "Gro Volumen: ongeféier Ëmrësser vun 1944, no de Grondrësser vun de Ruinen gezeechent. Keng historesch Rekonstruktioun."},
  locating: {en: "Looking for your position…", de: "Suche deine Position…", fr: "Recherche de votre position…", lb: "Sichen deng Positioun…"},
  here: {en: "The blue dot is you. Your position stays on this phone.", de: "Der blaue Punkt bist du. Deine Position bleibt auf diesem Handy.", fr: "Le point bleu, c’est vous. Votre position reste sur ce téléphone.", lb: "De bloe Punkt bass du. Deng Positioun bleift op dësem Handy."},
  far: {en: "You are {d} km from this site. The dot appears once you are there.", de: "Du bist {d} km von diesem Gelände entfernt. Der Punkt erscheint, sobald du dort bist.", fr: "Vous êtes à {d} km de ce site. Le point apparaîtra quand vous y serez.", lb: "Du bass {d} km vun dësem Gelänn ewech. De Punkt erschéngt, soubal s du do bass."},
  nogeo: {en: "Your position isn’t available (permission refused or no signal).", de: "Deine Position ist nicht verfügbar (keine Erlaubnis oder kein Signal).", fr: "Votre position n’est pas disponible (autorisation refusée ou pas de signal).", lb: "Deng Positioun ass net disponibel (keng Erlaabnis oder kee Signal)."},
  nogl: {en: "3D isn’t available on this device. All the texts below work without it.", de: "3D ist auf diesem Gerät nicht verfügbar. Alle Texte unten funktionieren auch ohne.", fr: "La 3D n’est pas disponible sur cet appareil. Tous les textes ci-dessous fonctionnent sans elle.", lb: "3D ass op dësem Apparat net disponibel. All d’Texter hei ënnendrënner funktionéieren och ouni."},
  block: {en: "Block", de: "Block", fr: "Bloc", lb: "Block"},
  ynow: {en: "Today", de: "Heute", fr: "Aujourd’hui", lb: "Haut"},
  era: {en: "Compare with the 1944 aerial photograph", de: "Mit dem Luftbild von 1944 vergleichen", fr: "Comparer avec la photo aérienne de 1944", lb: "Mam Loftbild vun 1944 vergläichen"},
  aerial: {en: "Aerial photo, {d}. Labels added by the CIA in 1978. Public domain.", de: "Luftbild vom {d}. Beschriftung: CIA, 1978. Gemeinfrei.", fr: "Photo aérienne du {d}. Légendes ajoutées par la CIA en 1978. Domaine public.", lb: "Loftbild vum {d}. Beschrëftung: CIA, 1978. Domaine public."},

  prev: {en: "Previous place", de: "Vorheriger Ort", fr: "Lieu précédent", lb: "Virdrun Plaz"},
  next: {en: "Next place", de: "Nächster Ort", fr: "Lieu suivant", lb: "Nächst Plaz"},
  l_hist: {en: "Auschwitz Memorial: history of the camp", de: "Gedenkstätte Auschwitz: Geschichte des Lagers", fr: "Mémorial d’Auschwitz : histoire du camp", lb: "Gedenkstätt Auschwitz: Geschicht vum Lager"},
  l_visit: {en: "Auschwitz Memorial: visiting the site", de: "Gedenkstätte Auschwitz: Besuch", fr: "Mémorial d’Auschwitz : préparer la visite", lb: "Gedenkstätt Auschwitz: Besuch"},
  l_50: {en: "50faces.lu: lives of Jews from Luxembourg", de: "50faces.lu: Lebenswege von Juden aus Luxemburg", fr: "50faces.lu : vies de Juifs du Luxembourg", lb: "50faces.lu: Liewensweeër vu Judden aus Lëtzebuerg"},
  l_t2g: {en: "Témoins de la 2e Génération", de: "Témoins de la 2e Génération", fr: "Témoins de la 2e Génération", lb: "Témoins de la 2e Génération"}
};
function pickLang() {
  try { const q = new URLSearchParams(location.search).get("lang"); if (UIL.includes(q)) return q; } catch (e) {}
  try { const s = JSON.parse(localStorage.getItem("t2g-ui")); if (UIL.includes(s)) return s; } catch (e) {}
  for (const l of navigator.languages || [navigator.language || "en"]) { const b = String(l).slice(0, 2).toLowerCase(); if (UIL.includes(b)) return b; }
  return "en";
}
let lang = pickLang();
const L = x => x == null ? "" : typeof x === "string" ? x : (x[lang] ?? x.en ?? "");
const u = k => L(UI[k]);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const nb = s => lang === "fr" ? s.replace(/ ([:;?!»])/g, " $1").replace(/« /g, "« ") : s;

/* ---------- state ---------- */
const qs = new URLSearchParams(location.search);
let site = ["a1", "bk"].includes(qs.get("site")) ? qs.get("site") : "a1";
let idx = -1;                       // -1 = overview, otherwise index in PLACES[site]
{ const p = qs.get("p"); const i = PLACES[site].findIndex(x => x.id === p); if (i >= 0) idx = i; }
let plan = false, recon = false, era = 100;   // era: 0 = 1944 photo, 100 = today
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const dark = matchMedia("(prefers-color-scheme: dark)").matches;

/* ---------- 3D ---------- */
const stage = document.getElementById("stage"), view = document.getElementById("view"), canvas = document.getElementById("c"), pinsEl = document.getElementById("pins");
let renderer = null;
try { renderer = new THREE.WebGLRenderer({canvas, antialias: true}); } catch (e) { renderer = null; }
const C = dark
  ? {bg: 0x151614, ground: 0x242520, sector: 0x2c2d27, path: 0x34352f, rail: 0x0c0c0b, water: 0x2b3a44, wood: 0x22301f, leaf: 0x32452c, trunk: 0x2a2520,
     brick: 0x8a4f3f, wood_b: 0x5a4a3a, other: 0x6c665a, ruin: 0x4b4842, crem: 0x77322a, recon: 0xa9b4c0, fence: 0x8c877b, tower: 0x5e5446, me: 0x6ea8ff}
  : {bg: 0xcfc7b0, ground: 0xd8d0b9, sector: 0xcdc4aa, path: 0xe9e3d2, rail: 0x3a3631, water: 0x9fb1b8, wood: 0xb3b796, leaf: 0x7f8c63, trunk: 0x6a5a48,
     brick: 0xa45d48, wood_b: 0x76604a, other: 0xb1a891, ruin: 0x7d776c, crem: 0x7a2e24, recon: 0x93a1b0, fence: 0x5f5a50, tower: 0x6a5c4a, me: 0x1d63d6};
const scene = new THREE.Scene();
scene.background = new THREE.Color(C.bg);
const camera = new THREE.PerspectiveCamera(40, 1, 1, 9000);
let controls = null;
if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  scene.add(new THREE.HemisphereLight(dark ? 0x8d8a80 : 0xfffaf0, dark ? 0x202018 : 0x8c8470, dark ? 1.4 : 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, dark ? 1.0 : 1.5); sun.position.set(-400, 700, 300); scene.add(sun);
  controls = new MapControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.12;
  controls.screenSpacePanning = false; controls.maxPolarAngle = 1.3; controls.minDistance = 25; controls.maxDistance = 3500;
  controls.addEventListener("change", kick);
} else noGL();
function noGL() {
  canvas.style.display = "none"; stage.querySelector(".ctrls").hidden = true; stage.querySelector(".era").hidden = true; document.getElementById("cap").hidden = true; pinsEl.innerHTML = "";
  if (!document.getElementById("nogl")) view.insertAdjacentHTML("beforeend", `<div class="nogl" id="nogl">${esc(u("nogl"))}</div>`);
}

const MAT = {};
const mat = (k, o = {}) => MAT[k + JSON.stringify(o)] ||= new THREE.MeshLambertMaterial({color: C[k], ...o});

function shapeOf(pts) { const s = new THREE.Shape(); pts.forEach(([x, z], i) => i ? s.lineTo(x, -z) : s.moveTo(x, -z)); return s; }
function flat(pts, y) { const g = new THREE.ShapeGeometry(shapeOf(pts)); g.rotateX(-Math.PI / 2); g.translate(0, y, 0); return clean(g); }
function extrude(pts, h, y = 0) { const g = new THREE.ExtrudeGeometry(shapeOf(pts), {depth: h, bevelEnabled: false}); g.rotateX(-Math.PI / 2); g.translate(0, y, 0); return clean(g); }
function clean(g) { g.deleteAttribute("uv"); return g.index ? g.toNonIndexed() : g; }
const area = pts => { let a = 0; for (let i = 0; i < pts.length; i++) { const [x1, z1] = pts[i], [x2, z2] = pts[(i + 1) % pts.length]; a += x1 * z2 - x2 * z1; } return Math.abs(a / 2); };
const centroid = pts => { const q = pts.length > 1 && pts[0][0] === pts.at(-1)[0] && pts[0][1] === pts.at(-1)[1] ? pts.slice(0, -1) : pts; return [q.reduce((s, p) => s + p[0], 0) / q.length, q.reduce((s, p) => s + p[1], 0) / q.length]; };
function inside([x, z], pl) { let c = false; for (let i = 0, j = pl.length - 1; i < pl.length; j = i++) { const [x1, z1] = pl[j], [x2, z2] = pl[i]; if ((z1 > z) !== (z2 > z) && x < (x2 - x1) * (z - z1) / (z2 - z1) + x1) c = !c; } return c; }

// smallest rectangle around a footprint: centre, long side, short side, angle of the long side
function obb(q) {
  let best = null;
  for (let i = 0; i < q.length; i++) {
    const [x1, z1] = q[i], [x2, z2] = q[(i + 1) % q.length], a = Math.atan2(z2 - z1, x2 - x1), c = Math.cos(a), sn = Math.sin(a);
    let s0 = Infinity, s1 = -Infinity, t0 = Infinity, t1 = -Infinity;
    for (const [x, z] of q) { const s_ = x * c + z * sn, t_ = -x * sn + z * c; s0 = Math.min(s0, s_); s1 = Math.max(s1, s_); t0 = Math.min(t0, t_); t1 = Math.max(t1, t_); }
    const ar = (s1 - s0) * (t1 - t0);
    if (!best || ar < best.ar) {
      const sm = (s0 + s1) / 2, tm = (t0 + t1) / 2;
      best = {ar, cx: sm * c - tm * sn, cz: sm * sn + tm * c, len: s1 - s0, wid: t1 - t0, a};
    }
  }
  if (best.wid > best.len) [best.len, best.wid, best.a] = [best.wid, best.len, best.a + Math.PI / 2];
  return best;
}
// a roughly rectangular footprint becomes walls + gable roof; anything else is extruded flat
function house(pts, wallH, roofH) {
  const q = pts.length > 3 && pts[0][0] === pts.at(-1)[0] && pts[0][1] === pts.at(-1)[1] ? pts.slice(0, -1) : pts;
  const r = q.length >= 4 && roofH ? obb(q) : null;
  if (!r || area(q) / r.ar < 0.8) return extrude(pts, wallH + (roofH ? roofH * 0.5 : 0));
  const {len, wid, a, cx, cz} = r;
  const box = clean(new THREE.BoxGeometry(len, wallH, wid)); box.translate(0, wallH / 2, 0);
  const l = len / 2, w = wid / 2, y0 = wallH, y1 = wallH + Math.min(roofH, wid * 0.6);
  const v = [
    -l, y0, -w, l, y0, -w, l, y1, 0, -l, y0, -w, l, y1, 0, -l, y1, 0,       // slope 1
    -l, y0, w, -l, y1, 0, l, y1, 0, -l, y0, w, l, y1, 0, l, y0, w,           // slope 2
    -l, y0, -w, -l, y1, 0, -l, y0, w, l, y0, -w, l, y0, w, l, y1, 0          // gables
  ];
  for (let i = 0; i < v.length; i += 9) for (let k = 0; k < 3; k++) [v[i + 3 + k], v[i + 6 + k]] = [v[i + 6 + k], v[i + 3 + k]]; // face outwards
  const roof = new THREE.BufferGeometry(); roof.setAttribute("position", new THREE.Float32BufferAttribute(v, 3)); roof.computeVertexNormals();
  const g = mergeGeometries([box, roof]); g.rotateY(-a); g.translate(cx, 0, cz); return g;
}
function ribbon(lines, width, y) {
  const v = [];
  for (const pts of lines) for (let i = 1; i < pts.length; i++) {
    const [x1, z1] = pts[i - 1], [x2, z2] = pts[i], d = Math.hypot(x2 - x1, z2 - z1) || 1, nx = -(z2 - z1) / d * width / 2, nz = (x2 - x1) / d * width / 2;
    v.push(x1 + nx, y, z1 + nz, x2 + nx, y, z2 + nz, x2 - nx, y, z2 - nz, x1 + nx, y, z1 + nz, x2 - nx, y, z2 - nz, x1 - nx, y, z1 - nz);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3)); g.computeVertexNormals(); return g;
}
function lines(list, y) {
  const v = []; for (const pts of list) for (let i = 1; i < pts.length; i++) v.push(pts[i - 1][0], y, pts[i - 1][1], pts[i][0], y, pts[i][1]);
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3)); return g;
}
function addMerged(group, geoms, material) { const ok = geoms.filter(Boolean); if (ok.length) group.add(new THREE.Mesh(mergeGeometries(ok), material)); }

let PLANS = null;
const built = {};
function build(key) {
  const S = PLANS.sites[key], Ly = S.layers, g = new THREE.Group(), pick = [], reconG = new THREE.Group();
  const xs = S.boundary.map(p => p[0]), zs = S.boundary.map(p => p[1]);
  const box = {x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs)};
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000), mat("ground")); ground.rotation.x = -Math.PI / 2; g.add(ground);
  addMerged(g, [flat(S.boundary, 0.05)], mat("sector"));
  addMerged(g, (Ly.sector || []).map((s, i) => flat(s.p, 0.08 + (i % 2) * 0.01)), mat("ground", {color: C.sector, transparent: true, opacity: 0.8}));
  addMerged(g, (Ly.water || []).filter(w => w.p.length > 2).map(w => flat(w.p, 0.12)), mat("water"));
  const woods = (Ly.wood || []).filter(w => w.p.length > 2);
  addMerged(g, woods.map(w => flat(w.p, 0.1)), mat("wood"));
  addMerged(g, [ribbon((Ly.path || []).map(p => p.p), key === "bk" ? 3 : 2.2, 0.15)], mat("path"));
  addMerged(g, [ribbon((Ly.rail || []).map(p => p.p), 1.8, 0.2)], mat("rail"));
  g.add(new THREE.LineSegments(lines([...(Ly.fence || []).map(f => f.p), S.boundary], 1.6), new THREE.LineBasicMaterial({color: C.fence})));
  // trees: mapped single trees, plus a deterministic scatter inside woods
  const pts = (Ly.tree || []).map(t => t.p[0]);
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (const w of woods) {
    const n = Math.min(900, Math.floor(area(w.p) / 140));
    const wx = w.p.map(p => p[0]), wz = w.p.map(p => p[1]), bx0 = Math.min(...wx), bx1 = Math.max(...wx), bz0 = Math.min(...wz), bz1 = Math.max(...wz);
    for (let k = 0, tries = 0; k < n && tries < n * 4; tries++) { const p = [bx0 + rnd() * (bx1 - bx0), bz0 + rnd() * (bz1 - bz0)]; if (inside(p, w.p)) { pts.push(p); k++; } }
  }
  if (pts.length) {
    const crown = new THREE.InstancedMesh(new THREE.ConeGeometry(2.6, 9, 6), mat("leaf"), pts.length);
    const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.25, 0.3, 4, 5), mat("trunk"), pts.length);
    const m = new THREE.Matrix4(), s = new THREE.Vector3(), q = new THREE.Quaternion(), p = new THREE.Vector3();
    pts.forEach(([x, z], i) => {
      const k = 0.75 + rnd() * 0.6; s.set(k, k, k);
      m.compose(p.set(x, 4 * k + 4.5 * k, z), q, s); crown.setMatrixAt(i, m);
      m.compose(p.set(x, 2 * k, z), q, s); trunk.setMatrixAt(i, m);
    });
    g.add(crown, trunk);
  }
  // buildings
  const unnamed = {brick: [], wood_b: [], other: []};
  for (const b of Ly.bld || []) {
    if (b.p.length < 3) continue;
    const h = b.h || 5, roof = h >= 9 ? 4 : h <= 3 ? 1.6 : 1.4, wall = Math.max(2.4, h - roof);
    const kind = b.brick && h >= 9 ? "brick" : b.brick ? "wood_b" : "other";
    const geo = house(b.p, wall, roof);
    if (b.n) { const mesh = new THREE.Mesh(geo, mat(kind)); mesh.userData.n = b.n; g.add(mesh); pick.push(mesh); }
    else unnamed[kind].push(geo);
  }
  for (const k in unnamed) addMerged(g, unnamed[k], mat(k));
  addMerged(g, (Ly.tower || []).map(t => { const [x, z] = t.p.length > 1 ? centroid(t.p) : t.p[0]; const b = clean(new THREE.BoxGeometry(3.2, 9, 3.2)); b.translate(x, 4.5, z); return b; }), mat("tower"));
  addMerged(g, (Ly.ruin || []).filter(r => r.p.length > 2).map(r => extrude(r.p, 0.35)), mat("ruin"));
  for (const c of Ly.crem || []) { if (c.p.length < 3) continue; const mesh = new THREE.Mesh(extrude(c.p, c.h || 0.8), mat(c.h ? "other" : "crem")); mesh.userData.n = c.n; g.add(mesh); pick.push(mesh); }
  // approximate 1944 volumes (Birkenau only): barrack ruins as plain gabled volumes, crematoria ruins as plain blocks
  if (key === "bk") {
    const rm = new THREE.MeshLambertMaterial({color: C.recon, transparent: true, opacity: 0.85});
    addMerged(reconG, (Ly.ruin || []).filter(r => r.p.length > 2).map(r => house(r.p, 2.6, 1.6)), rm);
    addMerged(reconG, (Ly.crem || []).filter(c => c.p.length > 2).map(c => extrude(c.p, 7)), rm);
    reconG.visible = recon; g.add(reconG);
  }
  // place anchors
  const named = S.named, anchor = name => { const n = named.find(r => r[0] === name || r[1] === name); return n ? [n[2], n[3]] : null; };
  const places = PLACES[key].map(p => ({...p, xz: anchor(p.at) || [0, 0]}));
  const sectors = (Ly.sector || []).map(s => { const m = /B ?I{1,3}[a-f]?/.exec(named.find(r => r[1] === s.n)?.[0] || s.n || ""); return m ? {t: m[0].replace(" ", ""), xz: centroid(s.p)} : null; }).filter(Boolean);
  const fade = g.children.filter(o => o !== ground && o !== reconG);
  return {group: g, pick, reconG, box, places, sectors, S, fade, photo: null, loading: false};
}

/* ---------- view ---------- */
let cur = null, pinEls = [], secEls = [], me = null;
function frame(box, instant) {
  const cx = (box.x0 + box.x1) / 2, cz = (box.z0 + box.z1) / 2, span = Math.max(box.x1 - box.x0, (box.z1 - box.z0) * Math.max(1, camera.aspect));
  const d = span / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * (plan ? 1.02 : 1.08);
  fly([cx, cz], d, instant);
}
let anim = null;
function fly([x, z], dist, instant) {
  if (!controls) return;
  const polar = plan ? 0.001 : 0.85, az = plan ? 0 : controls.getAzimuthalAngle();
  const to = new THREE.Vector3(x, 0, z);
  const pos = new THREE.Vector3(Math.sin(polar) * Math.sin(az), Math.cos(polar), Math.sin(polar) * Math.cos(az)).multiplyScalar(dist).add(to);
  if (instant || reduced) { controls.target.copy(to); camera.position.copy(pos); controls.update(); kick(); return; }
  const far = controls.target.distanceTo(to) + Math.abs(camera.position.distanceTo(controls.target) - dist);
  anim = {t0: performance.now(), d: Math.min(1400, 550 + far * 0.6), ft: controls.target.clone(), fp: camera.position.clone(), tt: to, tp: pos}; kick();
}
function setPlan(v) {
  plan = v; if (!controls) return;
  controls.minPolarAngle = 0; controls.maxPolarAngle = plan ? 0.001 : 1.3; controls.enableRotate = !plan;
  document.getElementById("v-mode").textContent = plan ? "3D" : "2D";
  if (idx >= 0) focusPlace(true); else frame(cur.box);
}
function focusPlace() {
  if (!cur || !controls) return;
  if (idx < 0) return frame(cur.box);
  fly(cur.places[idx].xz, site === "bk" ? 300 : 190);
}

let activeUntil = 0, looping = false;
function kick() { activeUntil = performance.now() + 700; if (!looping && renderer) { looping = true; requestAnimationFrame(loop); } }
function loop(t) {
  try { frameStep(t); } catch (e) { looping = false; anim = null; throw e; }
  if (t < activeUntil || anim) requestAnimationFrame(loop); else looping = false;
}
function frameStep(t) {
  if (anim) {
    const k = Math.min(1, (t - anim.t0) / anim.d), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    controls.target.lerpVectors(anim.ft, anim.tt, e); camera.position.lerpVectors(anim.fp, anim.tp, e);
    if (k >= 1) anim = null; activeUntil = t + 300;
  }
  const moved = controls.update();
  renderer.render(scene, camera); placePins();
  if (moved) activeUntil = Math.max(activeUntil, t + 200);
}
const v3 = new THREE.Vector3();
function placePins() {
  if (!cur || !cur.sectors) return;
  const w = view.clientWidth, h = view.clientHeight;
  const put = (el, [x, z], y) => {
    v3.set(x, y, z).project(camera);
    const off = v3.z > 1 || v3.x < -1.2 || v3.x > 1.2 || v3.y < -1.2 || v3.y > 1.2;
    el.style.visibility = off ? "hidden" : "visible";
    if (!off) el.style.transform = `translate(${(v3.x + 1) / 2 * w}px,${(1 - v3.y) / 2 * h}px) translate(-50%,${el.classList.contains("sector") ? "-50%" : "-100%"})`;
  };
  cur.places.forEach((p, i) => put(pinEls[i], p.xz, site === "a1" ? 14 : 10));
  const near = camera.position.distanceTo(controls.target) < 1100;
  cur.sectors.forEach((s, i) => near ? put(secEls[i], s.xz, 1) : secEls[i].style.visibility = "hidden");
}
function resize() {
  if (!renderer) return;
  const w = view.clientWidth, h = view.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); kick();
}

function showSite(key, keepIdx) {
  site = key;
  if (!keepIdx) idx = -1;
  document.querySelectorAll("#sites button").forEach(b => b.setAttribute("aria-pressed", b.dataset.site === key));
  document.getElementById("recon").hidden = key !== "bk";
  if (renderer && PLANS) {
    if (cur) scene.remove(cur.group);
    cur = built[key] ||= build(key);
    scene.add(cur.group); cur.reconG.visible = recon && key === "bk";
    pinsEl.innerHTML = "";
    secEls = cur.sectors.map(s => { const e = document.createElement("div"); e.className = "pin sector"; e.textContent = s.t; pinsEl.append(e); return e; });
    pinEls = cur.places.map((p, i) => {
      const b = document.createElement("button"); b.className = "pin"; b.innerHTML = `<span class="no">${i + 1}</span><span class="tt"></span>`;
      b.onclick = () => { go(i); if (mapFrac > 0.7) setMap(0.52); }; pinsEl.append(b); return b;
    });
    if (me) { scene.add(me); me.visible = false; }
    resize();
    idx >= 0 ? focusPlace() : frame(cur.box, true);
    applyEra();
  } else cur = {places: PLACES[key]};
  renderText();
}
function go(i) {
  idx = Math.max(-1, Math.min(PLACES[site].length - 1, i));
  focusPlace(); renderText();
  scrollEl.scrollTo({top: 0, behavior: reduced ? "auto" : "smooth"});
  try { const p = new URLSearchParams(location.search); p.set("site", site); idx >= 0 ? p.set("p", PLACES[site][idx].id) : p.delete("p"); history.replaceState(null, "", "?" + p); } catch (e) {}
}

/* ---------- 1944 photo ---------- */
function loadPhoto(B, key) {
  if (B.photo || B.loading || !renderer) return;
  B.loading = true;
  const A = AERIAL[key], tl = new THREE.TextureLoader();
  Promise.all([tl.loadAsync(A.img), tl.loadAsync(A.mask)]).then(([t, m]) => {
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const [x0, z0, x1, z1] = A.ext, g = new THREE.PlaneGeometry(x1 - x0, z1 - z0); g.rotateX(-Math.PI / 2);
    B.photo = new THREE.Mesh(g, new THREE.MeshBasicMaterial({map: t, alphaMap: m, transparent: true, opacity: 0, depthWrite: false}));
    B.photo.position.set((x0 + x1) / 2, 0.3, (z0 + z1) / 2); B.photo.renderOrder = 1;
    B.group.add(B.photo); applyEra();
  }).catch(() => { B.loading = false; });
}
// slide from today's model (100) to the 1944 photograph (0); "1944 volumes" stay as they are, to compare
function applyEra() {
  const w = 1 - era / 100;
  updateCap();
  if (!cur || !cur.fade) return;
  if (w > 0) loadPhoto(cur, site);
  if (cur.photo) { cur.photo.visible = w > 0; cur.photo.material.opacity = Math.min(1, w * 1.6); }
  for (const o of cur.fade) {
    o.visible = w < 0.98;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      if (m.userData.op === undefined) { m.userData.op = m.opacity; m.userData.tr = m.transparent; }
      const tr = w > 0 || m.userData.tr;
      if (m.transparent !== tr) { m.transparent = tr; m.needsUpdate = true; }
      m.opacity = m.userData.op * (1 - w);
    }
  }
  kick();
}

function updateCap() {
  const cap = document.getElementById("cap"), parts = [];
  if (era < 100) parts.push(`${esc(nb(u("aerial").replace("{d}", L(AERIAL[site].date))))} <a href="${AERIAL[site].src}" target="_blank" rel="noopener">↗</a>`);
  if (recon && site === "bk") parts.push(esc(nb(u("legend"))));
  cap.hidden = !parts.length || !renderer;
  cap.innerHTML = parts.join(" · ");
  cap.title = u("more");
}
function toggleCap(c) { c.setAttribute("aria-expanded", c.getAttribute("aria-expanded") !== "true"); }
document.getElementById("cap").addEventListener("click", e => { if (!e.target.closest("a")) toggleCap(e.currentTarget); });
document.getElementById("cap").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCap(e.currentTarget); } });

/* ---------- map / panel split (phones): drag the handle, it snaps; a tap swaps big map and big text ---------- */
const mainEl = document.querySelector(".main"), grip = document.getElementById("grip"), scrollEl = document.getElementById("scroll");
const SNAP = [0.3, 0.52, 0.8], wide = matchMedia("(min-width: 900px)");
let mapFrac = 0.52;
function setMap(f) { mapFrac = Math.max(0.18, Math.min(0.86, f)); mainEl.style.setProperty("--map", (mapFrac * 100).toFixed(1) + "%"); }
let drag = null;
grip.addEventListener("pointerdown", e => {
  if (wide.matches || e.target.closest("button")) return;
  drag = {y: e.clientY, f: mapFrac, h: mainEl.clientHeight, t: performance.now(), moved: false, id: e.pointerId, vy: 0, ly: e.clientY, lt: performance.now()};
  grip.setPointerCapture(e.pointerId);
});
grip.addEventListener("pointermove", e => {
  if (!drag || e.pointerId !== drag.id) return;
  const dy = e.clientY - drag.y;
  if (!drag.moved && Math.abs(dy) < 6) return;
  if (!drag.moved) { drag.moved = true; mainEl.classList.add("dragging"); }
  const now = performance.now(); drag.vy = (e.clientY - drag.ly) / Math.max(1, now - drag.lt); drag.ly = e.clientY; drag.lt = now;
  setMap(drag.f + dy / drag.h);
});
function endDrag(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const d = drag; drag = null; mainEl.classList.remove("dragging");
  if (!d.moved) { if (e.type === "pointerup" && !e.target.closest("button")) setMap(mapFrac > 0.6 ? SNAP[0] : SNAP[2]); return; }
  // a flick goes to the next snap point in its direction, otherwise the nearest one
  let target = SNAP.reduce((a, b) => Math.abs(b - mapFrac) < Math.abs(a - mapFrac) ? b : a);
  if (Math.abs(d.vy) > 0.5) target = d.vy > 0 ? (SNAP.find(v => v > mapFrac + 0.02) ?? SNAP.at(-1)) : ([...SNAP].reverse().find(v => v < mapFrac - 0.02) ?? SNAP[0]);
  setMap(target);
}
grip.addEventListener("pointerup", endDrag);
grip.addEventListener("pointercancel", endDrag);
document.addEventListener("keydown", e => {
  if (e.target.closest("input, textarea, select, [contenteditable]") || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === "ArrowRight") { if (idx < PLACES[site].length - 1) { e.preventDefault(); go(idx + 1); } }
  else if (e.key === "ArrowLeft") { if (idx >= 0) { e.preventDefault(); go(idx - 1); } }
});

/* ---------- text ---------- */
function renderText() {
  const list = PLACES[site], n = list.length, P = idx >= 0 ? list[idx] : null, card = document.getElementById("card");
  document.getElementById("stopn").textContent = P ? u("stop").replace("{i}", idx + 1).replace("{n}", n) : u("overview");
  document.getElementById("prev").disabled = idx < 0; document.getElementById("next").disabled = idx >= n - 1;
  if (!P) {
    card.innerHTML = `<p class="lede">${esc(nb(u("lede")))}</p><p class="respect">${esc(nb(u("respect")))}</p>
      <h2>${esc(L(SITES[site].t))}</h2><p>${esc(nb(L(SITES[site].intro)))}</p><button class="start" id="startbtn">${esc(u("start"))}</button>`;
    document.getElementById("startbtn").onclick = () => go(0);
  } else {
    const ppl = P.people || [];
    card.innerHTML = `<span class="kind ${P.kind}">${esc(u("k_" + P.kind))}</span><h2>${idx + 1}. ${esc(nb(L(P.t)))}</h2>
      <h3>${esc(u("then"))}</h3><p>${esc(nb(L(P.then)))}</p>
      <h3>${esc(u("today"))}</h3><p>${esc(nb(L(P.today)))}</p>
      ${ppl.length ? `<h3>${esc(u(ppl.length > 1 ? "peoplen" : "people"))}</h3>` + ppl.map(q => `<div class="person"><p><b>${esc(q.n)}</b> – ${esc(nb(L(q.t)))}</p></div>`).join("") : ""}
      ${P.src && P.src.length ? `<p class="src">${esc(u("sources"))}: ${P.src.map(k => `<a href="${SRC[k][1]}" target="_blank" rel="noopener">${esc(SRC[k][0])}</a>`).join(" · ")}</p>` : ""}`;
  }
  document.getElementById("list").innerHTML = list.map((p, i) => `<li><button data-i="${i}"${i === idx ? ' aria-current="true"' : ""}><span class="num">${i + 1}</span><span>${esc(nb(L(p.t)))}</span></button></li>`).join("");
  document.querySelectorAll("#list button").forEach(b => b.onclick = () => { go(+b.dataset.i); if (mapFrac < 0.4) setMap(0.52); });
  pinEls.forEach((e, i) => { e.classList.toggle("on", i === idx); e.querySelector(".tt").textContent = i === idx ? nb(L(list[i].t)) : ""; e.setAttribute("aria-label", (i + 1) + ". " + L(list[i].t)); });
  kick();
}
function applyStatic() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el => { el.textContent = nb(u(el.dataset.t)); });
  document.querySelectorAll("#sites button").forEach(b => b.textContent = L(SITES[b.dataset.site].t));
  document.querySelectorAll("#uilang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.ui === lang));
  document.getElementById("prev").setAttribute("aria-label", u("prev")); document.getElementById("next").setAttribute("aria-label", u("next"));
  document.getElementById("back").href = "../?lang=" + lang;
  document.querySelectorAll("[data-a]").forEach(el => { el.setAttribute("aria-label", u(el.dataset.a)); el.title = u(el.dataset.a); });
  document.querySelector(".knob").title = u("grip");
  document.getElementById("era").setAttribute("aria-label", u("era"));
  applyEra();
  const ng = document.getElementById("nogl"); if (ng) ng.textContent = u("nogl");
  document.getElementById("links").innerHTML = [
    ["l_hist", "https://www.auschwitz.org/en/history/"], ["l_visit", "https://www.auschwitz.org/en/visiting/"],
    ["l_50", "https://www.50faces.lu/"], ["l_t2g", "https://temoins.lu/"]
  ].map(([k, h]) => `<li><a href="${h}" target="_blank" rel="noopener">${esc(u(k))}</a></li>`).join("");
  document.title = u("h1") + " – Oświęcim 2026";
}
function setLang(l) {
  lang = l; try { localStorage.setItem("t2g-ui", JSON.stringify(l)); } catch (e) {}
  try { const p = new URLSearchParams(location.search); p.set("lang", l); history.replaceState(null, "", "?" + p); } catch (e) {}
  applyStatic(); renderText();
}

/* ---------- toast, picking, location ---------- */
let toastT = 0;
function toast(s, ms = 2600) { const t = document.getElementById("toast"); t.textContent = s; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), ms); }
function localName(n) { const m = /^Blo(?:c)?k (\d+)(.*)$/.exec(n); return m ? u("block") + " " + m[1] + m[2].replace(/^ /, " – ") : n; }
let down = null;
canvas.addEventListener("pointerdown", e => { down = [e.clientX, e.clientY]; });
canvas.addEventListener("pointerup", e => {
  if (!down || !cur || !renderer || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
  const r = canvas.getBoundingClientRect(), ray = new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1), camera);
  const hit = ray.intersectObjects(cur.pick, false)[0];
  if (hit) toast(localName(hit.object.userData.n));
});
let watch = null;
function locate() {
  const btn = document.getElementById("locate");
  if (watch !== null) { navigator.geolocation.clearWatch(watch); watch = null; btn.setAttribute("aria-pressed", false); if (me) me.visible = false; kick(); return; }
  if (!navigator.geolocation) return toast(u("nogeo"));
  btn.setAttribute("aria-pressed", true); toast(u("locating"));
  let first = true;
  watch = navigator.geolocation.watchPosition(pos => {
    const S = PLANS.sites[site], [lon0, lat0] = S.origin, [kx, kz] = S.k;
    const x = (pos.coords.longitude - lon0) * kx, z = -(pos.coords.latitude - lat0) * kz, b = cur.box;
    const out = x < b.x0 - 400 || x > b.x1 + 400 || z < b.z0 - 400 || z > b.z1 + 400;
    if (!me) {
      me = new THREE.Group();
      const dot = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 1.2, 24), new THREE.MeshBasicMaterial({color: C.me}));
      const ring = new THREE.Mesh(new THREE.RingGeometry(7, 9, 32), new THREE.MeshBasicMaterial({color: C.me, transparent: true, opacity: .45, side: THREE.DoubleSide}));
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.9; dot.position.y = 0.8; me.add(dot, ring); scene.add(me);
    }
    me.visible = !out; me.position.set(x, 0, z);
    if (out) toast(u("far").replace("{d}", (Math.hypot(x, z) / 1000).toFixed(1)), 4000);
    else if (first) { toast(u("here"), 3500); fly([x, z], site === "bk" ? 300 : 160); }
    first = false; kick();
  }, () => { toast(u("nogeo"), 4000); btn.setAttribute("aria-pressed", false); watch = null; }, {enableHighAccuracy: true, maximumAge: 5000, timeout: 20000});
}

/* ---------- wiring ---------- */
document.querySelectorAll("#uilang button").forEach(b => b.onclick = () => setLang(b.dataset.ui));
document.querySelectorAll("#sites button").forEach(b => b.onclick = () => { if (b.dataset.site !== site) { showSite(b.dataset.site); go(-1); } });
document.getElementById("prev").onclick = () => go(idx - 1);
document.getElementById("next").onclick = () => go(idx + 1);
document.getElementById("v-mode").onclick = () => { setPlan(!plan); toast(u(plan ? "view2d" : "view3d"), 1500); };
document.getElementById("whole").onclick = () => { idx = -1; go(-1); };
document.getElementById("recon").onclick = e => {
  recon = !recon; e.currentTarget.setAttribute("aria-pressed", recon);
  if (cur && cur.reconG) cur.reconG.visible = recon && site === "bk";
  toast(u("recon") + ": " + u(recon ? "on" : "off"), 1800); updateCap(); kick();
};
document.getElementById("locate").onclick = locate;
document.getElementById("era").addEventListener("input", e => { era = +e.target.value; applyEra(); });
addEventListener("resize", resize);
if ("ResizeObserver" in window) new ResizeObserver(resize).observe(view);

applyStatic();
if (renderer) {
  fetch("plans.json").then(r => r.json()).then(j => { PLANS = j; showSite(site, true); }).catch(() => { renderer = null; controls = null; noGL(); showSite(site, true); });
} else showSite(site, true);
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
