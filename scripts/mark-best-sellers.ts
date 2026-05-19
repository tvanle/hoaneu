/**
 * Mark first 6 products that have BOTH a non-zero price AND a main image
 * as best sellers (in CSV/import order, which is sheet order).
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql as sqlOp, eq, asc, gt, inArray } from "drizzle-orm";
import { config } from "dotenv";
import * as schema from "../db/schema";

config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  await db.update(schema.products).set({ isBestSeller: false, bestSellerOrder: null });

  const candidates = await db
    .select({ id: schema.products.id, title: schema.products.title })
    .from(schema.products)
    .innerJoin(schema.productImages, eq(schema.productImages.productId, schema.products.id))
    .where(gt(schema.products.price, 0))
    .orderBy(asc(schema.products.id))
    .limit(6);

  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    await db
      .update(schema.products)
      .set({ isBestSeller: true, bestSellerOrder: i + 1 })
      .where(eq(schema.products.id, c.id));
    console.log(`  ${i + 1}. ${c.title}`);
  }
  console.log(`\n✓ Marked ${candidates.length} best sellers`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
