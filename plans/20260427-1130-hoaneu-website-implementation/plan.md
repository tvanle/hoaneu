# Hoa Neu Website - Implementation Plan

**Date:** 2026-04-27
**Stack:** Next.js 15 (App Router) + Sanity CMS v3 + Tailwind CSS + next-intl + Vercel
**Brainstorm:** [brainstorm report](../reports/brainstorm-20260427-hoaneu-website-approach.md)
**Research:** [nextjs-sanity](../reports/researcher-01-nextjs-sanity.md) | [next-intl](../reports/researcher-02-next-intl.md) | [design-ref](../reports/researcher-03-design-reference.md)

## Phases

| # | Phase | Status | Effort | Deps |
|---|-------|--------|--------|------|
| 1 | [Project Setup](phase-01-project-setup.md) | Done | S (1d) | None |
| 2 | [Sanity CMS Schemas](phase-02-sanity-schemas.md) | Done | S (1d) | P1 |
| 3 | [Layout & Navigation](phase-03-layout-navigation.md) | Done | M (2d) | P1 |
| 4 | [Home Page](phase-04-home-page.md) | Done | M (2d) | P2, P3 |
| 5 | [Product Catalog & Filter](phase-05-product-catalog-filter.md) | Done | M (3d) | P2, P3 |
| 6 | [Product Detail & Contact](phase-06-product-detail-contact.md) | Done | S (1d) | P5 |
| 7 | [i18n & SEO](phase-07-i18n-seo.md) | Done | M (2d) | P3-P6 |
| 8 | [Deploy & Polish](phase-08-deploy-polish.md) | Pending | S (1d) | P7 |

**Total:** ~13 days | **Critical path:** P1 → P2 → P5 → P6 → P7 → P8

## Architecture

```
Browser → Vercel Edge → Next.js 15 (App Router)
                            ├── /[locale]/          (i18n routing)
                            ├── /admin/             (Sanity Studio)
                            └── /api/revalidate/    (webhook)
                                    ↕
                              Sanity CMS v3
                            (content + images CDN)
```

## Key Decisions

- **i18n:** `next-intl` with `localePrefix: 'as-needed'`, default=vi
- **CMS:** Sanity v3, document-level localization, embedded Studio at `/admin`
- **Revalidation:** ISR time-based (1h) + on-demand webhook
- **Images:** Sanity CDN + `@sanity/image-url` + `next/image`
- **Styling:** Tailwind CSS, White/Black/Red palette, mobile-first
- **Contact:** Floating IG + FB bar, deep links with pre-filled messages
