import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? (isProd ? "/lux-agent-website" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: siteBasePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khyzmyvrfjwwnbvwfhhk.supabase.co",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
