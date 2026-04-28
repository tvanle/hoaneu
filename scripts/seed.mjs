#!/usr/bin/env node
/**
 * Seed script for Hoa Nêu website.
 * Uses Sanity client with token to create sample categories, products, and settings.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/seed.mjs
 */

import { createClient } from "@sanity/client";

const projectId = "fe570lb6";
const dataset = "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error(
    "Missing SANITY_TOKEN. Create one at:\nhttps://www.sanity.io/manage/project/fe570lb6/api#tokens\n(Editor or higher permission)",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// ── Categories (Vietnamese) ──
const categoriesVi = [
  {
    _id: "cat-hoa-cuoi-cam-tay",
    title: "Hoa Cưới Cầm Tay",
    slug: "hoa-cuoi-cam-tay",
    description: "Bó hoa cưới cầm tay sang trọng, thiết kế theo phong cách hiện đại",
    order: 1,
  },
  {
    _id: "cat-pre-wedding",
    title: "Pre-wedding",
    slug: "pre-wedding",
    description: "Hoa trang trí cho buổi chụp ảnh cưới ngoại cảnh",
    order: 2,
  },
  {
    _id: "cat-den-hoa-cuoi",
    title: "Đèn Hoa Cưới",
    slug: "den-hoa-cuoi",
    description: "Đèn hoa trang trí tiệc cưới lung linh",
    order: 3,
  },
  {
    _id: "cat-hoa-lua",
    title: "Hoa Lụa",
    slug: "hoa-lua",
    description: "Hoa lụa cao cấp, bền đẹp theo thời gian",
    order: 4,
  },
  {
    _id: "cat-san-pham-khac",
    title: "Sản Phẩm Khác",
    slug: "san-pham-khac",
    description: "Các sản phẩm hoa trang trí khác cho đám cưới",
    order: 5,
  },
];

// ── Categories (English) ──
const categoriesEn = [
  {
    _id: "cat-hoa-cuoi-cam-tay-en",
    title: "Bridal Bouquets",
    slug: "hoa-cuoi-cam-tay",
    description: "Luxurious hand-held bridal bouquets with modern designs",
    order: 1,
  },
  {
    _id: "cat-pre-wedding-en",
    title: "Pre-wedding",
    slug: "pre-wedding",
    description: "Flowers for outdoor pre-wedding photography",
    order: 2,
  },
  {
    _id: "cat-den-hoa-cuoi-en",
    title: "Wedding Lighting",
    slug: "den-hoa-cuoi",
    description: "Sparkling floral lights for wedding decoration",
    order: 3,
  },
  {
    _id: "cat-hoa-lua-en",
    title: "Silk Flowers",
    slug: "hoa-lua",
    description: "Premium silk flowers that last forever",
    order: 4,
  },
  {
    _id: "cat-san-pham-khac-en",
    title: "Other Products",
    slug: "san-pham-khac",
    description: "Other wedding flower decoration products",
    order: 5,
  },
];

