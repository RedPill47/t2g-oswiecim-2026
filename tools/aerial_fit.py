"""Fit a 1944 aerial photo onto the OpenStreetMap plan and write a north-up overlay for the camp explorer.

Usage: python3 tools/aerial_fit.py SITE PHOTO "a b c d e f" OUT.jpg [--check check.jpg]
  SITE   a1 or bk (key in site/camp/plans.json)
  "a..f" rough affine guess: photo_x = a + b*x + c*z, photo_y = d + e*x + f*z (x east, z south, metres)
The fit refines a full homography so that building footprints from the plan land on dark roofs
and a ring around each one lands on lighter ground. It prints the residual contrast and writes
the overlay (1 px = 1 m on Birkenau, 0.5 m on Auschwitz I) plus its extent in plan metres.
"""
import json, sys, math
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.optimize import minimize

ROOT = Path(__file__).resolve().parent.parent
site, photo, guess, out = sys.argv[1], sys.argv[2], [float(v) for v in sys.argv[3].split()], sys.argv[4]
check = sys.argv[sys.argv.index("--check") + 1] if "--check" in sys.argv else None
S = json.load(open(ROOT / "site/camp/plans.json"))["sites"][site]
L = S["layers"]
img = Image.open(photo).convert("L")

def obb(q):
    best = None
    for i in range(len(q)):
        (x1, z1), (x2, z2) = q[i], q[(i + 1) % len(q)]
        a = math.atan2(z2 - z1, x2 - x1); c, s = math.cos(a), math.sin(a)
        S_ = [x * c + z * s for x, z in q]; T = [-x * s + z * c for x, z in q]
        ar = (max(S_) - min(S_)) * (max(T) - min(T))
        if best is None or ar < best[0]:
            best = (ar, a, (max(S_) + min(S_)) / 2, (max(T) + min(T)) / 2, max(S_) - min(S_), max(T) - min(T))
    _, a, sm, tm, ln, wd = best
    c, s = math.cos(a), math.sin(a)
    return (sm * c - tm * s, sm * s + tm * c), a, ln, wd

# sample points: inside each footprint (dark roofs) and in a ring 4-7 m outside (lighter ground)
feet = [it["p"] for k in ("ruin", "bld") for it in L.get(k, []) if len(it["p"]) >= 4]
inside, ring = [], []
for p in feet:
    q = p[:-1] if p[0] == p[-1] else p
    (cx, cz), a, ln, wd = obb(q)
    if not (8 < ln < 120 and 5 < wd < 30): continue
    ca, sa = math.cos(a), math.sin(a)
    P = lambda u, v: (cx + u * ca - v * sa, cz + u * sa + v * ca)
    for u in np.linspace(-ln * .35, ln * .35, 7):
        for v in np.linspace(-wd * .25, wd * .25, 3): inside.append(P(u, v))
        for v in (wd / 2 + 5, -wd / 2 - 5): ring.append(P(u, v))
inside, ring = np.array(inside), np.array(ring)
print(f"{len(feet)} footprints, {len(inside)} inside / {len(ring)} ring samples")

def H_of(h): return np.array([[h[1], h[2], h[0]], [h[4], h[5], h[3]], [h[6], h[7], 1.0]])
def project(h, pts):
    H = H_of(h); v = np.c_[pts, np.ones(len(pts))] @ H.T
    return v[:, :2] / v[:, 2:3]

def sampler(blur):
    a = np.asarray(img.filter(ImageFilter.GaussianBlur(blur)), dtype=np.float32) / 255
    def at(xy):
        x = np.clip(xy[:, 0], 0, a.shape[1] - 1.001); y = np.clip(xy[:, 1], 0, a.shape[0] - 1.001)
        x0 = x.astype(int); y0 = y.astype(int); fx = x - x0; fy = y - y0
        return (a[y0, x0] * (1 - fx) * (1 - fy) + a[y0, x0 + 1] * fx * (1 - fy) + a[y0 + 1, x0] * (1 - fx) * fy + a[y0 + 1, x0 + 1] * fx * fy)
    return at

h = np.array(guess + [0.0, 0.0])
scale = np.array([20, .02, .02, 20, .02, .02, 2e-6, 2e-6])     # step sizes for the optimiser
for blur in (12, 6, 3, 1.5):
    at = sampler(blur)
    f = lambda k: -(at(project(h0 + k * scale, ring)).mean() - at(project(h0 + k * scale, inside)).mean())
    h0 = h.copy()
    r = minimize(f, np.zeros(8), method="Powell", options={"xtol": 1e-3, "ftol": 1e-6, "maxiter": 4000})
    h = h0 + r.x * scale
    print(f"blur {blur:>4}: contrast {-r.fun:.3f}")

# write a north-up overlay covering the plan's boundary + margin
xs = [p[0] for p in S["boundary"]]; zs = [p[1] for p in S["boundary"]]
m = 120 if site == "bk" else 60
x0, x1, z0, z1 = min(xs) - m, max(xs) + m, min(zs) - m, max(zs) + m
res = 1.0 if site == "bk" else 0.5
W, Hh = int((x1 - x0) / res), int((z1 - z0) / res)
# PIL's perspective transform maps output pixel -> input pixel: compose plan homography with the output grid
A = H_of(h) @ np.array([[res, 0, x0], [0, res, z0], [0, 0, 1]])
A = A / A[2, 2]
coeffs = (A[0, 0], A[0, 1], A[0, 2], A[1, 0], A[1, 1], A[1, 2], A[2, 0], A[2, 1])
ov = img.transform((W, Hh), Image.PERSPECTIVE, coeffs, Image.BICUBIC, fillcolor=0)
# mark what falls outside the photo as transparent-ish grey via a mask in the alpha channel
mask = Image.new("L", img.size, 255).transform((W, Hh), Image.PERSPECTIVE, coeffs, Image.NEAREST, fillcolor=0)
rgba = Image.merge("RGBA", (ov, ov, ov, mask))
rgba.save(out.replace(".jpg", ".png")) if out.endswith(".png") else None
ov.save(out, quality=80, optimize=True, progressive=True)
mask.save(out.rsplit(".", 1)[0] + "-mask.png", optimize=True)
print(json.dumps({"extent": [round(x0, 1), round(z0, 1), round(x1, 1), round(z1, 1)], "size": [W, Hh], "h": [round(v, 9) for v in h]}))

if check:
    c = img.convert("RGB"); d = ImageDraw.Draw(c)
    for p in feet:
        d.line([tuple(v) for v in project(h, np.array(p))], fill=(255, 40, 40), width=2)
    for k, col in (("sector", (60, 220, 60)), ("rail", (0, 160, 255)), ("crem", (255, 0, 255))):
        for it in L.get(k, []):
            if len(it["p"]) > 1: d.line([tuple(v) for v in project(h, np.array(it["p"]))], fill=col, width=3)
    d.line([tuple(v) for v in project(h, np.array(S["boundary"]))], fill=(255, 220, 0), width=3)
    c.save(check, quality=85)
