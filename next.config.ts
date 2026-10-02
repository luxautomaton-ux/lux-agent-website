import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/lux-agent-website",
  assetPrefix: "/lux-agent-website/",
  allowedDevOrigins: ["127.0.0.1", "localhost", "10.0.0.33"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
