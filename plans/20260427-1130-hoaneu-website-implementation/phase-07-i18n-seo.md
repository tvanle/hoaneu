# Phase 7: i18n & SEO

## Overview
- **Priority:** High
- **Status:** Pending
- **Effort:** M (2d)
- **Deps:** Phase 3-6

Complete bilingual content, SEO optimization, and translation setup.

## Key Insights
- Default locale: `vi` (primary market)
- `localePrefix: 'as-needed'` → `/vi/...` shows no prefix (default), `/en/...` shows prefix
- Document-level localization in Sanity (separate vi/en product documents)
- UI strings in `messages/vi.json` and `messages/en.json`
- hreflang tags for each page
- OG tags with locale-specific content

## Implementation Steps

### 1. Complete Translation Messages

**messages/vi.json** — all UI strings:
```json
{
  "nav": { "home": "Trang Chu", "bridal-bouquet": "Hoa Cuoi Cam Tay", ... },
  "home": { "heroTitle": "...", "bestSellerWeek": "Best Seller Tuan Nay", ... },
  "catalog": { "filterTitle": "Bo Loc", "priceRange": "Muc Gia", ... },
  "product": { "contactVia": "Lien He Qua", "relatedProducts": "San Pham Lien Quan", ... },
  "contact": { "title": "Lien He", "followUs": "Theo Doi Chung Toi", ... },
  "common": { "viewAll": "Xem Tat Ca", "clearFilters": "Xoa Bo Loc", ... }
}
```

**messages/en.json** — English equivalents for all keys

### 2. Apply Translations to All Components

- Replace all hardcoded Vietnamese strings with `useTranslations()` (client) or `getTranslations()` (server)
- Header, Footer, Filter labels, Button text, Section headers, Empty states

### 3. SEO Metadata

For every page, implement `generateMetadata()`:
- `title` — locale-specific
- `description` — locale-specific
- `alternates.languages` — hreflang with both vi + en URLs
- `openGraph` — locale, image, title, description
- `robots` — index, follow

### 4. Sitemap Generation

Create `app/sitemap.ts`:
- Generate URLs for all pages x all locales
- Include product detail pages (from Sanity query)
- Include category pages

### 5. robots.txt

Create `app/robots.ts`:
- Allow all crawlers
- Point to sitemap URL

### 6. Structured Data (JSON-LD)

Add to product pages:
```json
{
  "@type": "Product",
  "name": "...",
  "image": "...",
  "offers": { "@type": "Offer", "price": "...", "priceCurrency": "VND" }
}
```

### 7. Language Switcher Polish

- Current locale highlighted
- Smooth transition between languages
- Preserve current page path when switching

## Related Code Files
- **Create:** `app/sitemap.ts`, `app/robots.ts`, `components/structured-data.tsx`
- **Modify:** `messages/vi.json`, `messages/en.json`, all page files (add generateMetadata), all components (replace hardcoded strings)

## Todo
- [ ] Complete messages/vi.json with all UI strings
- [ ] Complete messages/en.json with all translations
- [ ] Replace hardcoded strings in all components
- [ ] Add generateMetadata() to all pages
- [ ] Add hreflang alternates to all pages
- [ ] Create sitemap.ts (dynamic, includes products)
- [ ] Create robots.ts
- [ ] Add JSON-LD structured data to product pages
- [ ] Polish language switcher
- [ ] Test locale switching preserves page path
- [ ] Verify hreflang tags in page source

## Success Criteria
- All UI text translates correctly between vi/en
- Language switcher works on all pages, preserves path
- hreflang tags present on all pages
- Sitemap includes all pages in both locales
- JSON-LD renders on product pages
- No hardcoded Vietnamese strings in components

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| Missing translation keys | 3 | 2 | 6 | TypeScript strict mode for message keys |
| SEO crawling issues with i18n | 2 | 4 | 8 | Test with Google Search Console, verify sitemap |