// ── Products (Vietnamese) ──
const productsVi = [
  {
    _id: "prod-elegant-rose-vi",
    title: "Bó Hoa Hồng Elegant",
    slug: "bo-hoa-hong-elegant",
    price: 1500000,
    priceNote: "Giá từ",
    category: "cat-hoa-cuoi-cam-tay",
    colorTones: ["trang", "hong"],
    flowerTypes: ["hong", "baby"],
    isBestSeller: true,
    bestSellerOrder: 1,
    description: "Bó hoa hồng trắng và hồng pastel kết hợp baby breath, phong cách thanh lịch cho cô dâu hiện đại.",
  },
  {
    _id: "prod-peony-dream-vi",
    title: "Bó Hoa Mẫu Đơn Dream",
    slug: "bo-hoa-mau-don-dream",
    price: 2200000,
    priceNote: "Giá từ",
    category: "cat-hoa-cuoi-cam-tay",
    colorTones: ["hong", "pastel"],
    flowerTypes: ["mau-don", "hong"],
    isBestSeller: true,
    bestSellerOrder: 2,
    description: "Bó hoa mẫu đơn hồng pastel sang trọng, điểm nhấn hoàn hảo cho ngày trọng đại.",
  },
  {
    _id: "prod-classic-white-vi",
    title: "Bó Hoa Trắng Classic",
    slug: "bo-hoa-trang-classic",
    price: 1200000,
    category: "cat-hoa-cuoi-cam-tay",
    colorTones: ["trang"],
    flowerTypes: ["hong", "ly", "baby"],
    isBestSeller: true,
    bestSellerOrder: 3,
    description: "Bó hoa trắng tinh khôi với hoa hồng, hoa ly và baby breath. Cổ điển mà không bao giờ lỗi mốt.",
  },
  {
    _id: "prod-rustic-garden-vi",
    title: "Bó Hoa Rustic Garden",
    slug: "bo-hoa-rustic-garden",
    price: 1800000,
    category: "cat-hoa-cuoi-cam-tay",
    colorTones: ["cam", "vang", "hong"],
    flowerTypes: ["hong", "cuc"],
    isBestSeller: true,
    bestSellerOrder: 4,
    description: "Bó hoa phong cách rustic với tông cam vàng ấm áp, phù hợp đám cưới ngoài trời.",
  },
  {
    _id: "prod-lavender-bliss-vi",
    title: "Bó Hoa Lavender Bliss",
    slug: "bo-hoa-lavender-bliss",
    price: 1600000,
    category: "cat-hoa-cuoi-cam-tay",
    colorTones: ["tim", "pastel"],
    flowerTypes: ["cam-tu-cau", "hong"],
    isBestSeller: true,
    bestSellerOrder: 5,
    description: "Bó hoa tím lavender kết hợp cẩm tú cầu, mang đến vẻ đẹp lãng mạn và dịu dàng.",
  },
  // Pre-wedding
  {
    _id: "prod-prewedding-garden-vi",
    title: "Set Hoa Pre-wedding Garden",
    slug: "set-hoa-prewedding-garden",
    price: 2500000,
    priceNote: "Giá từ",
    category: "cat-pre-wedding",
    colorTones: ["trang", "hong", "pastel"],
    flowerTypes: ["hong", "mau-don", "baby"],
    description: "Set hoa pre-wedding phong cách vườn, bao gồm bó hoa cầm tay và hoa cài áo chú rể.",
  },
  {
    _id: "prod-prewedding-boho-vi",
    title: "Set Hoa Pre-wedding Boho",
    slug: "set-hoa-prewedding-boho",
    price: 2800000,
    category: "cat-pre-wedding",
    colorTones: ["cam", "do", "vang"],
    flowerTypes: ["hong", "cuc"],
    description: "Set hoa boho tự do, phóng khoáng với tông màu ấm cho ảnh cưới ngoại cảnh.",
  },
  // Đèn hoa cưới
  {
    _id: "prod-den-hoa-ban-tiec-vi",
    title: "Đèn Hoa Bàn Tiệc",
    slug: "den-hoa-ban-tiec",
    price: 3500000,
    priceNote: "Giá từ / bàn",
    category: "cat-den-hoa-cuoi",
    colorTones: ["trang", "vang"],
    flowerTypes: ["hong", "baby"],
    description: "Đèn hoa trang trí bàn tiệc cưới lung linh, tạo không gian ấm cúng và lãng mạn.",
  },
  {
    _id: "prod-den-hoa-loi-di-vi",
    title: "Đèn Hoa Lối Đi",
    slug: "den-hoa-loi-di",
    price: 5000000,
    priceNote: "Giá từ / cặp",
    category: "cat-den-hoa-cuoi",
    colorTones: ["trang", "hong"],
    flowerTypes: ["hong", "cam-tu-cau"],
    description: "Đèn hoa hai bên lối đi vào lễ đường, tạo không gian lộng lẫy cho cô dâu.",
  },
  // Hoa lụa
  {
    _id: "prod-hoa-lua-hong-vi",
    title: "Bó Hoa Lụa Hồng Premium",
    slug: "bo-hoa-lua-hong-premium",
    price: 900000,
    category: "cat-hoa-lua",
    colorTones: ["hong", "trang"],
    flowerTypes: ["hong"],
    description: "Bó hoa lụa hồng cao cấp, giữ nguyên vẻ đẹp suốt đời. Lưu niệm hoàn hảo cho ngày cưới.",
  },
  {
    _id: "prod-hoa-lua-tulip-vi",
    title: "Bó Hoa Lụa Tulip",
    slug: "bo-hoa-lua-tulip",
    price: 850000,
    category: "cat-hoa-lua",
    colorTones: ["do", "vang"],
    flowerTypes: ["tulip"],
    description: "Bó hoa lụa tulip rực rỡ, mang đến sắc màu tươi tắn cho mọi dịp.",
  },
  // Sản phẩm khác
  {
    _id: "prod-hoa-cai-ao-vi",
    title: "Hoa Cài Áo Chú Rể",
    slug: "hoa-cai-ao-chu-re",
    price: 350000,
    category: "cat-san-pham-khac",
    colorTones: ["trang", "do"],
    flowerTypes: ["hong"],
    description: "Hoa cài áo chú rể đồng bộ với bó hoa cô dâu, hoàn thiện vẻ ngoài ngày cưới.",
  },
  {
    _id: "prod-vong-hoa-dau-vi",
    title: "Vòng Hoa Đầu Cô Dâu",
    slug: "vong-hoa-dau-co-dau",
    price: 650000,
    category: "cat-san-pham-khac",
    colorTones: ["trang", "pastel"],
    flowerTypes: ["baby", "hong"],
    description: "Vòng hoa đầu nhẹ nhàng cho cô dâu, phong cách bohemian lãng mạn.",
  },
];

