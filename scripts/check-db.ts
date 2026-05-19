import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql as sqlOp } from "drizzle-orm";
import { config } from "dotenv";
import * as schema from "../db/schema";

config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  const cats = await db
    .select({
      slug: schema.categories.slug,
      title: schema.categories.title,
      count: sqlOp<number>`count(${schema.products.id})::int`,
    })
    .from(schema.categories)
    .leftJoin(
      schema.products,
      sqlOp`${schema.products.categoryId} = ${schema.categories.id}`,
    )
    .groupBy(schema.categories.id, schema.categories.slug, schema.categories.title)
    .orderBy(schema.categories.order);

  console.log("Categories:");
  for (const c of cats) console.log(`  ${c.slug.padEnd(20)} ${c.title.padEnd(25)} ${c.count} sp`);

  const sample = await db.select().from(schema.products).limit(3);
  console.log("\nSample products:");
  for (const p of sample) {
    console.log(`  ${p.title}  giá=${p.price}  tone=${p.colorTones?.join("/")}`);
  }
}

main().catch(console.error);
