// Offline copy of the camp explorer: always try the network first, fall back to the last copy.
const CACHE = "camp-v2";
const CORE = ["./", "index.html", "camp.js", "places.js", "plans.json",
  "vendor/three.module.min.js", "vendor/three.core.min.js", "vendor/MapControls.js", "vendor/OrbitControls.js", "vendor/BufferGeometryUtils.js",
  "aerial/a1-1944-04-04.jpg", "aerial/a1-1944-04-04-mask.png", "aerial/bk-1944-09-13.jpg", "aerial/bk-1944-09-13-mask.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request, url = new URL(r.url);
  if (r.method !== "GET" || !(url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname))) return;
  e.respondWith(fetch(r).then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
    return res;
  }).catch(() => caches.match(r, {ignoreSearch: true})));
});
