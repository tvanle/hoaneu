# Brainstorm Report: Hoa Nêu Website Approach

**Date:** 2026-04-27
**Status:** Approved

## Problem Statement

Build a wedding flower catalog website for Hoa Nêu (hoaneu.com/hoaneu.vn). Not an e-commerce site — products are displayed for browsing, customers contact via Instagram/Facebook to purchase. Sales team needs to send product samples to customers based on criteria (budget, color, flower type).

## Requirements

- Product catalog with filtering (price, color tone, flower type)
- Contact via Instagram + Facebook (no direct purchase)
- Bilingual: Vietnamese + English
- Design: Modern, minimal, chic — White/Black/Red palette
- Reference: calma-miami.com
- Sales team needs easy product management
- SEO basic (meta tags, no blog)

## Site Structure

- Trang chu (Home)
- Hoa cuoi cam tay (Bridal Bouquets)
- Pre-wedding
- Den hoa cuoi (Wedding Lighting)
- Hoa lua (Silk Flowers)
- San pham khac (Other Products)
- Lien he (Contact)
- Product detail pages

## Evaluated Approaches

### 1. Next.js + Sanity CMS (SELECTED)
- Sales team self-service via Sanity Studio
- SSG/ISR for performance + SEO
- next-intl for i18n
- Free hosting on Vercel + Sanity free tier
- Best balance of DX, maintainability, and team autonomy

### 2. Next.js + Static JSON
- Simplest, zero external deps
- Dev-only updates (not suitable for sales team self-service)
- Good for small, static catalogs

### 3. Astro + Sanity CMS
- Best raw performance (zero JS by default)
- Smaller ecosystem, more manual i18n setup
- Less familiar to most developers

## Chosen Solution: Next.js 15 + Sanity CMS + Tailwind CSS + Vercel

### Architecture
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, next-intl
- **CMS:** Sanity v3 (free tier — 100K API calls/month)
- **Hosting:** Vercel (free tier)
- **Images:** Sanity CDN + next/image optimization

### Key Features
- Floating contact bar (IG + FB icons, fixed position)
- Product filter (client-side, by price/color/type)
- Deep links: IG opens app, FB opens Messenger with pre-filled message
- Responsive: mobile-first design
- Best seller sections (weekly/monthly)
- Category navigation matching sitemap

### URL Structure
```
/vi/                    → Home (Vietnamese)
/en/                    → Home (English)
/vi/hoa-cuoi-cam-tay    → Bridal Bouquets
/vi/pre-wedding         → Pre-wedding
/vi/den-hoa-cuoi        → Wedding Lighting
/vi/hoa-lua             → Silk Flowers
/vi/san-pham-khac       → Other Products
/vi/san-pham/[slug]     → Product Detail
/vi/lien-he             → Contact
```

### Cost
- Vercel: Free (hobby tier)
- Sanity: Free (100K API calls/month)
- Domain: ~$10-15/year (hoaneu.com)
- Total: ~$10-15/year

## Next Steps
- Create detailed implementation plan via /t1k:plan
- Phase 1: Project setup (Next.js + Sanity + Tailwind + i18n)
- Phase 2: Sanity schemas (products, categories, settings)
- Phase 3: Pages + components
- Phase 4: Filter system
- Phase 5: Contact integration (IG + FB)
- Phase 6: i18n content
- Phase 7: Deploy + training