// ── Site Settings ──
const siteSettingsVi = {
  _id: "site-settings-vi",
  _type: "siteSettings",
  language: "vi",
  shopName: "Hoa Nêu",
  heroTitle: "Hoa Cưới Hoa Nêu",
  heroSubtitle: "Nâng tầm ngày trọng đại của bạn",
  instagramUrl: "https://instagram.com/hoaneu",
  facebookUrl: "https://facebook.com/hoaneu",
  phone: "0901 234 567",
  address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
};

const siteSettingsEn = {
  _id: "site-settings-en",
  _type: "siteSettings",
  language: "en",
  shopName: "Hoa Nêu",
  heroTitle: "Hoa Nêu Wedding Flowers",
  heroSubtitle: "Elevate your special day",
  instagramUrl: "https://instagram.com/hoaneu",
  facebookUrl: "https://facebook.com/hoaneu",
  phone: "0901 234 567",
  address: "123 Nguyen Hue, District 1, HCMC",
};

// ── Helper: build document ──
function buildCategory(cat, lang) {
  return {
    _id: cat._id,
    _type: "category",
    title: cat.title,
    slug: { _type: "slug", current: cat.slug },
    language: lang,
    description: cat.description,
    order: cat.order,
  };
}

function buildProduct(prod, lang) {
  return {
    _id: prod._id,
    _type: "product",
    title: prod.title,
    slug: { _type: "slug", current: prod.slug },
    language: lang,
    price: prod.price,
    priceNote: prod.priceNote || undefined,
    category: { _type: "reference", _ref: prod.category },
    colorTones: prod.colorTones,
    flowerTypes: prod.flowerTypes,
    isBestSeller: prod.isBestSeller || false,
    bestSellerOrder: prod.bestSellerOrder || undefined,
    description: [
      {
        _type: "block",
        _key: Math.random().toString(36).slice(2, 10),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: Math.random().toString(36).slice(2, 10),
            text: prod.description,
            marks: [],
          },
        ],
      },
    ],
  };
}

// ── Main ──
async function seed() {
  console.log("Seeding Hoa Nêu data...\n");

  const tx = client.transaction();

  // Site settings
  tx.createOrReplace(siteSettingsVi);
  tx.createOrReplace(siteSettingsEn);
  console.log("  + Site settings (vi + en)");

  // Categories
  for (const cat of categoriesVi) {
    tx.createOrReplace(buildCategory(cat, "vi"));
  }
  for (const cat of categoriesEn) {
    tx.createOrReplace(buildCategory(cat, "en"));
  }
  console.log(`  + ${categoriesVi.length + categoriesEn.length} categories`);

  // Products (Vietnamese only — English products can be added later)
  for (const prod of productsVi) {
    tx.createOrReplace(buildProduct(prod, "vi"));
  }
  console.log(`  + ${productsVi.length} products (vi)`);

  const result = await tx.commit();
  console.log(`\nDone! ${result.results.length} documents created.`);
  console.log("Visit https://hoaneu.vercel.app to see the result.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
