# Design Reference Report: Calma Miami Floral

## Summary
Calma Miami demonstrates sophisticated minimal design with **hand-written script branding**, strategic white space, and image-forward storytelling. The navigation is clean and primary-colored (red accent), product cards use asymmetric grid layouts, and hover effects are subtle. Perfect benchmark for Hoa Nêu's White/Black/Red palette.

## Layout Patterns

| Feature | Implementation |
|---------|-----------------|
| **Hero Section** | Full-width background (light pastels/photography), centered text h1 with serif emphasis |
| **Product Grid** | Responsive 3-col (desktop) → 2-col (tablet) → 1-col (mobile); Shopify grid |
| **Work Gallery** | Asymmetric masonry with varied aspect ratios (tall, square, wide) — images dominate |
| **CTAs** | Button-style links with subtle borders or solid backgrounds |

## Navigation Patterns
- **Fixed top bar**: White/transparent background, dark text/script logo, right-aligned menu (Our Work dropdown, FAQ, Event Inquiry, Order Flowers)
- **Mobile**: Hamburger menu collapses nav items into overlay
- **Hover**: Minimal — slight text color shift or underline
- **Active state**: Current page may be bolded or highlighted

## Typography

| Element | Font / Style | Tailwind Equiv |
|---------|-------------|-----------------|
| Logo | Hand-written script (cursive) | `font-serif italic text-2xl` |
| H1 (Hero) | Serif, large 2.5rem+, centered | `text-5xl md:text-6xl text-center` |
| H2 (Section) | Serif or sans, 1.875rem | `text-4xl` |
| Body Copy | Clean sans (likely -apple-system) | `font-sans text-base leading-relaxed` |
| Product Name | Small caps or uppercase | `text-sm uppercase tracking-wider` |
| Price | Regular serif, gray | `text-gray-600 text-sm` |

## Color Palette Usage

| Color | Calma Usage | Hoa Nêu Mapping |
|-------|------------|-----------------|
| White | Primary background | Keep (primary) |
| Black/Dark Gray | Text, accents | Keep (primary text) |
| Red | Call-to-action buttons, "Order Flowers" link | Red accent (primary CTA) |
| Soft pastels | Section backgrounds (blush, cream, yellow) | Consider light gray instead |
| Natural tones | Product photography dominates | Images + White/Black space |

**Pattern**: Color used sparingly; photography and white space do the visual heavy lifting.

## Product Display

**Card Structure**:
```
[Image: full-width, square/portrait ratio]
[Product Name: uppercase, small]
[Price Range: $200 - $700]
```

**Key Traits**:
- No border or drop-shadow — flat design
- Image click navigates to detail page
- Price shown below image
- Hover: subtle brightening or opacity shift (not tracked in live site due to Shopify design)

**Tailwind Classes**:
```html
<div class="bg-white">
  <img class="w-full aspect-square object-cover" />
  <h3 class="text-sm uppercase tracking-wider mt-4">Product Name</h3>
  <p class="text-gray-600 text-sm mt-2">$200.00 - $700.00</p>
</div>
```

## Animations & Micro-interactions

| Element | Behavior | Implementation |
|---------|----------|-----------------|
| **Page Load** | Fade-in of sections (subtle) | CSS `opacity` transition 0.3–0.5s |
| **Hover (Button)** | Text color or background shift | `transition-colors duration-200` |
| **Scroll** | Possible parallax on hero images | CSS background-attachment or JS |
| **Link** | Underline on hover | Tailwind `hover:underline` |
| **Menu (Mobile)** | Slide-out overlay | CSS transform + backdrop |

**Note**: Calma uses minimal animations — elegance through restraint.

## Mobile Experience

- **Responsive breakpoints**: Default (mobile), md: 768px, lg: 1024px
- **Touch targets**: Buttons 44px+ tall (WCAG)
- **Navigation**: Hamburger menu → full-screen overlay with vertical stacking
- **Product grid**: Stacks to single column on mobile
- **Hero text**: Scales down but remains centered
- **Images**: 100% width, lazy-loaded

**Tailwind Mobile-First Classes**:
```html
<!-- Mobile: 1 col, Tablet: 2 col, Desktop: 3 col -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Contact & CTA Patterns

| CTA Type | Style | Location |
|----------|-------|----------|
| **Primary ("Order Flowers")** | Solid red button or text link | Top nav, hero, footer |
| **Secondary ("Event Inquiry")** | Text link | Top nav, footer |
| **Tertiary ("View Our Work")** | Underlined text or outlined | Hero section |
| **Newsletter** | Inline form with email input + button | Footer |

**Button Classes (Hoa Nêu)**:
```html
<!-- Primary CTA -->
<a class="bg-red-600 text-white px-8 py-3 hover:bg-red-700 transition">
  Order Now
</a>

<!-- Secondary CTA -->
<a class="text-black hover:underline">Learn More</a>

<!-- Outlined -->
<a class="border border-black text-black px-6 py-2 hover:bg-black hover:text-white">
  View Gallery
</a>
```

## Key Insights for Hoa Nêu

1. **Image is King**: Calma lets product photography shine with minimal chrome. Hoa Nêu should do the same.
2. **Red as Accent**: Use red ONLY for primary CTAs (Order, Enquire), not for decorative elements.
3. **Script Logo**: Handwritten branding creates premium, artisanal perception.
4. **White Space**: Don't fear empty space — it signals luxury and sophistication.
5. **Asymmetric Layouts**: Mix grid sizes (2-col + 3-col) on home to break monotony.
6. **Typography Hierarchy**: 3–4 typeface sizes max (h1, h2, body, small). Avoid decorative fonts.
7. **Minimal Motion**: Transitions under 300ms; avoid autoplay animations.

## Recommended Tailwind Setup

**Color Palette**:
```javascript
extend: {
  colors: {
    'hoa-red': '#DC143C',  // Crimson red for CTAs
  },
  fontFamily: {
    'serif': 'Georgia, serif',
    'script': 'cursive', // Or custom font-face
  },
}
```

**Utility Classes (custom)**:
```css
@apply text-xs uppercase tracking-wider px-1 py-0.5;  /* Product labels */
@apply transition-colors duration-200;                 /* Hover effects */
@apply aspect-square object-cover;                    /* Product images */
```

---

**Sources Analyzed**:
- https://www.calma-miami.com/ (homepage, navigation, hero layout)
- https://www.calma-miami.com/work (masonry gallery)
- https://shop.calma-miami.com/ (product cards, grid layout, CTAs, mobile)
- Live screenshots captured 2026-04-27
