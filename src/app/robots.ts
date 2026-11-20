import type { MetadataRoute } from "next";
import { seoCanonical } from "@/lib/seoCanonical";

export const dynamic = "force-static";

// GitHub Pages project-scoped robots is informational; host-root robots governs crawling.
export default function robots(): MetadataRoute.Robots {
  const root = seoCanonical();
  const prefix = new URL(root).pathname.replace(/\/$/, "");
  return {
    rules: [{
      userAgent: "*",
      allow: `${prefix}/`,
      disallow: [
        `${prefix}/admin/`,
        `${prefix}/checkout/`,
        `${prefix}/license/`,
      ],
    }],
    sitemap: `${root}sitemap.xml`,
  };
}
