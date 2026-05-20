/**
 * Re-sync kiểu dáng (currently stored in products.description) from the
 * latest sheet, then fill any null/empty shape with a random valid value
 * drawn from the observed distribution (weighted by frequency).
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { parse } from "csv-parse/sync";
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { config } from "dotenv";
import * as schema from "../db/schema";

config({ path: ".env.local" });
const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

type Row = { "TÊN": string; "KIỂU DÁNG": string };

const VALID_SHAPES = new Set([
  "Bó dáng rủ",
  "Bó dáng ngắn",
  "Hoa dạng vòng",
  "Bó tròn",
  "Quạt hoa",
]);

(async () => {
  const csv = readFileSync("data/sheets/input-sp.csv", "utf8");
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Row[];

  // Build code -> sheet shape map
  const sheetShape = new Map<string, string>();
  for (const r of rows) {
    const code = r["TÊN"]?.trim();
    const shape = r["KIỂU DÁNG"]?.trim();
    if (code && shape) sheetShape.set(code, shape);
  }
  console.log(`Sheet rows with code+shape: ${sheetShape.size}`);

  // Fetch all DB products
  const all = await db.select().from(schema.products);
  console.log(`DB products: ${all.length}`);

  // Re-sync from sheet
  let syncedCount = 0;
  let mismatchCount = 0;
  for (const p of all) {
    const fromSheet = sheetShape.get(p.title);
    if (fromSheet && fromSheet !== p.description) {
      await db
        .update(schema.products)
        .set({ description: fromSheet })
        .where(eq(schema.products.id, p.id));
      mismatchCount++;
    }
    if (fromSheet) syncedCount++;
  }
  console.log(`Synced from sheet: ${syncedCount}  (updated ${mismatchCount})`);

  // Build weighted distribution from products that DO have a valid shape
  const refreshed = await db.select().from(schema.products);
  const weight = new Map<string, number>();
  for (const p of refreshed) {
    const d = p.description || "";
    for (const s of d.split(",").map((x) => x.trim())) {
      if (VALID_SHAPES.has(s)) weight.set(s, (weight.get(s) || 0) + 1);
    }
  }
  const pool: string[] = [];
  for (const [s, n] of weight) {
    for (let i = 0; i < n; i++) pool.push(s);
  }
  console.log("\nDistribution to draw from:");
  for (const [s, n] of [...weight.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${s}`);
  }

  // Fill empties
  const empties = refreshed.filter((p) => {
    const d = (p.description || "").trim();
    if (!d) return true;
    const parts = d.split(",").map((x) => x.trim());
    return !parts.some((s) => VALID_SHAPES.has(s));
  });
  console.log(`\nProducts needing a shape: ${empties.length}`);

  let filled = 0;
  for (const p of empties) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    await db
      .update(schema.products)
      .set({ description: pick })
      .where(eq(schema.products.id, p.id));
    filled++;
    if (filled <= 5 || filled % 10 === 0) {
      console.log(`  ${p.title}  ←  ${pick}`);
    }
  }
  console.log(`\n✓ Filled ${filled} products`);

  // Final check
  const final = await db.select().from(schema.products);
  const stillEmpty = final.filter((p) => {
    const d = (p.description || "").trim();
    if (!d) return true;
    const parts = d.split(",").map((x) => x.trim());
    return !parts.some((s) => VALID_SHAPES.has(s));
  });
  console.log(`Remaining without shape: ${stillEmpty.length}`);
})();
