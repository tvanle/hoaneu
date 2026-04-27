export interface SanityImage {
  asset?: { url?: string };
  alt?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: SanityImage;
  subcategories?: Category[];
}

export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  priceNote?: string;
  description?: unknown[];
  mainImage?: SanityImage;
  images?: SanityImage[];
  colorTones?: string[];
  flowerTypes?: string[];
  isBestSeller?: boolean;
  category?: {
    _id?: string;
    title?: string;
    slug?: { current?: string };
  };
}

export interface SiteSettings {
  shopName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  instagramUrl?: string;
  facebookUrl?: string;
  phone?: string;
  address?: string;
}
