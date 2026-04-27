# Phase 6: Product Detail & Contact

## Overview
- **Priority:** High
- **Status:** Pending
- **Effort:** S (1d)
- **Deps:** Phase 5

Build product detail page and contact page with IG/FB integration.

## Key Insights
- Product detail: large images, price, description, contact CTAs
- No "add to cart" — instead "Lien he tu van" buttons linking to IG/FB
- Deep links: IG opens app, FB Messenger opens with pre-filled message
- Contact page: shop info, map embed (optional), social links
- Image gallery with lightbox or swiper

## Pages to Build

### Product Detail (`app/[locale]/san-pham/[slug]/page.tsx`)

Layout:
```
[Image Gallery]          [Product Info]
 - Main image (large)    - Category breadcrumb
 - Thumbnails            - Product name
                          - Price / Price note
                          - Description (Portable Text)
                          - Color tones (badges)
                          - Flower types (badges)
                          - "Lien he qua Instagram" button
                          - "Lien he qua Facebook" button

[Related Products]
 - 4 products from same category
```

### Contact Page (`app/[locale]/lien-he/page.tsx`)

Layout:
```
[Hero/Banner]
[Contact Info]
 - Shop name
 - Address
 - Phone (optional)
 - Instagram link
 - Facebook link
[Social CTA Cards]
 - IG card with handle + follow button
 - FB card with page name + message button
```

## Contact Deep Links

### Instagram
- Profile: `https://instagram.com/hoaneu`
- DM (mobile): `instagram://user?username=hoaneu` (fallback to web)

### Facebook Messenger
- Pre-filled message: `https://m.me/hoaneu?text=Chao%20Hoa%20Neu%2C%20em%20muon%20tu%20van%20ve%20{product_name}%20({product_url})`
- This opens Messenger with a draft message including the product name and link

## Components to Build

### `components/product-image-gallery.tsx` (Client)
- Main image display (large)
- Thumbnail strip below
- Click thumbnail → swap main image
- Optional: lightbox on click
- Mobile: swipeable

### `components/contact-cta.tsx`
- Two buttons: IG + FB
- Pre-filled message for FB Messenger
- Icons + text
- Styled as primary CTAs (red)

### `components/product-badges.tsx`
- Color tone badges (with color swatch dot)
- Flower type badges
- Small, pill-shaped

### `components/related-products.tsx` (Server)
- Fetch 4 products from same category (excluding current)
- Reuse ProductCard

### `components/breadcrumb.tsx`
- Home > Category > Product name
- Linked navigation

## Implementation Steps

1. Build product detail page
   - `app/[locale]/san-pham/[slug]/page.tsx`
   - `generateStaticParams()` for all product slugs
   - Fetch product + related products from Sanity
   - `generateMetadata()` for SEO (title, description, OG image)

2. Build ProductImageGallery
   - Client component for interactivity
   - Main image + thumbnails
   - Sanity image URL builder for optimized sizes

3. Build ContactCTA
   - IG button with direct link
   - FB Messenger button with pre-filled message
   - Encode product name + URL in message template

4. Build product info section
   - Price display (formatted VND)
   - Portable Text renderer for description
   - Color/flower type badges

5. Build related products section
   - GROQ: same category, exclude current, limit 4

6. Build contact page
   - `app/[locale]/lien-he/page.tsx`
   - Shop info from Sanity siteSettings
   - Social link cards

7. Build breadcrumb navigation

## GROQ Queries

```groq
// Product detail
*[_type == 'product' && slug.current == $slug && language == $locale][0] {
  _id, title, slug, price, priceNote,
  description,
  images[] { asset->, alt },
  mainImage { asset->, alt },
  colorTones, flowerTypes,
  category-> { title, slug }
}

// Related products
*[_type == 'product' && category._ref == $categoryId && _id != $currentId && language == $locale][0...4] {
  _id, title, slug, price, mainImage { asset->, alt }
}
```

## Related Code Files
- **Create:** `app/[locale]/san-pham/[slug]/page.tsx`, `app/[locale]/lien-he/page.tsx`, `components/product-image-gallery.tsx`, `components/contact-cta.tsx`, `components/product-badges.tsx`, `components/related-products.tsx`, `components/breadcrumb.tsx`
- **Modify:** `lib/queries/products.ts`

## Todo
- [ ] Build product detail page
- [ ] Build ProductImageGallery (thumbnail + main image swap)
- [ ] Build ContactCTA with IG/FB deep links
- [ ] Build product info layout (price, description, badges)
- [ ] Build related products section
- [ ] Build breadcrumb navigation
- [ ] Build contact page
- [ ] Generate SEO metadata for product pages
- [ ] Test deep links on mobile (IG app, Messenger)
- [ ] Verify Portable Text rendering

## Success Criteria
- Product detail page renders with all info from Sanity
- Image gallery works (thumbnail click → main image swap)
- IG link opens Instagram profile/app
- FB Messenger link opens with pre-filled product message
- Related products show from same category
- Contact page displays shop info + social links
- OG meta tags correct for social sharing

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| IG deep link doesn't open app | 3 | 2 | 6 | Fallback to web URL, test on iOS + Android |
| FB Messenger pre-filled text encoding | 2 | 2 | 4 | URL-encode Vietnamese characters properly |
| Image gallery performance | 2 | 3 | 6 | Lazy load thumbnails, optimize sizes |
