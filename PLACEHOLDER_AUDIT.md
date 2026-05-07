# Placeholder Audit

Tracks remaining placeholder content across the codebase.
Status: **TODO** = needs fixing · **DONE** = resolved

---

## Emails

| Location | Old value | New value | Status |
|----------|-----------|-----------|--------|
| `pages/contact.vue:34,37` | studio@culturestone.example | inquiries@culturestone.eu | DONE |
| `pages/legal.vue:54` | studio@culturestone.example | inquiries@culturestone.eu | DONE |
| `pages/privacy.vue:33` | privacy@culturestone.example | inquiries@culturestone.eu | DONE |
| `components/EditorialFooter.vue:9,51,53` | studio@culturestone.example | inquiries@culturestone.eu | DONE |
| `app.vue:51,64,67` | studio@culturestone.example | inquiries@culturestone.eu | DONE |
| `composables/useSchema.ts:28,32` | studio@culturestone.com | inquiries@culturestone.eu | DONE |

---

## Company Info / Legal Pages

| Location | Old value | New value | Status |
|----------|-----------|-----------|--------|
| `pages/legal.vue` — operator block | [Company Legal Name...] | Sichuan Zishu Chengfeng... | DONE |
| `pages/legal.vue` — legal rep | [Full Name of Legal Representative] | Luo Shasha (骆沙沙) | DONE |
| `pages/legal.vue` — credit code | [18-character code] | 91510100MA6CN9DD81 | DONE |
| `pages/legal.vue` — phone | [+86 000 0000 0000] | +86 151 9626 6588 | DONE |
| `pages/legal.vue` — hosting | [Hosting Provider Name] | Netlify, Inc. | DONE |
| `pages/legal.vue` — VPS provider | [VPS Provider Name] | Removed placeholder text | DONE |
| `pages/legal.vue` — EU rep | [EU Representative...] | Synertrade FR SAS | DONE |
| `pages/privacy.vue` — date | [Month Day, Year] | May 7, 2026 | DONE |
| `pages/privacy.vue` — controller block | [Company Legal Name...] | Sichuan Zishu Chengfeng... | DONE |
| `pages/privacy.vue` — EU rep | [EU Representative...] | Synertrade FR SAS | DONE |
| `pages/privacy.vue` — DPO | [Select one...] | Chose option (b) — not required | DONE |
| `pages/privacy.vue` — retention | [7 / 14 / 30] days | 30 days | DONE |
| `pages/privacy.vue` — hosting | [Hosting Provider Name] | Netlify, Inc. | DONE |
| `pages/privacy.vue` — cookie instruction | [Adjust this section...] | Removed; kept accurate cookie text | DONE |
| `pages/privacy.vue` — CMS location | [Hong Kong / EU — update] | Removed conditional note | DONE |
| `pages/privacy.vue` — safeguards | [select applicable safeguards] | SCCs + Art. 49 GDPR | DONE |

---

## Locations (Fake NY / London / Milan)

| Location | Old value | New value | Status |
|----------|-----------|-----------|--------|
| `locales/*/en,de,fr,es.json` — nav.locations | New York, London, Milan | Chengdu, Lyon | DONE |
| `locales/*/en,de,fr,es.json` — footer.locations | New York, London, Milan | Chengdu, Lyon | DONE |
| `pages/contact.vue:45` | New York · London · Milan | Chengdu · Lyon | DONE |
| `app.vue` mobile nav | New York · London · Milan | Chengdu · Lyon (Milan removed) | DONE |
| `components/EditorialFooter.vue` | New York · London · Milan | Chengdu · Lyon (Milan removed) | DONE |
| `composables/useSchema.ts` locations | NY / London / Milan | Chengdu HQ + Lyon EU rep | DONE |

---

## Domain / URL Placeholders

| Location | Old value | New value | Status |
|----------|-----------|-----------|--------|
| `nuxt.config.ts` (3×) | https://culturestone.com | https://culturestone.eu | DONE |
| `public/robots.txt` sitemap | https://culturestone.com/sitemap.xml | https://culturestone.eu/sitemap.xml | DONE |

---

## Images (Unsplash Placeholders)

These are cosmetic placeholders — replace when real photography is available.

| Location | Description | Status |
|----------|-------------|--------|
| `pages/contact.vue:8` | Stone quarry Unsplash image | TODO — replace with own photography |
| `pages/index.vue:84` | Stone quarry Unsplash image | TODO — replace with own photography |
| `pages/index.vue:99` | Stone detail Unsplash image | TODO — replace with own photography |
| `pages/index.vue:144` | Marble Unsplash image | TODO — replace with own photography |
| `pages/index.vue:181` | Marble Unsplash image | TODO — replace with own photography |
| `pages/index.vue:196` | Granite Unsplash image | TODO — replace with own photography |

---

## Remaining TODOs

| Location | Issue | Status |
|----------|-------|--------|
| `composables/useSchema.ts` | `sameAs` social URLs — add once social accounts are live | TODO |
| `pages/legal.vue` — image CDN | Image delivery provider not specified in legal notice | DONE — Cloudinary, Inc., San Francisco, CA |
| `pages/privacy.vue` — CMS/image hosting | Section 9 + Section 10 image transfer disclosure | DONE — Cloudinary (US); folded into US transfer (a) alongside Netlify |
| `app.vue` location links | Mobile nav location links point to `#` — wire up to real office pages if needed | TODO |
| `components/EditorialFooter.vue` | Footer location links point to `#` — wire up if needed | TODO |
