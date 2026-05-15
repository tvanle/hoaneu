/**
 * Script to seed multiple test images for each product in Sanity.
 *
 * Usage:
 *   SANITY_API_TOKEN=<token> node scripts/seed-product-images.mjs
 *
 * This script:
 * 1. Downloads flower images from Unsplash (free, no API key needed)
 * 2. Uploads them to Sanity as assets
 * 3. Patches every product to populate the `images` gallery array
 */

import { createClient } from "@sanity/client";
import { Buffer } from "node:buffer";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_TOKEN env var");
  process.exit(1);
}

const client = createClient({
  projectId: "fe570lb6",
  dataset: "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// Free Unsplash source URLs — redirects to actual image
const FLOWER_URLS = [
  "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", // roses
  "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80", // tulips
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80", // bouquet
  "https://images.unsplash.com/photo-1518882570329-6f3a2a6e20b2?w=800&q=80", // pink flowers
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80", // purple flowers
  "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80", // sunflowers
  "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80", // white flowers
  "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=800&q=80", // mixed bouquet
];

const ALT_TEXTS = [
  "Hoa hồng đỏ tươi",
  "Hoa tulip nhiều màu",
  "Bó hoa cưới sang trọng",
  "Hoa hồng phấn nhẹ nhàng",
  "Hoa tím lãng mạn",
  "Hoa hướng dương rực rỡ",
  "Hoa trắng tinh khôi",
  "Bó hoa nhiều loại hoa",
];

async function downloadImage(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadImage(buffer, filename) {
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/jpeg",
  });
  return asset._id;
}

async function main() {
  console.log("Downloading and uploading flower images...");

  const assetIds = [];
  for (let i = 0; i < FLOWER_URLS.length; i++) {
    const url = FLOWER_URLS[i];
    console.log(`  [${i + 1}/${FLOWER_URLS.length}] Downloading...`);
    const buffer = await downloadImage(url);
    console.log(`  [${i + 1}/${FLOWER_URLS.length}] Uploading to Sanity...`);
    const assetId = await uploadImage(buffer, `flower-test-${i + 1}.jpg`);
    assetIds.push({ assetId, alt: ALT_TEXTS[i] });
    console.log(`  [${i + 1}/${FLOWER_URLS.length}] Done: ${assetId}`);
  }

  console.log(`\nUploaded ${assetIds.length} images. Now patching products...\n`);

  const products = await client.fetch(`*[_type == "product"]{ _id, title }`);
  console.log(`Found ${products.length} products.\n`);

  for (const product of products) {
    // Each product gets 4-6 random images from the pool
    const count = 4 + Math.floor(Math.random() * 3); // 4, 5, or 6
    const shuffled = [...assetIds].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    const images = selected.map(({ assetId, alt }) => ({
      _type: "image",
      _key: crypto.randomUUID().slice(0, 8),
      asset: { _type: "reference", _ref: assetId },
      alt,
    }));

    await client
      .patch(product._id)
      .set({ images })
      .commit();

    console.log(`  ✓ ${product.title} — ${count} images added`);
  }

  console.log("\nDone! All products now have gallery images.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
