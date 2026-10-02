import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const siteBasePath =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? (isProd ? "/lux-agent-website" : "");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: siteBasePath,
  assetPrefix: siteBasePath ? `${siteBasePath}/` : undefined,
  allowedDevOrigins: ["127.0.0.1", "localhost", "10.0.0.33"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
