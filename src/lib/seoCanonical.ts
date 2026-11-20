const githubSite = "https://luxautomaton-ux.github.io/lux-agent-website/";

/** Match the active host: project URLs have no trailing slash on GitHub Pages. */
export function seoCanonical(pathname = ""): string {
  const root = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || githubSite).replace(/\/+$/, "");
  const path = pathname.replace(/^\/+|\/+$/g, "");
  if (!path) return `${root}/`;
  const isGitHubPages = new URL(root).hostname.endsWith(".github.io");
  return `${root}/${path}${isGitHubPages ? "" : "/"}`;
}
