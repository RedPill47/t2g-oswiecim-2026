# Oświęcim 2026 – trip guide

A one-page guide to the Témoins de la 2e Génération study trip to Oświęcim and Kraków, 29 October – 3 November 2026: the day-by-day programme, the afternoon workshops with a language filter, a packing checklist and a glossary.

**Live page:** https://redpill47.github.io/t2g-oswiecim-2026/

This is an **unofficial** guide made by a participant. The official programme comes from [Témoins de la 2e Génération](https://temoins.lu); if anything differs, theirs is right.

The page is available in **Lëtzebuergesch, Deutsch, Français and English** (switcher at the top). It opens in the visitor's browser language and remembers their choice; a link can force a language with `?lang=lb`, `?lang=de`, `?lang=fr` or `?lang=en`, e.g. https://redpill47.github.io/t2g-oswiecim-2026/?lang=fr. The translations are unofficial too.

The page is a single static file (`site/index.html`). Your choices (languages, workshops, checklist) are stored only in your own browser; nothing is sent anywhere.

## Updating

Replace `site/index.html`, commit and push to `main`. English text sits in the HTML; the other languages sit next to it in the script (`STR` for the static text, and `{en,de,fr,lb}` objects in the programme data), so change all four when you edit a sentence. GitHub Actions redeploys it in about a minute.
