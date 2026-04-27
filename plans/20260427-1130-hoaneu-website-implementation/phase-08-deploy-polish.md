# Phase 8: Deploy & Polish

## Overview
- **Priority:** High
- **Status:** Pending
- **Effort:** S (1d)
- **Deps:** Phase 7

Deploy to Vercel, configure domain, polish UI, performance optimization.

## Implementation Steps

### 1. Vercel Deployment
- Connect GitHub repo to Vercel
- Configure environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN`
  - `SANITY_WEBHOOK_SECRET`
- Deploy and verify build succeeds

### 2. Domain Configuration
- Add `hoaneu.com` / `hoaneu.vn` to Vercel
- Configure DNS records
- Enable HTTPS (automatic via Vercel)

### 3. Sanity Webhook Setup
- Create webhook in Sanity dashboard
- Point to `https://hoaneu.com/api/revalidate`
- Set secret matching `SANITY_WEBHOOK_SECRET`
- Filter: trigger on product/category/siteSettings changes

### 4. Performance Optimization
- Verify Lighthouse scores (target: 90+ all categories)
- Image lazy loading (non-critical images)
- Font preloading for critical fonts
- Bundle analysis — remove unused dependencies

### 5. UI Polish
- Verify all pages at breakpoints: 375px, 768px, 1024px, 1440px
- Check dark text contrast on white bg (WCAG AA)
- Verify touch targets 44px+ on mobile
- Smooth page transitions
- Loading states / skeletons for dynamic content
- 404 page with navigation back

### 6. Cross-Browser Testing
- Chrome, Safari, Firefox (desktop)
- Chrome, Safari (mobile — iOS + Android)
- Verify IG/FB deep links on mobile browsers

### 7. Analytics (Optional)
- Vercel Analytics (built-in, free)
- Or Google Analytics 4

## Related Code Files
- **Create:** `app/not-found.tsx`, `vercel.json` (if needed)
- **Modify:** `next.config.ts` (performance headers)

## Todo
- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Connect domain(s)
- [ ] Setup Sanity webhook for revalidation
- [ ] Run Lighthouse audit
- [ ] Fix performance issues (if any)
- [ ] Cross-browser testing
- [ ] Mobile deep link testing (IG/FB)
- [ ] Create 404 page
- [ ] Verify all pages render correctly in production
- [ ] Enable Vercel Analytics

## Success Criteria
- Site live at hoaneu.com
- Lighthouse: 90+ Performance, Accessibility, Best Practices, SEO
- Sanity webhook triggers revalidation on content changes
- HTTPS enabled
- All pages render correctly across browsers
- Deep links work on mobile

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| Domain DNS propagation delay | 2 | 2 | 4 | Test with Vercel preview URL first |
| Webhook configuration errors | 2 | 3 | 6 | Test webhook with Sanity CLI before production |
| Performance below target | 2 | 3 | 6 | Image optimization, font subsetting, bundle analysis |
