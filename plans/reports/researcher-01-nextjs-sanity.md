# Research Report: Next.js 15 App Router + Sanity CMS v3 Product Catalog Integration

## Summary

Next.js 15 App Router and Sanity CMS v3 form a production-ready pairing for product catalogs, with official support, type-safe GROQ queries via `next-sanity`, and Sanity's image CDN integrating directly with `next/image` for zero-config optimization. Key decisions: fetch in server components only, combine time-based + on-demand revalidation for freshness, embed Studio at `/admin` for simpler deployments, and model products as references to categories/tags rather than hardcoded relationships.

---

## 1. Project Structure (App Router + Sanity)

### Recommended Layout
```
hoaneu/
├── app/
│   ├── (product)/
│   │   ├── [slug]/
│   │   │   └── page.tsx           # Server component
│   │   └── page.tsx               # Product listing
│   ├── admin/                     # Embedded Sanity Studio
│   │   ├── [[...index]]/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── revalidate/            # On-demand revalidation webhook
│   │       └── route.ts
│   └── layout.tsx
├── sanity/
│   ├── schemaTypes/
│   │   ├── productType.ts
│   │   ├── categoryType.ts
│   │   ├── tagType.ts
│   │   └── index.ts
│   ├── lib/
│   │   └── client.ts              # Sanity client instance
│   └── sanity.config.ts
├── lib/
│   └── queries/
│       └── products.ts            # GROQ query definitions
└── .env.local (gitignored)
```

**Key principle:** Co-locate GROQ queries with page components; keep Sanity config isolated in `sanity/`.

---

## 2. Sanity Schema Design (Product Catalog)

### Product Schema Pattern
```typescript
// sanity/schemaTypes/productType.ts
export default {
  name: 'product',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'description',
      type: 'blockContent'  // Portable Text
    },
    {
      name: 'price',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
      // Multiple categories per product
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }]
    }
  ]
}
```

### Category & Tag Schemas
Use **references**, not embedded objects. Allows editors to manage categories independently and reuse across products.

```typescript
export default {
  name: 'category',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'name' } }
  ]
}
```

### Best Practices
- **No hardcoded mappings**: Reference documents instead of storing static lookup tables.
- **Array fields for multi-category**: Use `array of references` for products → categories/tags.
- **Computed fields prohibited**: Never store derived data (e.g., "product_count" on category). Compute at query time.
- **Document types as references only**: Never use `type: 'product'` as a field type; use `reference to product` instead.

---

## 3. Data Fetching: GROQ in Server Components

### Server Component Pattern (Fetch at Component Level)
```typescript
// app/(product)/page.tsx (Server Component)
import { sanityClient } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'

const PRODUCTS_QUERY = defineQuery(`
  *[_type == 'product'] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    image {
      asset->{ url },
      alt
    },
    categories[]-> {
      name,
      slug
    }
  }
`)

export default async function ProductsPage() {
  const products = await sanityClient.fetch(PRODUCTS_QUERY)
  return (
    <div>
      {products.map(p => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  )
}
```

### Single Product Page
```typescript
// app/(product)/[slug]/page.tsx
export async function generateStaticParams() {
  const query = `*[_type == 'product'].slug.current`
  const slugs = await sanityClient.fetch(query)
  return slugs.map(slug => ({ slug }))
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await sanityClient.fetch(
    defineQuery(`*[_type == 'product' && slug.current == $slug][0] { ... }`),
    { slug }
  )
  // Render product
}
```

### GROQ Best Practices
- **Explicit field projections**: Replace `*` with named fields—avoids over-fetching.
- **References using `->` operator**: `categories[]-> { name }` dereferences in one query.
- **Limit arrays**: Use `[0...5]` to cap array results (e.g., featured products).
- **N+1 prevention**: Use `->` in GROQ instead of separate queries per product.

---

## 4. Image Handling: Sanity CDN + next/image

### next.config.js Configuration
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ]
  }
}
module.exports = nextConfig
```

### Using `next-sanity` Image Component
```typescript
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

export function ProductImage({ image, alt }: { image: SanityImageAsset; alt: string }) {
  const src = urlForImage(image).url()
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      priority={false}
    />
  )
}
```

### @sanity/image-url Builder Pattern
```typescript
// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export const urlForImage = (source: any) => {
  return builder
    .image(source)
    .width(600)
    .quality(85)
    .auto('format')  // Negotiates WebP/AVIF at CDN
}
```

### Key Points
- Sanity's CDN handles resizing, format conversion (WebP, AVIF), and caching—no Next.js Image Optimization overhead.
- `auto('format')` lets Sanity CDN negotiate format based on browser Accept header.
- Images served from edge locations with automatic optimization.

---

## 5. ISR / Revalidation Strategy

### Recommended Hybrid Approach for Product Catalogs

#### Time-Based Revalidation (Safety Net)
```typescript
// app/(product)/page.tsx
export const revalidate = 3600  // 1 hour—regenerate after 1h of inactivity
```

#### On-Demand Webhook Revalidation (Immediate)
```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { verifyWebhookSignature } from '@sanity/webhook'

