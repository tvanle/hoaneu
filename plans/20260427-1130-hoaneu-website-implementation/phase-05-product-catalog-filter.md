# Phase 5: Product Catalog & Filter

## Overview
- **Priority:** Critical
- **Status:** Pending
- **Effort:** M (3d)
- **Deps:** Phase 2 (schemas), Phase 3 (layout)

Build category pages with product listing and client-side filter system.

## Key Insights
- From sitemap: "Loc sp theo filter (gia, tone mau, hoa chinh)"
- Filter is client-side (React state) — no server roundtrip
- Products fetched server-side, filtered client-side
- Category pages: Hoa cuoi cam tay, Pre-wedding, Den hoa cuoi, Hoa lua, San pham khac
- "San pham khac" has subcategories: Tiec anni, Cau hon, Hoa dam ngo, Xe cuoi, Phong cuoi, Decor dam cuoi

## Filter System Design

### Filter Criteria
1. **Price Range** — predefined ranges:
   - Duoi 500K
   - 500K - 1tr
   - 1tr - 2tr
   - 2tr - 5tr
   - Tren 5tr
2. **Color Tone** — multi-select:
   - Trang (White), Do (Red), Hong (Pink), Vang (Yellow), Tim (Purple), Xanh (Green), Cam (Orange)
3. **Flower Type** — multi-select:
   - Hong (Rose), Lan (Orchid), Cuc (Chrysanthemum), Tulip, Mau Don (Peony), Ly (Lily), etc.

### Filter UX
- Sidebar on desktop (left, sticky)
- Bottom sheet / dropdown on mobile
- Real-time filtering (no submit button)
- Show result count
- Clear all / clear per filter
- URL params sync (for shareable links)

## Pages to Build

### Category Page (`app/[locale]/[category]/page.tsx`)
Dynamic route matching category slugs:
- `/vi/hoa-cuoi-cam-tay`
- `/vi/pre-wedding`
- `/vi/den-hoa-cuoi`
- `/vi/hoa-lua`
- `/vi/san-pham-khac`

Server component fetches products for category, passes to client filter.

### Subcategory handling
"San pham khac" subcategories rendered as tabs or filter chips within the page, not separate routes.

## Components to Build

### `components/product-grid.tsx` (Server)
- Fetches products by category
- Passes to `FilterableProductList` client component

### `components/filterable-product-list.tsx` (Client)
- `"use client"`
- Receives all products as props
- Manages filter state
- Renders filtered product grid
- URL search params sync

### `components/product-filter.tsx` (Client)
- Price range buttons (single select)
- Color tone checkboxes (multi-select)
- Flower type checkboxes (multi-select)
- Active filter count badge
- Clear filters button
- Mobile: collapsible or bottom sheet

### `components/filter-chip.tsx`
- Small pill showing active filter
- Click to remove

### `components/product-count.tsx`
- "Hien thi X san pham"

## Implementation Steps

1. Create category page route
   - `app/[locale]/[category]/page.tsx`
   - `generateStaticParams()` for all category slugs x locales
   - Fetch products by category from Sanity

2. Build ProductFilter component
   - Price range selector (radio-style buttons)
   - Color tone multi-select (checkboxes with color swatches)
   - Flower type multi-select (checkboxes)
   - Clear all functionality

3. Build FilterableProductList component
   - Client component with `useState` for filters
   - Filter logic: intersection of all active filters
   - URL params sync with `useSearchParams`
   - Empty state: "Khong tim thay san pham phu hop"

4. Build responsive filter layout
   - Desktop: sidebar (sticky, left)
   - Mobile: filter button → bottom sheet or dropdown panel

5. Build product grid layout
   - 3-col desktop, 2-col tablet, 1-col mobile (or 2-col)
   - Reuse ProductCard from Phase 4
   - Loading skeleton for initial load

6. Handle "San pham khac" subcategories
   - Tab/chip navigation within page
   - Filter by subcategory tag

## GROQ Queries

```groq
// Products by category
*[_type == 'product' && category->slug.current == $categorySlug && language == $locale] | order(_createdAt desc) {
  _id, title, slug, price, priceNote,
  mainImage { asset->, alt },
  colorTones, flowerTypes,
  category-> { title, slug }
}

// Filter options (distinct values)
{
  "colorTones": array::unique(*[_type == 'product' && language == $locale].colorTones[]),
  "flowerTypes": array::unique(*[_type == 'product' && language == $locale].flowerTypes[])
}
```

## Related Code Files
- **Create:** `app/[locale]/[category]/page.tsx`, `components/filterable-product-list.tsx`, `components/product-filter.tsx`, `components/product-grid.tsx`, `components/filter-chip.tsx`, `components/product-count.tsx`
- **Modify:** `lib/queries/products.ts`

## Todo
- [ ] Create category page route with generateStaticParams
- [ ] Write GROQ queries for category products
- [ ] Build ProductFilter component (price, color, flower type)
- [ ] Build FilterableProductList (client-side filtering)
- [ ] Implement URL params sync for shareable filter links
- [ ] Build responsive filter layout (sidebar vs bottom sheet)
- [ ] Handle "San pham khac" subcategories
- [ ] Build empty state UI
- [ ] Test filtering with sample data
- [ ] Verify mobile filter UX

## Success Criteria
- Category pages load with products from Sanity
- All 3 filter types work correctly (price, color, flower)
- Filters combine with AND logic
- URL params reflect active filters (shareable)
- Mobile filter UX is smooth
- Empty state shows when no products match
- Page is fast (no server roundtrip for filtering)

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| Client-side filter with many products (100+) | 2 | 3 | 6 | Products are small objects, filtering is O(n) — acceptable |
| URL params complexity | 2 | 2 | 4 | Use simple key=value format |
| Mobile filter UX | 3 | 3 | 9 | Test on real device, iterate |
