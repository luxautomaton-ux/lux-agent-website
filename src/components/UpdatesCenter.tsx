"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { starterUpdates } from "@/lib/customerContent"

type RemoteUpdate = {
  id: string
  date: string
  title: string
  product: string
  status?: string
  summary: string
  highlights?: string[]
  knowledge?: string[]
  action?: string
  version?: string
}

const P = "/lux-agent-website"
const DEFAULT_SUPPORT_API = "https://lux-agent-api-337560675313.us-west1.run.app"

function supportApiBase() {
  const configured =
    process.env.NEXT_PUBLIC_LUX_SUPPORT_API_URL ||
    process.env.NEXT_PUBLIC_LUX_SUPPORT_API ||
    DEFAULT_SUPPORT_API
  return configured.replace(/\/$/, "")
}

export default function UpdatesCenter() {
  const [remote, setRemote] = useState<RemoteUpdate[]>([])
  const [checking, setChecking] = useState(true)
  const [source, setSource] = useState<"live" | "snapshot" | "built-in">("built-in")

  useEffect(() => {
    let cancelled = false

    async function loadUpdates() {
      const api = supportApiBase()

      try {
        const response = await fetch(api + "/portal/updates")
        if (!response.ok) throw new Error("updates unavailable")
        const data = await response.json()
        if (cancelled) return
        if (Array.isArray(data?.updates)) {
          setRemote(data.updates)
          setSource("live")
          return
        }
      } catch {}

      try {
        const response = await fetch(P + "/data/hermes-updates-snapshot.json")
        if (!response.ok) throw new Error("snapshot unavailable")
        const data = await response.json()
        if (cancelled) return
        if (Array.isArray(data?.updates) && data.updates.length) {
          setRemote(data.updates)
          setSource("snapshot")
          return
        }
      } catch {}

      if (!cancelled) {
        setRemote([])
        setSource("built-in")
      }
    }

    void loadUpdates().finally(() => {
      if (!cancelled) setChecking(false)
    })

    return () => { cancelled = true }
  }, [])

  const updates = useMemo(() => {
    const map = new Map<string, RemoteUpdate>()
    for (const item of starterUpdates) {
      map.set(item.id, {
        id: item.id,
        date: item.date,
        title: item.title,
        product: item.product,
        status: "Current",
        summary: item.summary,
        highlights: item.highlights,
        knowledge: item.knowledgeArticleIds,
        version: item.version,
      })
    }
    for (const item of remote) map.set(item.id, item)
    return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date))
  }, [remote])

  return (
    <div>
      {checking && <p className="knowledge-connection-note">Checking for the latest Lux release notes…</p>}
      {!checking && (
        <p className="knowledge-connection-note">
          {source === "live"
            ? "Live Hermes customer update feed"
            : source === "snapshot"
              ? "GitHub-synced Hermes update snapshot"
              : "Built-in release guidance"}
        </p>
      )}
      <div className="updates-list">
        {updates.map(update => (
          <article className="update-card" key={update.id}>
            <div className="update-card-meta">
              <span>{update.product}</span>
              <strong>{update.version || update.status || "Update"}</strong>
              <time>{update.date}</time>
            </div>
            <h3>{update.title}</h3>
            <p>{update.summary}</p>
            <ul>{(update.highlights || []).map(item => <li key={item}>{item}</li>)}</ul>
            <div className="update-article-links">
              {(update.knowledge || []).length > 0 && <Link href="/knowledge">Related Knowledge Articles →</Link>}
              {update.action && <span>{update.action}</span>}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
