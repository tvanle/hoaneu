/**
 * Import products from data/sheets/input-sp.csv into Neon DB.
 *
 * Behavior:
 * - Truncates product_images, products, categories first (replaces seed data).
 * - Re-creates 5 categories per sitemap.
 * - Inserts 209 real products from the CSV.
 * - For each product with a Google Drive link, stores the displayable
 *   lh3.googleusercontent.com URL as the main image.
 *
 * Usage:
 *   npx tsx scripts/import-from-sheet.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { parse } from "csv-parse/sync";
import { readFileSync } from "node:fs";
import { config } from "dotenv";

import * as schema from "../db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const CATEGORIES = [
  { title: "Hoa Cưới Cầm Tay", slug: "hoa-cuoi-cam-tay", order: 1 },
  { title: "Pre-wedding", slug: "pre-wedding", order: 2 },
  { title: "Đèn Hoa Cưới", slug: "den-hoa-cuoi", order: 3 },
  { title: "Hoa Lụa", slug: "hoa-lua", order: 4 },
  { title: "Sản Phẩm Khác", slug: "san-pham-khac", order: 5 },
];

function categoryForPrefix(prefix: string): string {
  if (prefix === "HNBOX" || prefix === "HNGIO") return "san-pham-khac";
  return "hoa-cuoi-cam-tay";
}

function driveIdFromLink(link: string): string | null {
  const m = link.match(/\/file\/d\/([^/]+)/);
  return m ? m[1] : null;
}

function splitList(s: string | undefined): string[] {
  if (!s) return [];
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function parsePrice(raw: string | undefined): number {
  if (!raw) return 0;
  const n = parseInt(raw.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? n * 1000 : 0;
}

type Row = {
  STT: string;
  "LINK DRIVE": string;
  "TÊN": string;
  "GIÁ": string;
  "TONE MÀU": string;
  "HOA CHÍNH": string;
  "KIỂU DÁNG": string;
  "GIÁ _ LAN": string;
};

async function main() {
  const csv = readFileSync("data/sheets/input-sp.csv", "utf8");
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Row[];

  const products = rows.filter((r) => r["TÊN"]?.trim());
  console.log(`Parsed ${products.length} products from CSV`);

  console.log("\nWiping existing data...");
  await db.delete(schema.productImages);
  await db.delete(schema.products);
  await db.delete(schema.categories);
  console.log("  ✓ Cleared");

  console.log("\nInserting categories...");
  const insertedCats = await db
    .insert(schema.categories)
    .values(CATEGORIES)
    .returning();
  const catMap = new Map(insertedCats.map((c) => [c.slug, c.id]));
  console.log(`  ✓ ${insertedCats.length} categories`);

  console.log("\nInserting products...");
  let okCount = 0;
  for (const r of products) {
    const code = r["TÊN"].trim();
    const prefix = code.split("-")[0];
    const categorySlug = categoryForPrefix(prefix);
    const categoryId = catMap.get(categorySlug)!;

    const driveId = driveIdFromLink(r["LINK DRIVE"] || "");
    const imageUrl = driveId
      ? `https://lh3.googleusercontent.com/d/${driveId}=w1200`
      : null;

    const [inserted] = await db
      .insert(schema.products)
      .values({
        title: code,
        slug: code.toLowerCase(),
        price: parsePrice(r["GIÁ _ LAN"] || r["GIÁ"]),
        categoryId,
        colorTones: splitList(r["TONE MÀU"]),
        flowerTypes: splitList(r["HOA CHÍNH"]),
        description: r["KIỂU DÁNG"]?.trim() || null,
      })
      .returning({ id: schema.products.id });

    if (imageUrl) {
      await db.insert(schema.productImages).values({
        productId: inserted.id,
        url: imageUrl,
        alt: code,
        isMain: true,
        order: 0,
      });
    }

    okCount++;
    if (okCount % 25 === 0) console.log(`  ${okCount}/${products.length}`);
  }
  console.log(`  ✓ ${okCount} products + images`);

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
