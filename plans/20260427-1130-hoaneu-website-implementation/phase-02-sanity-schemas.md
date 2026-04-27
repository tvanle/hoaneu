# Phase 2: Sanity CMS Schemas

## Overview
- **Priority:** Critical
- **Status:** Pending
- **Effort:** S (1d)
- **Deps:** Phase 1

Define Sanity document schemas for products, categories, and site settings.

## Key Insights
- Document-level localization (separate docs per language, linked via `_translations`)
- References for categories/tags (not embedded) — allows independent management
- No derived fields — compute counts/aggregations in GROQ queries
- `image` type with `hotspot: true` for responsive cropping
- Price as `number`, not string

## Schemas to Create

### 1. Product (`product`)
```
Fields:
- title (string, required)
- slug (slug, from title)
- language (string: 'vi' | 'en')
- description (blockContent / Portable Text)
- price (number, required, positive)
- priceNote (string, optional — e.g., "gia tu", "lien he")
- images (array of image with hotspot)
- mainImage (image with hotspot, required)
- category (reference to category)
- colorTones (array of string — e.g., 'trang', 'do', 'hong')
- flowerTypes (array of string — e.g., 'hong', 'lan', 'cuc')
- isBestSeller (boolean, default false)
- bestSellerOrder (number, for ranking)
- _translations (array of references to product — link vi/en versions)
```

### 2. Category (`category`)
```
Fields:
- title (string, required)
- slug (slug, from title)
- language (string: 'vi' | 'en')
- description (text, optional)
- image (image with hotspot)
- order (number, for navigation ordering)
```

Categories: Hoa cuoi cam tay, Pre-wedding, Den hoa cuoi, Hoa lua, San pham khac (with subcategories: Tiec anni, Cau hon, Hoa dam ngo, Xe cuoi, Phong cuoi, Decor dam cuoi)

### 3. Site Settings (`siteSettings`)
Singleton document for global config:
```
Fields:
- shopName (string)
- instagramUrl (url)
- facebookUrl (url)
- phone (string, optional)
- address (string, optional)
- heroImage (image)
- heroTitle (string)
- heroSubtitle (string)
- language (string: 'vi' | 'en')
```

## Implementation Steps

1. Create schema files in `sanity/schemaTypes/`
   - `product-type.ts`
   - `category-type.ts`
   - `site-settings-type.ts`
   - `index.ts` (exports all schemas)

2. Register schemas in `sanity.config.ts`

3. Configure Sanity Studio structure
   - Group by document type
   - Site Settings as singleton (no list, direct edit)

4. Create GROQ query definitions in `lib/queries/products.ts`
   - `ALL_PRODUCTS_QUERY` — list with category refs resolved
   - `PRODUCT_BY_SLUG_QUERY` — single product detail
   - `PRODUCTS_BY_CATEGORY_QUERY` — filtered by category slug
   - `BEST_SELLERS_QUERY` — isBestSeller=true, ordered
   - `ALL_CATEGORIES_QUERY` — for navigation
   - `SITE_SETTINGS_QUERY` — global settings
   - `FILTER_OPTIONS_QUERY` — distinct colorTones + flowerTypes

5. Create revalidation webhook endpoint
   - `app/api/revalidate/route.ts`
   - Verify webhook signature
   - Tag-based revalidation

6. Add sample seed data via Sanity Studio
   - 2-3 products per category
   - All categories
   - Site settings with IG + FB URLs

## Related Code Files
- **Create:** `sanity/schemaTypes/product-type.ts`, `sanity/schemaTypes/category-type.ts`, `sanity/schemaTypes/site-settings-type.ts`, `sanity/schemaTypes/index.ts`, `lib/queries/products.ts`, `app/api/revalidate/route.ts`
- **Modify:** `sanity/sanity.config.ts`

## Todo
- [ ] Create product schema
- [ ] Create category schema
- [ ] Create site settings schema (singleton)
- [ ] Register all schemas
- [ ] Configure Studio structure
- [ ] Write GROQ queries
- [ ] Create revalidation webhook endpoint
- [ ] Add sample seed data

## Success Criteria
- Schemas visible in Sanity Studio at `/admin`
- Can create/edit/delete products and categories
- GROQ queries return expected data
- Webhook revalidation responds correctly

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| Schema design changes mid-project | 3 | 3 | 9 | Keep schemas simple, iterate |
| Document-level i18n complexity | 2 | 3 | 6 | Start with vi-only, add en later |
