# Oświęcim 2026 – trip guide

A one-page guide to the Témoins de la 2e Génération study trip to Oświęcim and Kraków, 29 October – 3 November 2026: the day-by-day programme, the afternoon workshops with a language filter, a packing checklist and a glossary.

**Live page:** https://redpill47.github.io/t2g-oswiecim-2026/

This is an **unofficial** guide made by a participant. The official programme comes from [Témoins de la 2e Génération](https://temoins.lu); if anything differs, theirs is right.

The page is available in **Lëtzebuergesch, Deutsch, Français and English** (switcher at the top). It opens in the visitor's browser language and remembers their choice; a link can force a language with `?lang=lb`, `?lang=de`, `?lang=fr` or `?lang=en`, e.g. https://redpill47.github.io/t2g-oswiecim-2026/?lang=fr. The translations are unofficial too.

The guide is a static site in `site/`. Your choices (languages, workshops, checklist) are stored only in your own browser; nothing is sent anywhere.

## Updating

Replace `site/index.html`, commit and push to `main`. English text sits in the HTML; the other languages sit next to it in the script (`STR` for the static text, and `{en,de,fr,lb}` objects in the programme data), so change all four when you edit a sentence. GitHub Actions redeploys it in about a minute.

## Camp explorer (`site/camp/`)

A real-scale 3D map of Auschwitz I and Birkenau with the history of 22 places, in the same four languages.

- `plans.json`: building outlines, ruins, fences, rails and woods from OpenStreetMap (© OpenStreetMap contributors, ODbL). Rebuild with `python3 tools/osm_export.py`.
- `places.js`: the places and their texts. Each one is anchored to an OpenStreetMap name (`at`). The facts follow the Auschwitz Memorial's history pages, and each place lists its sources.
- `camp.js`: the viewer, built on three.js r180 (MIT), kept in `vendor/` so nothing loads from a CDN. It draws only while the view moves. It falls back to text alone when WebGL is missing, and `sw.js` keeps a copy for use without signal.
- `aerial/`: the 1944 reconnaissance photos (US National Archives, public domain): Birkenau on 13 September 1944, Auschwitz I on 4 April 1944, behind the "1944 ↔ Today" slider. `tools/aerial_fit.py` aligned them to the plan. It starts from a rough guess, then fits a perspective transform so that the plan's barrack footprints land on the dark roofs in the photo. The result is accurate to within a few metres.
- Ruins are shown as they are today. The "1944 volumes" button adds plain grey volumes drawn from the ruins' footprints, labelled as approximate.

## Preview

The `camp-explorer` branch is published at https://redpill47.github.io/t2g-oswiecim-2026/preview/ (not indexed by search engines). Every deploy publishes `main` at the root and that branch under `/preview/`.
