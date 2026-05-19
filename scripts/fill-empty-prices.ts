/**
 * For each product with price=0, fill in a random price drawn from the
 * observed range of products with the SAME mã-prefix (HNW, HNR, ...).
 * Falls back to the global range if a prefix has no priced sample.
 *
 * Prices are rounded to the nearest 50.000đ to feel natural.
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, gt } from "drizzle-orm";
import { config } from "dotenv";
import * as schema from "../db/schema";

config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const STEP = 50_000;

function prefixOf(code: string) {
  return code.split("-")[0];
}

function randomInRange(min: number, max: number): number {
  const raw = min + Math.random() * (max - min);
  return Math.round(raw / STEP) * STEP;
}

async function main() {
  const all = await db
    .select({ id: schema.products.id, title: schema.products.title, price: schema.products.price })
    .from(schema.products);

  // Build per-prefix price stats from products that DO have a price
  const byPrefix = new Map<string, number[]>();
  for (const p of all) {
    if (p.price > 0) {
      const pref = prefixOf(p.title);
      if (!byPrefix.has(pref)) byPrefix.set(pref, []);
      byPrefix.get(pref)!.push(p.price);
    }
  }

  const allPriced = all.filter((p) => p.price > 0).map((p) => p.price);
  const globalMin = Math.min(...allPriced);
  const globalMax = Math.max(...allPriced);

  console.log("Price ranges by prefix (from existing data):");
  for (const [pref, prices] of byPrefix) {
    console.log(`  ${pref.padEnd(8)} n=${String(prices.length).padStart(3)}  min=${Math.min(...prices).toLocaleString("vi-VN")}  max=${Math.max(...prices).toLocaleString("vi-VN")}`);
  }
  console.log(`  GLOBAL   n=${allPriced.length}  min=${globalMin.toLocaleString("vi-VN")}  max=${globalMax.toLocaleString("vi-VN")}`);

  const empties = all.filter((p) => p.price === 0);
  console.log(`\nFilling ${empties.length} empty prices...\n`);

  let filled = 0;
  for (const p of empties) {
    const pref = prefixOf(p.title);
    const samples = byPrefix.get(pref);
    let min: number, max: number;
    if (samples && samples.length >= 2) {
      min = Math.min(...samples);
      max = Math.max(...samples);
    } else {
      min = globalMin;
      max = globalMax;
    }
    const newPrice = randomInRange(min, max);
    await db.update(schema.products).set({ price: newPrice }).where(eq(schema.products.id, p.id));
    filled++;
    if (filled <= 5 || filled % 25 === 0) {
      console.log(`  ${p.title}  ←  ${newPrice.toLocaleString("vi-VN")}đ  (${pref} range)`);
    }
  }

  console.log(`\n✓ Filled ${filled} products`);

  const remainingZero = await db
    .select({ count: schema.products.id })
    .from(schema.products)
    .where(eq(schema.products.price, 0));
  console.log(`Remaining with price=0: ${remainingZero.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
