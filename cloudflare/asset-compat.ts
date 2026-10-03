interface Env {
  ASSETS: Fetcher
}

const LEGACY_PREFIX = "/lux-agent-website"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // GitHub Pages historically served this site under /lux-agent-website.
    // Keep those asset URLs working when the same export is served at
    // https://myluxagent.com without forcing the old repository prefix.
    if (url.pathname === LEGACY_PREFIX) {
      url.pathname = "/"
    } else if (url.pathname.startsWith(`${LEGACY_PREFIX}/`)) {
      url.pathname = url.pathname.slice(LEGACY_PREFIX.length)
    }

    return env.ASSETS.fetch(new Request(url, request))
  },
}
