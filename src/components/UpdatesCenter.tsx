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

function supportApiBase() {
  const configured = process.env.NEXT_PUBLIC_LUX_SUPPORT_API_URL?.replace(/\/$/, "")
  if (configured) return configured
  if (typeof window !== "undefined" && ["127.0.0.1", "localhost"].includes(window.location.hostname)) {
    return "http://Asas-Mac-mini.local:18789"
  }
  return ""
}

export default function UpdatesCenter() {
  const [remote, setRemote] = useState<RemoteUpdate[]>([])
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const api = supportApiBase()
    if (!api) {
      setChecking(false)
      return
    }
    fetch(api + "/portal/updates")
      .then(response => response.ok ? response.json() : Promise.reject(new Error("updates unavailable")))
      .then(data => setRemote(Array.isArray(data?.updates) ? data.updates : []))
      .catch(() => setRemote([]))
      .finally(() => setChecking(false))
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
