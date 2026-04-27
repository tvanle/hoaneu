# Phase 1: Project Setup

## Overview
- **Priority:** Critical
- **Status:** Pending
- **Effort:** S (1d)
- **Deps:** None

Initialize Next.js 15 project with Sanity CMS, Tailwind CSS, and next-intl.

## Key Insights
- Use `create-next-app` with App Router (no Pages Router)
- Sanity v3 embedded Studio at `/admin` for single deployment
- `next-intl` plugin wraps next.config.ts
- Default locale: `vi` (Vietnamese market primary)

## Architecture

```
hoaneu/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── admin/
│       └── [[...index]]/
│           └── page.tsx
├── sanity/
│   ├── schemaTypes/
│   │   └── index.ts
│   ├── lib/
│   │   ├── client.ts
│   │   └── image.ts
│   └── sanity.config.ts
├── messages/
│   ├── vi.json
│   └── en.json
├── src/
│   └── i18n/
│       ├── routing.ts
│       └── request.ts
├── components/
│   └── (shared UI components)
├── lib/
│   └── queries/
│       └── products.ts
├── public/
│   └── fonts/
├── tailwind.config.ts
├── next.config.ts
└── .env.local
```

## Implementation Steps

1. Init Next.js 15 project
   ```bash
   npx create-next-app@latest hoaneu --typescript --tailwind --eslint --app --src-dir --no-import-alias
   ```

2. Install dependencies
   ```bash
   npm install next-sanity @sanity/client @sanity/image-url @sanity/vision
   npm install next-intl
   npm install -D @sanity/cli
   ```

3. Configure Tailwind with Hoa Neu palette
   - Colors: white, black, `hoa-red` (#DC143C)
   - Fonts: serif (headings), sans (body), script (logo)

4. Setup Sanity project
   - Create Sanity project via `npx sanity init`
   - Configure `sanity.config.ts`
   - Setup `sanity/lib/client.ts` with env vars
   - Setup `sanity/lib/image.ts` with image URL builder

5. Setup next-intl
   - Create `src/i18n/routing.ts` with `defineRouting()`
   - Create `src/i18n/request.ts` with `getRequestConfig()`
   - Create `middleware.ts`
   - Create `messages/vi.json` and `messages/en.json` (skeleton)
   - Wrap `next.config.ts` with `createNextIntlPlugin`

6. Setup environment variables
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=
   SANITY_WEBHOOK_SECRET=
   ```

7. Embed Sanity Studio at `/admin`
   - Create `app/admin/[[...index]]/page.tsx`

8. Configure `next.config.ts`
   - Add Sanity CDN to `images.remotePatterns`
   - Wrap with `withNextIntl`

## Related Code Files
- **Create:** `tailwind.config.ts`, `next.config.ts`, `sanity/sanity.config.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`, `src/i18n/routing.ts`, `src/i18n/request.ts`, `middleware.ts`, `messages/vi.json`, `messages/en.json`, `.env.local`, `.env.example`
- **Modify:** None (greenfield)

## Todo
- [ ] Init Next.js 15 project
- [ ] Install all dependencies
- [ ] Configure Tailwind palette + fonts
- [ ] Setup Sanity project + client
- [ ] Setup next-intl (routing, request, middleware)
- [ ] Embed Sanity Studio at /admin
- [ ] Configure next.config.ts (images, i18n)
- [ ] Create .env.example (no secrets)
- [ ] Verify dev server runs without errors

## Success Criteria
- `npm run dev` starts without errors
- `/admin` loads Sanity Studio
- `/vi` and `/en` routes work with locale switching
- Tailwind classes render correctly

## Risk Assessment

| Risk | L | I | Score | Mitigation |
|------|---|---|-------|------------|
| Sanity project creation requires account | 2 | 3 | 6 | User creates account first, provide instructions |
| next-intl + Next.js 15 compatibility | 2 | 4 | 8 | Use latest next-intl version, follow official docs |
