import type { MetadataRoute } from "next";
import { seoCanonical } from "@/lib/seoCanonical";
import { LUX_PRODUCTS } from "@/lib/luxProducts";

export const dynamic = "force-static";

const marketingPages = [
  "", "how-it-works", "products", "solutions", "features",
  "download", "getting-started", "store", "about", "support",
  "updates", "privacy", "terms", "resources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const products = LUX_PRODUCTS
    .filter((p) => p.status !== "Coming Soon")
    .map((p) => `products/${p.slug}`);
  return Array.from(new Set([...marketingPages, ...products])).map(
    (path) => ({ url: seoCanonical(path) })
  );
}
