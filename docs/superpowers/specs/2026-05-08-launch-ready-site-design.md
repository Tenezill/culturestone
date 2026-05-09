# Launch-ready commercial site (Iteration A) — Design Spec

Date: 2026-05-08  
Project: Culture Stone (`culturestone/` Nuxt 4 + `culturestone-cms/` Strapi v5)  
Audience: European specifiers, importers, fabricators, and design studios

## 1. Summary

This spec defines the minimum set of product, content, and technical requirements to ship a **launch-ready commercial site** for a luxury stone supplier selling into Europe.

The site’s purpose is **not** to sell online. It is to build trust, present the product line with high-end editorial quality, and convert visitors into **tracked inquiries** via:

- **Netlify form submissions** (primary)
- **Email inquiries** (secondary, for customer record keeping)

Phone contact is intentionally **de-emphasized** for v1.

## 2. Goals and success criteria

### Goals
- Present the brand as **luxury** and **export-ready** for Europe.
- Make it easy to browse stones and request information quickly.
- Ensure buyers can keep a paper trail of requests via email.
- Ship with solid SEO + internationalization fundamentals for EU-wide launch.

### Success criteria (v1 is “done” when)
- No placeholder marketing images remain on primary pages (Home + Contact at minimum).
- Catalog and stone detail pages have clear, consistent CTAs to inquire.
- Contact flow works in production:
  - Netlify Forms receives submissions
  - A direct email path is present
- Core on-page SEO elements exist and resolve to correct canonical domain.
- Content and media delivery for stones is stable (Cloudinary-backed media is supported).

## 3. Non-goals (explicitly out of scope)
- No customer login / portal.
- No live inventory, stock status, or pricing.
- No checkout, payments, or automated quoting.
- No phone-first support workflow.
- No `/craft` page in v1 (planned later).

## 4. Target user journeys

### Journey A — “Specifier evaluating suppliers”
Home → browse a curated catalog → open stone detail → request samples / quote → contact confirmation.

### Journey B — “Importer validating operational readiness”
Home → confirm credibility (quality, packing, export experience, compliance) → contact via email for an auditable inquiry trail.

## 5. Information architecture (v1)

Keep the existing Nuxt routes and focus on strengthening conversion and credibility.

- `/` Home
  - Brand story + proof blocks (non-legal, marketing-level)
  - Featured stones / link to catalog
  - Prominent inquiry CTA
- `/catalog`
  - Editorial product grid
  - Clear per-card CTA to stone detail and/or inquire
- `/catalog/[slug]`
  - Stone details (specs, finish, applications, thickness, imagery)
  - Prominent inquiry CTA (prefilled with stone context)
- `/contact`
  - Netlify Form + direct inquiry email
  - Short “how we work” operational summary (lead times, samples, shipping approach)
- `/legal`, `/privacy`
  - Keep current compliance posture

Future (not in v1): `/craft` (and optionally `/projects` once you have case studies).

## 6. Content ownership and editing model (recommended “Lean launch”)

### Strapi (authoring source of truth)
- Stone entities and their editable fields (name, slug, origin, description/specs, applications, image media, publish workflow).
- Stone imagery stored/delivered via **Cloudinary** (or an equivalent CDN) through Strapi media fields.

### Repo (editorial but stable in v1)
- High-control brand copy and section ordering for the homepage.
- Editorial metadata for stone detail presentation (e.g. aspect ratio mapping) already tracked in `data/signatureStonePageDetails.ts`.

Rationale: ship v1 without building a generalized page-builder. Promote additional marketing content into Strapi only when an editor truly needs it.

## 7. Inquiry (conversion) design

### Conversion channels
- **Primary:** Netlify Form submission (structured, trackable, consistent).
- **Secondary:** direct email link to `inquiries@culturestone.eu` for customers who want their own thread history.

### CTA consistency
Use one dominant CTA label site-wide (localized):
- “Request a quote” / “Request samples” (final wording to be selected during implementation)

### Context carry-over (stone → contact)
When a user inquires from a stone page, prefill the inquiry context in the contact form (e.g. hidden field or initial message template). Minimum data:
- stone name + slug
- page URL

## 8. Trust signals (luxury + export readiness)

Without introducing a full `/craft` page, include compact trust modules in Home and optionally Contact:
- Quality assurance & selection process (high-level, non-technical)
- Packing / crating standards (damage prevention, documentation)
- Export readiness (Incoterms capability, lead times stated as ranges)
- Representative EU touchpoint (marketing-level mention; legal details remain in `/legal`)

## 9. SEO + i18n baseline (EU-wide launch)

### i18n
- Keep EN/DE/FR/ES, EU-wide day one.
- Ensure consistent translated CTA labels, nav labels, and contact copy.

### Technical SEO
- Canonical domain: `https://culturestone.eu`
- Sitemap enabled
- `robots.txt` and `llms.txt` shipped at root
- JSON-LD organization schema present; update `sameAs` once social profiles exist

## 10. Media strategy (Cloudinary)

### Requirements
- Stone media URLs must resolve correctly for absolute rendering in Nuxt.
- Use optimized formats when available (existing utilities like `pickMediaUrl`).
- Ensure layout stability: consistent aspect ratios on key stone pages to avoid CLS.

### Launch requirement
Replace placeholder Unsplash imagery on key pages (Home + Contact at minimum) with:
- brand photography (quarry, factory, slabs, applications) or owned/licensed assets

## 11. Operational readiness checklist (go-live)

- Environment variables set for production:
  - site URL (`NUXT_PUBLIC_SITE_URL`)
  - Strapi URL (`NUXT_PUBLIC_STRAPI_URL` / `STRAPI_URL`)
- Contact form verified in Netlify (Forms tab shows submissions)
- Email inquiries route confirmed for `inquiries@culturestone.eu`
- No remaining “#” destination links in global nav/footer for user-facing items (remove or replace with real destinations)

## 12. Milestones (v1)

1) Replace placeholder imagery and tighten above-the-fold story on Home  
2) Ensure catalog + stone detail CTAs are consistent and route inquiry context into Contact  
3) Confirm Strapi media delivery (Cloudinary) and responsive image formats  
4) Production verification: sitemap/robots/llms, form submission, canonical domain

