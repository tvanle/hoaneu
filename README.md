# Hoa Nêu

Website for Hoa Nêu, a minimalist, modern bridal flower design studio (Vietnamese-language site).

## Features

- Home page with hero section, studio introduction and a best-sellers list
- Product catalog by category with a filterable product list (`src/components/product-filter.tsx`)
- Product detail pages (`/san-pham/[slug]`) with an image gallery
- Order/contact page (`/dat-hoa`) and a floating contact button
- Admin area (`/admin`) with login, and management of products, categories and site settings
- Image upload and watermark API routes
- `sitemap.ts` and `robots.ts` for SEO
- Data scripts in `scripts/` for seeding the database and importing products from a sheet

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Neon serverless Postgres with Drizzle ORM
- Vercel Blob for image storage, `sharp` for image processing
- `jose` + `bcryptjs` for admin authentication

## Getting started

```bash
npm install
cp .env.example .env.local   # set DATABASE_URL, BLOB_READ_WRITE_TOKEN, ADMIN_PASSWORD_HASH, AUTH_SECRET
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

The `plans/` folder holds the original implementation plans and research reports.