export async function POST(req: Request) {
  const signature = req.headers.get('sanity-webhook-signature')
  const body = await req.text()
  
  try {
    verifyWebhookSignature(signature, body, process.env.SANITY_WEBHOOK_SECRET!)
  } catch (err) {
    return new Response('Invalid signature', { status: 401 })
  }

  const payload = JSON.parse(body)
  
  // Revalidate affected paths
  if (payload._type === 'product') {
    revalidateTag('products')
    revalidateTag(`product-${payload.slug.current}`)
  }
  
  return new Response('Revalidated', { status: 200 })
}
```

#### Query Caching with Tags
```typescript
const products = await sanityClient.fetch(PRODUCTS_QUERY, {}, {
  next: { tags: ['products'] }
})
```

### Strategy Rationale
- **Time-based** (1h): Catches webhook failures, prevents stale content indefinitely.
- **On-demand**: Instant updates when editors publish in Sanity.
- **For 10K+ products**: On-demand is efficient; only affected product pages revalidate.
- **Avoid excessive revalidation**: Don't revalidate entire catalog for single product changes.

---

## 6. Sanity Studio: Embedded vs. Separate

### Embedded Approach (Recommended)
- **Route**: `/admin` in your Next.js app
- **Setup**: Add `@sanity/cli` scaffold or `SanityStudio` component in App Router
- **Benefits**: Single deployment, shared TypeScript types, no CORS issues
- **Deployment**: Studio deploys with your Next.js app (1–2 min Vercel build)

```typescript
// app/admin/[[...index]]/page.tsx
import { Studio } from 'sanity'
import { config } from '@/sanity/sanity.config'

export default function AdminPage() {
  return <Studio config={config} />
}
```

### Separate Deployment
- **Setup**: Independent Sanity project
- **Benefits**: Isolation, Studio on Sanity's hosting (sanity.io), useful for multiple frontends
- **Drawback**: Separate domain, no shared types, longer setup

### Decision Matrix
| Criteria | Embedded | Separate |
|----------|----------|----------|
| Single product catalog | ✓ Preferred | - |
| Multiple frontends (mobile, web) | - | ✓ Preferred |
| Shared TypeScript types | ✓ Easy | - Complex |
| Deployment simplicity | ✓ Simple | - More complex |
| Studio performance | ✓ Same domain | - Separate domain |

**Recommendation**: Start embedded for a product catalog unless you have multiple consuming frontends.

---

## 7. Key Packages & Versions

| Package | Latest | Purpose |
|---------|--------|---------|
| `next-sanity` | v12.3.0+ | Type-safe GROQ `defineQuery`, Portable Text renderer, `SanityStudio` component |
| `@sanity/client` | ^7.21.0 | Fetch/mutate content, configure API endpoints |
| `@sanity/image-url` | Latest | Build image URLs with transformation params |
| `@sanity/cli` | Latest | Project scaffolding, schema validation |
| `next` | 15.0.0+ | App Router, Server Components, ISR |
| `@sanity/portabletext-react` | Included in next-sanity | Render rich text blocks |

### Installation
```bash
npm install next-sanity @sanity/client @sanity/image-url @sanity/cli
```

### Sanity Client Setup
```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-01',
  useCdn: true  // CDN for reads, reduces latency
})
```

---

## Trade-Off Matrix

| Decision | Option A | Option B | Trade-Off |
|----------|----------|----------|-----------|
| **Fetching** | Server Components | Client-side | A: Simpler, no APIs needed; B: Flexible, slower |
| **Studio** | Embedded at `/admin` | Separate project | A: Single deploy, shared types; B: Isolation, multiple frontends |
| **Revalidation** | Time-based only | Time + on-demand | A: Simple, stale content risk; B: Fresh + reliable (recommended) |
| **Image Optimization** | Sanity CDN + next-sanity | Next.js Image Optimization | A: No CDN overhead, format negotiation; B: More control, adds processing |
| **GROQ** | Explicit fields | Wildcard `*` | A: Efficient, explicit; B: Simpler queries, over-fetching |

---

## Key Gotchas & Best Practices

1. **Await route params in dynamic routes**: `const { slug } = await params` (Next.js 15 change)
2. **Never fetch in client components**: Move queries to server components or API routes
3. **GROQ references**: Use `->` operator to dereference in one query, avoid N+1
4. **Image CDN configuration**: Add `cdn.sanity.io` to `remotePatterns` in next.config.js
5. **Webhook secrets**: Store `SANITY_WEBHOOK_SECRET` in environment, verify before revalidation
6. **Revalidation tags**: Use granular tags (`products`, `product-{slug}`) to avoid over-invalidating
7. **No derived fields**: Compute category counts, price ranges at query time, not on schema

---

## Sources

- [Next.js CMS - Sanity](https://www.sanity.io/nextjs-cms)
- [Integrate Sanity with Next.js | Sanity Docs](https://www.sanity.io/docs/nextjs)
- [next-sanity GitHub](https://github.com/sanity-io/next-sanity)
- [GROQ Queries Best Practices](https://www.sanity.io/learn/course/content-driven-web-application-foundations/fetch-sanity-content)
- [Sanity Image URL Rendering](https://www.sanity.io/docs/nextjs/next-sanity-image-component)
- [ISR in Next.js 15](https://nextjs.org/docs/pages/guides/incremental-static-regeneration)
- [Embedding Sanity Studio](https://www.sanity.io/docs/studio/embedding-sanity-studio)
- [Sanity Product Catalog Schema](https://www.sanity.io/ecommerce)
- [@sanity/client npm](https://www.npmjs.com/package/@sanity/client)
- [@sanity/image-url npm](https://www.npmjs.com/package/@sanity/image-url)
