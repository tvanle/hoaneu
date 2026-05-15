/**
 * Seed script for Neon Postgres database.
 *
 * Usage:
 *   npx tsx scripts/seed-neon.ts
 *
 * Requires DATABASE_URL in .env.local
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const CATEGORIES = [
  { title: "Hoa Cưới Cầm Tay", slug: "hoa-cuoi-cam-tay", order: 1 },
  { title: "Pre-wedding", slug: "pre-wedding", order: 2 },
  { title: "Đèn Hoa Cưới", slug: "den-hoa-cuoi", order: 3 },
  { title: "Hoa Lụa", slug: "hoa-lua", order: 4 },
  { title: "Sản Phẩm Khác", slug: "san-pham-khac", order: 5 },
];

const PRODUCTS = [
  {
    title: "Elegant Rose",
    slug: "elegant-rose",
    price: 1500000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["hong", "trang"],
    flowerTypes: ["hong"],
    isBestSeller: true,
    bestSellerOrder: 1,
    description: "Bó hoa hồng thanh lịch với tông trắng hồng pastel, phù hợp cho cô dâu yêu sự nhẹ nhàng.",
  },
  {
    title: "Garden Peony",
    slug: "garden-peony",
    price: 2200000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["hong", "trang"],
    flowerTypes: ["mau-don"],
    isBestSeller: true,
    bestSellerOrder: 2,
    description: "Thiết kế mẫu đơn vườn với form dáng tự nhiên, cảm hứng từ vườn hoa Anh.",
  },
  {
    title: "White Orchid Cascade",
    slug: "white-orchid-cascade",
    price: 2800000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["trang"],
    flowerTypes: ["lan"],
    isBestSeller: true,
    bestSellerOrder: 3,
    description: "Bó hoa lan trắng dạng thác, tạo dáng duyên dáng và sang trọng.",
  },
  {
    title: "Sunset Tulip",
    slug: "sunset-tulip",
    price: 1800000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["cam", "vang"],
    flowerTypes: ["tulip"],
    isBestSeller: true,
    bestSellerOrder: 4,
    description: "Tulip tông hoàng hôn, ấm áp và lãng mạn cho tiệc cưới mùa thu.",
  },
  {
    title: "Hydrangea Dream",
    slug: "hydrangea-dream",
    price: 1600000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["xanh", "tim"],
    flowerTypes: ["cam-tu-cau"],
    isBestSeller: true,
    bestSellerOrder: 5,
    description: "Cẩm tú cầu xanh tím, mang không khí của những khu vườn Pháp.",
  },
  {
    title: "Baby Breath Cloud",
    slug: "baby-breath-cloud",
    price: 900000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["trang"],
    flowerTypes: ["baby"],
    isBestSeller: true,
    bestSellerOrder: 6,
    description: "Bó baby trắng tinh khôi, đơn giản nhưng đầy tinh tế.",
  },
  {
    title: "Royal Lily",
    slug: "royal-lily",
    price: 2000000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["trang", "hong"],
    flowerTypes: ["ly"],
    description: "Hoa ly hoàng gia, form dáng cổ điển dành cho cô dâu yêu sự trang trọng.",
  },
  {
    title: "Pre-wedding Rose Garden",
    slug: "pre-wedding-rose-garden",
    price: 3500000,
    categorySlug: "pre-wedding",
    colorTones: ["hong", "do"],
    flowerTypes: ["hong"],
    description: "Set hoa pre-wedding với hàng trăm bông hồng, tạo backdrop chụp ảnh tuyệt đẹp.",
  },
  {
    title: "Đèn Hoa Lãng Mạn",
    slug: "den-hoa-lang-man",
    price: 4500000,
    categorySlug: "den-hoa-cuoi",
    colorTones: ["trang", "vang"],
    flowerTypes: ["hong", "baby"],
    description: "Đèn hoa kết hợp LED ấm và hoa tươi, trang trí lối đi tiệc cưới.",
  },
  {
    title: "Hoa Lụa Cổ Điển",
    slug: "hoa-lua-co-dien",
    price: 1200000,
    categorySlug: "hoa-lua",
    colorTones: ["hong", "trang"],
    flowerTypes: ["hong", "mau-don"],
    description: "Bó hoa lụa phong cách cổ điển, giữ mãi vẻ đẹp.",
  },
  {
    title: "Mixed Bouquet",
    slug: "mixed-bouquet",
    price: 1400000,
    categorySlug: "san-pham-khac",
    colorTones: ["pastel"],
    flowerTypes: ["hong", "cuc", "baby"],
    description: "Bó hoa hỗn hợp nhiều loại, tone pastel nhẹ nhàng cho mọi dịp.",
  },
  {
    title: "Chrysanthemum Elegance",
    slug: "chrysanthemum-elegance",
    price: 1100000,
    categorySlug: "san-pham-khac",
    colorTones: ["vang", "trang"],
    flowerTypes: ["cuc"],
    description: "Cúc vàng thanh lịch, phù hợp trang trí bàn tiệc và sự kiện.",
  },
  {
    title: "Purple Romance",
    slug: "purple-romance",
    price: 1900000,
    categorySlug: "hoa-cuoi-cam-tay",
    colorTones: ["tim"],
    flowerTypes: ["hong", "cam-tu-cau"],
    description: "Hoa tím lãng mạn, sự kết hợp giữa hồng và cẩm tú cầu tím.",
  },
];

async function main() {
  console.log("Seeding categories...");
  const insertedCategories = await db
    .insert(schema.categories)
    .values(CATEGORIES)
    .returning();
  console.log(`  ✓ ${insertedCategories.length} categories`);

  const categoryMap = new Map(
    insertedCategories.map((c) => [c.slug, c.id]),
  );

  console.log("Seeding products...");
  for (const p of PRODUCTS) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) {
      console.error(`  ✗ Category not found: ${p.categorySlug}`);
      continue;
    }

    await db.insert(schema.products).values({
      title: p.title,
      slug: p.slug,
      price: p.price,
      categoryId,
      colorTones: p.colorTones,
      flowerTypes: p.flowerTypes,
      isBestSeller: p.isBestSeller || false,
      bestSellerOrder: p.bestSellerOrder || null,
      description: p.description,
    });
    console.log(`  ✓ ${p.title}`);
  }

  console.log("\nSeeding site settings...");
  await db.insert(schema.siteSettings).values({
    shopName: "Hoa Nêu",
    heroTitle: "Hoa Nêu",
    heroSubtitle: "Nâng tầm ngày trọng đại của bạn",
    phone: "0974 594 751",
    address: "160-162 Yên Lãng, Đống Đa, Hà Nội",
    instagramUrl: "https://www.instagram.com/hoaneu_/",
    facebookUrl: "https://www.facebook.com/hoaneu",
  });
  console.log("  ✓ Site settings");

  console.log("\nDone! Database seeded successfully.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
