# Phase 3: Layout & Navigation

## Overview
- **Priority:** High
- **Status:** Pending
- **Effort:** M (2d)
- **Deps:** Phase 1

Build root layout, header, footer, and navigation. Mobile-first responsive design.

## Key Insights (from calma-miami reference)
- Fixed top nav: white bg, script logo left, menu right
- Mobile: hamburger → full-screen overlay
- Typography: serif headings, sans body, script logo
- Color: white dominant, black text, red CTAs only
- Minimal animations (< 300ms transitions)
- White space signals luxury

## Components to Build

### 1. Root Layout (`app/[locale]/layout.tsx`)
- Load fonts (serif + sans + script)
- `NextIntlClientProvider` wrapper
- Header + main + Footer structure
- Language meta tags

### 2. Header (`components/header.tsx`)
- Fixed top, white bg, slight shadow on scroll
- Logo (left): script font "Hoa Neu" or image logo
- Nav links (right): category pages from Sanity
- Language switcher (vi/en toggle)
- Mobile: hamburger icon → slide overlay
- Height: 64px desktop, 56px mobile

### 3. Navigation Links
From sitemap:
```
Trang chu | Hoa cuoi cam tay | Pre-wedding | Den hoa cuoi | Hoa lua | San pham khac
```
- Active state: bold or underline
- Hover: subtle color shift

### 4. Mobile Menu (`components/mobile-menu.tsx`)
- Full-screen overlay with backdrop
- Vertical stacked links
- Close button (X)
- Smooth slide-in animation
- 44px+ touch targets

### 5. Footer (`components/footer.tsx`)
- Shop info: name, address
- Social links: IG + FB icons
- Language switcher
- Copyright
- Minimal design, dark or light variant

### 6. Floating Contact Bar (`components/floating-contact.tsx`)
- Fixed bottom-right position
- IG + FB circular icons
- Always visible on all pages
- Hover: scale up slightly
- Mobile: slightly smaller, same position

## Design Tokens (Tailwind)

```css
/* Colors */
--hoa-red: #DC143C
--hoa-black: #1a1a1a
--hoa-gray: #6b7280
--hoa-light: #fafafa

/* Typography */
font-serif: Georgia, 'Times New Roman', serif
font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
font-script: cursive (or custom font)

/* Spacing */
Container max-width: 1280px, px-4 md:px-8
Section padding: py-16 md:py-24
```

## Implementation Steps

1. Configure Tailwind theme
   - Add custom colors, fonts, spacing
   - Setup font loading (next/font or custom @font-face)

2. Build root layout
   - `app/[locale]/layout.tsx` with fonts, providers, metadata
   - `generateStaticParams()` for locales

3. Build Header component
   - Desktop nav with links
   - Logo (text or image)
   - Language switcher component
   - Scroll-aware shadow effect

4. Build Mobile Menu
   - Hamburger toggle
   - Overlay with animations
   - Close on link click or backdrop

5. Build Footer
   - Grid layout: info | social | legal
   - Social icons (IG + FB)

6. Build Floating Contact Bar
   - Fixed position, z-50
   - IG deep link: `https://instagram.com/hoaneu`
   - FB deep link: `https://m.me/hoaneu`

7. Create shared UI components
   - `components/ui/button.tsx` — primary (red), secondary (outlined), text
   - `components/ui/container.tsx` — max-w-7xl mx-auto px-4

## Related Code Files
- **Create:** `app/[locale]/layout.tsx`, `components/header.tsx`, `components/mobile-menu.tsx`, `components/footer.tsx`, `components/floating-contact.tsx`, `components/language-switcher.tsx`, `components/ui/button.tsx`, `components/ui/container.tsx`
- **Modify:** `tailwind.config.ts`, `app/globals.css`

## Todo
- [ ] Configure Tailwind theme (colors, fonts)
- [ ] Setup font loading
- [ ] Build root layout with providers
- [ ] Build Header (desktop)
- [ ] Build Mobile Menu (hamburger + overlay)
- [ ] Build Language Switcher
- [ ] Build Footer
- [ ] Build Floating Contact Bar
- [ ] Build shared UI components (Button, Container)
- [ ] Test responsive breakpoints (mobile/tablet/desktop)

## Success Criteria
- Header renders on all pages, fixed on scroll
- Mobile menu opens/closes smoothly
- Language switcher toggles vi/en
- Floating contact bar visible on all pages
- No layout shift on page load
- Responsive at 375px, 768px, 1024px, 1440px

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| Custom font loading delays | 2 | 2 | 4 | Use `next/font` with display=swap |
| Mobile menu z-index conflicts | 2 | 2 | 4 | Establish z-index scale early |
