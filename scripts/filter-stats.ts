import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as schema from "../db/schema";

config({ path: ".env.local" });
const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

(async () => {
  const rows = await db.select().from(schema.products);

  const tones = new Map<string, number>();
  const flowers = new Map<string, number>();
  const shapes = new Map<string, number>();
  const prices: number[] = [];

  for (const r of rows) {
    for (const t of r.colorTones || []) tones.set(t, (tones.get(t) || 0) + 1);
    for (const f of r.flowerTypes || []) flowers.set(f, (flowers.get(f) || 0) + 1);
    if (r.description) {
      // description currently holds the kiểu dáng value
      shapes.set(r.description, (shapes.get(r.description) || 0) + 1);
    }
    if (r.price > 0) prices.push(r.price);
  }

  const sorted = (m: Map<string, number>) =>
    [...m.entries()].sort((a, b) => b[1] - a[1]);

  console.log("=== TONE MÀU ===");
  for (const [k, v] of sorted(tones)) console.log(`  ${String(v).padStart(3)}  ${k}`);

  console.log("\n=== HOA CHÍNH ===");
  for (const [k, v] of sorted(flowers)) console.log(`  ${String(v).padStart(3)}  ${k}`);

  console.log("\n=== KIỂU DÁNG (in description) ===");
  for (const [k, v] of sorted(shapes)) console.log(`  ${String(v).padStart(3)}  ${k}`);

  prices.sort((a, b) => a - b);
  console.log("\n=== GIÁ ===");
  console.log(`  count: ${prices.length}`);
  console.log(`  min:   ${prices[0]?.toLocaleString("vi-VN")}đ`);
  console.log(`  max:   ${prices[prices.length - 1]?.toLocaleString("vi-VN")}đ`);
  console.log(`  median: ${prices[Math.floor(prices.length / 2)]?.toLocaleString("vi-VN")}đ`);
  const buckets = [500_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000];
  let prev = 0;
  for (const b of buckets) {
    const n = prices.filter((p) => p > prev && p <= b).length;
    console.log(`  ${(prev / 1000).toFixed(0)}K - ${(b / 1000).toFixed(0)}K: ${n}`);
    prev = b;
  }
  console.log(`  > ${(prev / 1000).toFixed(0)}K: ${prices.filter((p) => p > prev).length}`);
})();
