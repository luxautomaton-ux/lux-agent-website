interface AssetBinding {
  fetch(request: Request): Promise<Response>
}

interface Env {
  ASSETS: AssetBinding
}

const LEGACY_PREFIX = "/lux-agent-website"

const PATH_ALIASES: Record<string, string> = {
  "/desktop": "/products/desktop",
  "/usb": "/products/usb",
  "/viewer": "/products/viewer",
  "/builder": "/build",
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const hostname = url.hostname.toLowerCase()

    // Viewer is a distinct experience inside the MyLuxAgent.com family,
    // not a separate paid domain.
    if (hostname === "viewer.myluxagent.com") {
      const target = new URL("/products/viewer", "https://myluxagent.com")
      target.search = url.search
      return Response.redirect(target.toString(), 308)
    }

    const alias = PATH_ALIASES[url.pathname.replace(/\/$/, "") || "/"]
    if (alias) {
      const target = new URL(alias, "https://myluxagent.com")
      target.search = url.search
      return Response.redirect(target.toString(), 308)
    }

    // GitHub Pages historically served this site under /lux-agent-website.
    // Keep those asset URLs working at the canonical MyLuxAgent.com origin.
    if (url.pathname === LEGACY_PREFIX) {
      url.pathname = "/"
    } else if (url.pathname.startsWith(`${LEGACY_PREFIX}/`)) {
      url.pathname = url.pathname.slice(LEGACY_PREFIX.length)
    }

    return env.ASSETS.fetch(new Request(url, request))
  },
}
