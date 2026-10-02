const isProd = process.env.NODE_ENV === "production";
export const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? (isProd ? "/lux-agent-website" : "");

export function prefixPath(src: string): string {
  if (!src) return "";
  if (src.startsWith("/") && basePath && !src.startsWith(basePath)) {
    return `${basePath}${src}`;
  }
  return src;
}
