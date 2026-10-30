"""Build the camp plans for site/camp/ from OpenStreetMap.

Usage: python3 tools/osm_export.py [raw.json]
Without an argument it downloads the two areas from the Overpass API.
Output: site/camp/plans.json (local metres, x east, z south), © OpenStreetMap contributors, ODbL.
"""
import json, math, sys, urllib.parse, urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "site/camp/plans.json"
QUERY = "[out:json][timeout:90];(nwr(50.0290,19.1650,50.0440,19.1900);nwr(50.0200,19.1920,50.0300,19.2100););out geom;"
SITES = {
    # boundary way id, extra box (lon0, lat0, lon1, lat1) for things just outside the fence
    "a1": {"boundary": 29572443, "box": (19.1990, 50.0236, 19.2075, 50.0288)},
    "bk": {"boundary": 53908378, "box": (19.1590, 50.0310, 19.1820, 50.0460)},
}

def load():
    if len(sys.argv) > 1:
        return json.load(open(sys.argv[1]))["elements"]
    req = urllib.request.Request("https://overpass-api.de/api/interpreter",
        data=urllib.parse.urlencode({"data": QUERY}).encode(), headers={"User-Agent": "t2g-oswiecim-2026 camp plans"})
    return json.load(urllib.request.urlopen(req, timeout=200))["elements"]

def inside(pt, pl):
    x, y = pt; c = False
    for i in range(len(pl)):
        x1, y1 = pl[i - 1]; x2, y2 = pl[i]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
    return c

def name(t):
    return t.get("name:en") or t.get("name") or ""

def classify(t):
    """Return (layer, extra) or None."""
    if t.get("name", "").startswith("Odcinek"): return "sector", {}
    if t.get("man_made") == "kiln" and "Krematorium" in t.get("name", ""): return "crem", {}
    if t.get("man_made") == "tower" or t.get("tower:type") == "watchtower": return "tower", {}
    if t.get("building") == "crematory": return "crem", {"h": 4}
    if t.get("historic") == "ruins" or t.get("building") == "ruins": return "ruin", {}
    if t.get("building") in ("barracks", "barrack"):
        h = float(t.get("height") or (3 * int(t.get("building:levels") or 1) + 2))
        return "bld", {"h": h, "brick": t.get("building:material") == "brick" or t.get("building") == "barracks"}
    if "building" in t: return "bld", {"h": float(t.get("height") or 5), "brick": False}
    if t.get("barrier") == "fence" or t.get("historic") == "fence": return "fence", {}
    if t.get("railway") in ("disused", "rail", "abandoned"): return "rail", {}
    if t.get("natural") == "water" or t.get("water"): return "water", {}
    if t.get("natural") in ("wood",) or t.get("landuse") == "forest": return "wood", {}
    if t.get("highway") in ("service", "footway", "path", "pedestrian", "track", "steps"): return "path", {}
    if t.get("natural") == "tree": return "tree", {}
    return None

def main():
    els = load()
    out = {"attribution": "© OpenStreetMap contributors, ODbL", "sites": {}}
    for key, cfg in SITES.items():
        bnd = next(e for e in els if e["type"] == "way" and e["id"] == cfg["boundary"])
        bpl = [(p["lon"], p["lat"]) for p in bnd["geometry"]]
        lon0 = sum(p[0] for p in bpl) / len(bpl); lat0 = sum(p[1] for p in bpl) / len(bpl)
        kx = math.cos(math.radians(lat0)) * 111320; kz = 110540
        P = lambda lon, lat: [round((lon - lon0) * kx, 1), round(-(lat - lat0) * kz, 1)]
        x0, y0, x1, y1 = cfg["box"]
        site = {"origin": [lon0, lat0], "k": [kx, kz], "boundary": [P(*p) for p in bpl], "layers": {}}
        seen = set()
        for e in els:
            t = e.get("tags") or {}
            if not t or e["id"] == cfg["boundary"]: continue
            c = classify(t)
            if not c: continue
            layer, extra = c
            if e["type"] == "node": g = [(e["lon"], e["lat"])]
            elif e["type"] == "way": g = [(p["lon"], p["lat"]) for p in e.get("geometry", []) if p]
            else: continue
            if not g: continue
            cx = sum(p[0] for p in g) / len(g); cy = sum(p[1] for p in g) / len(g)
            in_box = x0 <= cx <= x1 and y0 <= cy <= y1
            if not in_box: continue
            if key == "bk" and not inside((cx, cy), bpl) and layer not in ("rail", "wood", "water", "crem", "fence"): continue
            if key == "a1" and layer in ("path",) and not inside((cx, cy), bpl): continue
            sig = (layer, round(cx, 6), round(cy, 6))
            if sig in seen: continue
            seen.add(sig)
            item = {"p": [P(*p) for p in g]}
            if name(t): item["n"] = name(t)
            item.update(extra)
            site["layers"].setdefault(layer, []).append(item)
        # named places, used to anchor the explorer's points of interest
        named = []
        for e in els:
            t = e.get("tags") or {}
            if not t.get("name") or "highway" in t or e["type"] == "relation": continue
            if e["type"] == "node": g = [(e["lon"], e["lat"])]
            else: g = [(p["lon"], p["lat"]) for p in e.get("geometry", []) if p]
            if not g: continue
            cx = sum(p[0] for p in g) / len(g); cy = sum(p[1] for p in g) / len(g)
            if x0 <= cx <= x1 and y0 <= cy <= y1:
                named.append([t["name"], t.get("name:en", ""), *P(cx, cy)])
        site["named"] = named
        out["sites"][key] = site
        print(key, {k: len(v) for k, v in site["layers"].items()})
    OUT.write_text(json.dumps(out, separators=(",", ":"), ensure_ascii=False))
    print(OUT, OUT.stat().st_size // 1024, "KB")

main()
