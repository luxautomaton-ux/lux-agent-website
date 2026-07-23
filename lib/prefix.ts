const isProd = process.env.NODE_ENV === "production";
export const basePath = isProd ? "/Lux-Automaton-Website" : "";

export function prefixPath(src: string): string {
  if (!src) return "";
  // Only prefix local paths starting with / that don't already start with the basePath
  if (src.startsWith("/") && basePath && !src.startsWith(basePath)) {
    return `${basePath}${src}`;
  }
  return src;
}
