import { defineQuery } from "next-sanity";

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && language == $locale] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    priceNote,
    mainImage { asset->, alt },
    colorTones,
    flowerTypes,
    isBestSeller,
    category-> { _id, title, slug }
  }
`);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && category->slug.current == $categorySlug && language == $locale] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    priceNote,
    mainImage { asset->, alt },
    colorTones,
    flowerTypes,
    category-> { _id, title, slug }
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug && language == $locale][0] {
    _id,
    title,
    slug,
    price,
    priceNote,
    description,
    mainImage { asset->, alt },
    images[] { asset->, alt },
    colorTones,
    flowerTypes,
    category-> { _id, title, slug }
  }
`);

export const BEST_SELLERS_QUERY = defineQuery(`
  *[_type == "product" && isBestSeller == true && language == $locale] | order(bestSellerOrder asc) [0...$limit] {
    _id,
    title,
    slug,
    price,
    priceNote,
    mainImage { asset->, alt },
    category-> { title, slug }
  }
`);

export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && language == $locale && !defined(parentCategory)] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image { asset->, alt },
    "subcategories": *[_type == "category" && parentCategory._ref == ^._id && language == $locale] | order(order asc) {
      _id, title, slug, image { asset->, alt }
    }
  }
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug && language == $locale][0] {
    _id,
    title,
    slug,
    description,
    image { asset->, alt }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && language == $locale][0] {
    shopName,
    heroTitle,
    heroSubtitle,
    heroImage { asset->, alt },
    instagramUrl,
    facebookUrl,
    phone,
    address
  }
`);

export const RELATED_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && category._ref == $categoryId && _id != $currentId && language == $locale][0...4] {
    _id,
    title,
    slug,
    price,
    mainImage { asset->, alt }
  }
`);

export const ALL_PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product"].slug.current
`);

export const ALL_CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && !defined(parentCategory)].slug.current
`);
