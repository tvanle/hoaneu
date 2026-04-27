# Research Report: next-intl Setup with Next.js 15 App Router

## Summary
next-intl is the industry-standard i18n library for Next.js App Router, offering native TypeScript support and flexible routing. For a bilingual Vietnamese/English product catalog site, follow locale-prefixed routing (`/vi/...`, `/en/...`), use `defineRouting()` + middleware for locale detection, and integrate with Sanity via document-level localization or field-level translation plugins.

---

## 1. Core Setup (Next.js 15 App Router)

### File Structure
```
project/
├── messages/
│   ├── en.json
│   └── vi.json
├── src/
│   ├── i18n/
│   │   ├── routing.ts         # defineRouting config
│   │   └── request.ts         # getRequestConfig for server
│   └── app/
│       ├── [locale]/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── products/
│       │       └── page.tsx
│       └── middleware.ts       # (Next.js 15)
├── next.config.ts
└── .env.local                  # NEXT_PUBLIC_DEFAULT_LOCALE
```

### routing.ts
```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'  // /en/... only when not default
});
```

### middleware.ts (Next.js 15)
```typescript
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```
- Handles locale negotiation (URL prefix → cookie → accept-language header → default)
- Skips API routes, static assets, and Next.js internals

### request.ts
```typescript
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../../messages/${locale}.json`)).default
}));
```

### next.config.ts
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  // other config
});
```

---

## 2. Message Files (JSON Structure)

### messages/en.json
```json
{
  "common": {
    "home": "Home",
    "products": "Products",
    "contact": "Contact"
  },
  "catalog": {
    "title": "Our Products",
    "price": "Price",
    "addToCart": "Add to Cart"
  }
}
```

### messages/vi.json
```json
{
  "common": {
    "home": "Trang Chủ",
    "products": "Sản Phẩm",
    "contact": "Liên Hệ"
  },
  "catalog": {
    "title": "Sản Phẩm Của Chúng Tôi",
    "price": "Giá",
    "addToCart": "Thêm Vào Giỏ"
  }
}
```

**Best practice:** Use namespaced keys (`common.home`) for organization; avoid flat structures for large catalogs.

---

## 3. Sanity CMS Integration

### Option A: Document-Level Localization (Recommended for Product Catalog)
Each language = separate document with `language` field:
```typescript
export const product = {
  name: 'product',
  type: 'document',
  fields: [
    {name: 'language', type: 'string', options: {list: ['en', 'vi']}},
    {name: 'title', type: 'string'},
    {name: 'description', type: 'text'},
    {name: 'price', type: 'number'},
    {name: '_translations', type: 'array', of: [{type: 'reference', to: [{type: 'product'}]}]}
  ]
};
```
- **Pros:** Clean CMS UI, language-independent queries, flexibility
- **Cons:** More documents, manual reference management

### Option B: Field-Level Localization
Use `@sanity/document-internationalization` plugin:
```typescript
import {documentInternationalization} from '@sanity/document-internationalization';

export const config: Config = {
  plugins: [
    documentInternationalization({
      supportedLanguages: ['en', 'vi'],
      defaultLanguageId: 'en'
    })
  ]
};
```
- **Pros:** Single document per product, simpler schema
- **Cons:** Heavier CMS UI, all translations in one document

### Fetching in Next.js
```typescript
export default async function ProductPage({params}: {params: {locale: string}}) {
  const locale = params.locale === 'vi' ? 'vi' : 'en';
  const product = await sanityClient.fetch(`*[_type == "product" && language == "${locale}"][0]`);
  // ...
}
```

---

## 4. URL Patterns & Locale Switching

### Dynamic Links in Components
```typescript
import {useRouter} from 'next-intl/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  
  return (
    <>
      <button onClick={() => router.push('/', {locale: 'en'})}>English</button>
      <button onClick={() => router.push('/', {locale: 'vi'})}>Tiếng Việt</button>
    </>
  );
}
```

### Static Links (No Re-renders)
```typescript
import {Link} from 'next-intl/navigation';

export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
    </nav>
  );
}
```
- Automatically adds locale prefix based on current locale

---

## 5. SEO: hreflang & Meta Tags

### generateMetadata() with hreflang
```typescript
import {Metadata} from 'next';

export async function generateMetadata({params}: 
  {params: Promise<{locale: string}>}
): Promise<Metadata> {
  const {locale} = await params;
  
  return {
    title: locale === 'vi' ? 'Sản Phẩm' : 'Products',
    description: locale === 'vi' 
      ? 'Khám phá sản phẩm chất lượng cao' 
      : 'Discover high-quality products',
    alternates: {
      canonical: `https://yourdomain.com/${locale === 'en' ? '' : 'vi/'}products`,
      languages: {
        en: 'https://yourdomain.com/products',
        vi: 'https://yourdomain.com/vi/products',
        'x-default': 'https://yourdomain.com/products'
      }
    },
    openGraph: {
      url: `https://yourdomain.com/${locale === 'en' ? '' : 'vi/'}products`,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US'
    }
  };
}
```

### For Static Generation
```typescript
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
```

---

## 6. Common Pitfalls & Solutions

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Missing `[locale]` folder | Routes don't work | Ensure ALL pages are inside `app/[locale]/` |
| NEXT_LOCALE cookie stale | Wrong locale on page load (dev) | Clear cookies in DevTools during testing |
| Middleware not imported correctly | Locale detection fails | Use `createMiddleware` from `next-intl/middleware` |
| No `generateStaticParams()` | Build errors with SSG | Add to root layout for all locale routes |
| Sanity queries not locale-aware | Content mixes languages | Filter by `language` or use separate documents |
| hreflang URLs don't match actual routes | SEO issues, crawl errors | Verify URL structure matches `localePrefix` setting |
| Client-only `useTranslations()` in Server Components | Runtime error | Use `getTranslations()` from `next-intl/server` instead |

---

## 7. Next.js 15 Specifics

- **Middleware:** Still named `middleware.ts` (unlike Next.js 16's `proxy.ts`)
- **Type errors at build:** Refer to [next-intl migration guide](https://next-intl.dev/docs/getting-started/app-router) for Next15 workarounds
- **Edge runtime:** Middleware runs on edge; use `getRequestConfig()` for Node context

---

## Sources

- [next-intl Official Docs: App Router Setup](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl Routing Configuration](https://next-intl.dev/docs/routing/setup)
- [next-intl Middleware & Request Config](https://next-intl.dev/docs/routing/middleware)
- [Build with Matija: next-intl Setup Guide](https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025)
- [Sanity CMS Localization](https://www.sanity.io/docs/studio/localization)
- [next-intl + Sanity Integration (GitHub Discussion)](https://github.com/amannn/next-intl/discussions/458)
- [hreflang & SEO with next-intl](https://www.buildwithmatija.com/blog/nextjs-advanced-seo-multilingual-canonical-tags)
- [App Router Best Practices (Vercel Blog)](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them)
