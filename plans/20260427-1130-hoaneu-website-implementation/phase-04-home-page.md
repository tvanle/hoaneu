# Phase 4: Home Page

## Overview
- **Priority:** High
- **Status:** Pending
- **Effort:** M (2d)
- **Deps:** Phase 2 (schemas), Phase 3 (layout)

Build the home page with hero, best sellers, and category overview sections.

## Key Insights
- Hero: full-width image, centered text, CTA button
- Best seller of the week + Top 5 best sellers of the month (from sitemap)
- Category cards linking to category pages
- Image-forward design, generous white space
- Server Component — fetch data at render time

## Sections (top to bottom)

### 1. Hero Section
- Full-width background image (from Sanity `siteSettings.heroImage`)
- Overlay text: shop name + tagline
- CTA: "Xem San Pham" → category page
- Height: 100vh on desktop, 70vh on mobile
- Parallax optional (CSS only)

### 2. Best Seller This Week
- Section title: "Best Seller Tuan Nay"
- Horizontal scroll or 3-col grid
- Product cards (image + name + price)
- Max 4-6 items
- GROQ: `*[_type == 'product' && isBestSeller == true && language == $locale] | order(bestSellerOrder asc)[0...6]`

### 3. Top 5 Best Sellers This Month
- Section title: "Top 5 Best Seller Thang Nay"
- Larger cards, 2-col or asymmetric layout
- Feature image + name + price + category badge
- GROQ: same query with different ordering/limit

### 4. Category Overview
- Grid of category cards (image + name)
- 2x3 grid desktop, 2x2 tablet, 1-col mobile
- Categories: Hoa cuoi cam tay, Pre-wedding, Den hoa cuoi, Hoa lua, San pham khac
- Click → navigate to category page
- GROQ: `*[_type == 'category' && language == $locale] | order(order asc)`

### 5. Contact CTA Section
- Simple banner: "Lien he tu van" + IG/FB buttons
- Background: light gray or subtle pattern
- Links to IG and FB

## Components to Build

### `components/hero-section.tsx`
- Server component, fetches siteSettings
- Responsive image with overlay

### `components/product-card.tsx` (reusable)
- Image (aspect-square, object-cover)
- Product name (uppercase, tracking-wider)
- Price (gray text)
- Click → product detail page
- Hover: subtle opacity/scale

### `components/category-card.tsx`
- Image with overlay text
- Category name centered
- Click → category page

### `components/section-header.tsx`
- Title (serif, large)
- Optional subtitle
- Optional "Xem tat ca" link

## Implementation Steps

1. Create shared components
   - `product-card.tsx` — reusable across home + catalog
   - `category-card.tsx`
   - `section-header.tsx`

2. Build home page (`app/[locale]/page.tsx`)
   - Server component
   - Fetch: siteSettings, bestSellers, categories

3. Build Hero Section
   - Full-width image from Sanity
   - Overlay text with CTA

4. Build Best Sellers sections
   - Weekly + Monthly grids
   - Product cards with links

5. Build Category Overview grid
   - Category cards with images
   - Responsive grid layout

6. Build Contact CTA section
   - IG + FB links
   - Simple, clean design

## Related Code Files
- **Create:** `app/[locale]/page.tsx`, `components/hero-section.tsx`, `components/product-card.tsx`, `components/category-card.tsx`, `components/section-header.tsx`
- **Modify:** None

## Todo
- [ ] Build ProductCard component
- [ ] Build CategoryCard component
- [ ] Build SectionHeader component
- [ ] Build HeroSection with Sanity image
- [ ] Build Best Sellers section (weekly)
- [ ] Build Top 5 Monthly section
- [ ] Build Category Overview grid
- [ ] Build Contact CTA section
- [ ] Compose home page with all sections
- [ ] Test with sample Sanity data
- [ ] Verify responsive layout

## Success Criteria
- Home page loads with data from Sanity
- Best sellers display correctly
- Category cards link to category pages
- Product cards link to product detail
- Responsive at all breakpoints
- Images load via Sanity CDN

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| No product images yet | 3 | 3 | 9 | Use placeholder images, design for image-first |
| Hero image performance | 2 | 3 | 6 | Use next/image with priority, proper sizing |
