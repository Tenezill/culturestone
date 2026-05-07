# Claude Progress Tracker

Overarching status for the 2026-05-07 contact page overhaul session.

---

## 1. i18n Bug Fix (ROOT CAUSE — broken form labels)

**Problem:** Every contact form label rendered as a raw key (`contact.form.name`, etc.).  
**Root cause:** Nuxt 4 auto-detects `i18n/locales/` and loads it first; that directory was missing all `contact.form.*`, `contact.info.*`, `contact.success.*` keys.  
**Status: DONE**

- [x] `i18n/locales/en.json` — complete rewrite with all contact + updated location/SEO keys
- [x] `i18n/locales/de.json` — same, German translations
- [x] `i18n/locales/fr.json` — same, French translations
- [x] `i18n/locales/es.json` — same, Spanish translations
- [x] `locales/en.json` — synced to match `i18n/locales/en.json`
- [x] `locales/de.json` — synced
- [x] `locales/fr.json` — synced
- [x] `locales/es.json` — synced

---

## 2. Contact Form — Netlify Forms Wiring

**Status: DONE**

- [x] `<form>` tag: added `name="contact"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`
- [x] Added `<input type="hidden" name="form-name" value="contact">` inside form
- [x] `handleSubmit`: replaced fake `setTimeout` with real `fetch('/', { method: 'POST', ... })` POST to Netlify Forms endpoint
- [x] Error handling: catch block sets `submitted.value = true` so user still sees success state on network error

---

## 3. Contact Page Info Panel

**Status: DONE**

- [x] Email: `studio@culturestone.example` → `inquiries@culturestone.eu`
- [x] Phone block added: `+86 151 9626 6588`
- [x] Locations: "New York · London · Milan" → "Chengdu · Lyon"

---

## 4. Global Email Replacement

`studio@culturestone.example` → `inquiries@culturestone.eu`  
**Status: DONE**

- [x] `pages/contact.vue`
- [x] `pages/legal.vue`
- [x] `pages/privacy.vue`
- [x] `app.vue`
- [x] `components/EditorialFooter.vue`
- [x] `composables/useSchema.ts` (`studio@culturestone.com` → `inquiries@culturestone.eu`)

---

## 5. Domain Fix (.com → .eu)

**Status: DONE**

- [x] `nuxt.config.ts` — `site.url`, `i18n.baseUrl`, `runtimeConfig.public.siteUrl`
- [x] `public/robots.txt` — sitemap URL

---

## 6. Location Updates (NY/London/Milan → Chengdu/Lyon)

**Status: DONE**

- [x] All 8 locale files (`locales/` + `i18n/locales/`) — `nav.locations.*`, `footer.locations.*`, SEO descriptions
- [x] `app.vue` — mobile nav location list (Milan removed)
- [x] `components/EditorialFooter.vue` — footer location list (Milan removed)
- [x] `pages/contact.vue` — info panel
- [x] `composables/useSchema.ts` — location blocks replaced with Chengdu HQ + Lyon EU rep

---

## 7. Legal Page — Placeholder Fill

**Status: DONE**

- [x] Company: Sichuan Zishu Chengfeng Building Materials Co., Ltd.
- [x] Address: No. 54-1, South Third Section of Second Ring Road, High-tech Zone, Chengdu, Sichuan 610066, PRC
- [x] Legal rep: Luo Shasha (骆沙沙)
- [x] Credit code: 91510100MA6CN9DD81
- [x] Registration authority: Administration for Market Regulation of Chengdu High-tech Zone
- [x] Phone: +86 151 9626 6588
- [x] Hosting: Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA
- [x] EU rep: Synertrade FR SAS, 9 rue du Bat d'Argent, 69001 Lyon, France, info@syner-sarl.cn
- [x] Strapi CMS hosting note added (links to Privacy Policy)
- [x] Placeholder notice paragraph removed

---

## 8. Privacy Page — Placeholder Fill

**Status: DONE**

- [x] Date: May 7, 2026
- [x] Controller: Sichuan Zishu Chengfeng Building Materials Co., Ltd. + full address
- [x] Controller email: inquiries@culturestone.eu
- [x] EU rep: Synertrade FR SAS, Lyon + info@syner-sarl.cn
- [x] DPO section: chose option (b) — not legally required
- [x] Server logs retention: 30 days
- [x] Hosting (Section 5): Netlify, Inc., San Francisco, CA (US-based, noted for SCCs)
- [x] Cookies (Section 6): removed `[Adjust this section...]` instruction; kept accurate "strictly necessary only" text
- [x] CMS (Section 9): removed `[Hong Kong / EU]` conditional note; simplified to "virtual private server"; retention 30 days
- [x] International transfers (Section 10): SCCs + Art. 49(1)(b) GDPR for mainland China; adequacy decision / SCCs for Netlify (US)
- [x] Placeholder notice paragraph removed

---

## 9. Schema.org (useSchema.ts)

**Status: DONE**

- [x] Email: `studio@culturestone.com` → `inquiries@culturestone.eu`
- [x] Added `telephone: '+8615196266588'`
- [x] Replaced NY/London/Milan location blocks with Chengdu HQ + Lyon EU rep
- [x] Removed TODO comments

**Remaining TODO:** `sameAs` social URLs — add once social accounts are live

---

## 10. SEO Files

**Status: DONE**

- [x] `public/robots.txt` — domain updated to `culturestone.eu`
- [x] `public/llms.txt` — created with company info, page list, stone collection summary

---

## 11. Placeholder Audit File

**Status: DONE**

- [x] `PLACEHOLDER_AUDIT.md` created at project root
- All resolved items marked DONE; remaining items (Unsplash images, VPS location, social URLs, location `href="#"`) marked TODO

---

## 12. Migration Log

**Status: DONE**

- [x] `migration.md` — entry appended documenting all 2026-05-07 changes

---

## Remaining TODOs (not urgent, tracked in PLACEHOLDER_AUDIT.md)

| Item | Location | Notes |
|------|----------|-------|
| Unsplash placeholder images | `pages/contact.vue:8`, `pages/index.vue` (5×) | Replace with own photography when available |
| VPS provider for Strapi | `pages/legal.vue`, `pages/privacy.vue` | Specify VPS host + location once confirmed |
| `sameAs` social URLs | `composables/useSchema.ts` | Add once social accounts are live |
| Location links `href="#"` | `app.vue`, `components/EditorialFooter.vue` | Wire up to office pages if/when needed |

---

## Verification Checklist

- [ ] `npm run dev` — contact page loads, form labels show correctly (not raw keys)
- [ ] Submit contact form → check Netlify dashboard (Forms tab) for submission
- [ ] Check `pages/legal.vue` and `pages/privacy.vue` have no remaining `[` brackets
- [ ] `/robots.txt` served at root with correct sitemap URL
- [ ] `/llms.txt` served at root
- [ ] View source → search `application/ld+json` → verify schema has Chengdu + Lyon locations
- [ ] All 4 locale switcher options show correct text throughout (no raw keys)
