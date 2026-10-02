"use client"

import Link from "next/link"
import { useState, useSyncExternalStore } from "react"
import memoryCatalogData from "../../../../public/data/lux-memory-packs-100.json"
import successCatalogData from "../../../../public/data/lux-success-packs-100.json"

import {
  createSandboxSetupBundle,
  triggerDownload,
  type SandboxCustomer,
  type SandboxEntitlement,
  type SandboxSetup,
} from "@/lib/buildMyLuxSandbox"
import type { MemoryPackRecord, SuccessPackRecord } from "@/lib/customerSetup"

type SuccessCatalog = { packs: SuccessPackRecord[] }
type MemoryCatalog = { packs: MemoryPackRecord[] }

const successCatalog = successCatalogData as SuccessCatalog
const memoryCatalog = memoryCatalogData as MemoryCatalog

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function useStorageString(key: string) {
  return useSyncExternalStore(
    subscribeStorage,
    () => window.localStorage.getItem(key),
    () => null,
  )
}

function useLocalAcceptanceAvailable() {
  return useSyncExternalStore(
    () => () => {},
    () => ["127.0.0.1", "localhost"].includes(window.location.hostname),
    () => false,
  )
}

function parseJson<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export default function MockPayPage() {
  const local = useLocalAcceptanceAvailable()
  const setup = parseJson<SandboxSetup>(useStorageString("lux-build-my-lux"))
  const customer = parseJson<SandboxCustomer>(useStorageString("lux-build-my-lux-customer"))
  const [status, setStatus] = useState("")
  const [working, setWorking] = useState(false)

  const success = setup?.successId
    ? successCatalog.packs.find(pack => pack.id === setup.successId) ?? null
    : null
  const memory = setup
    ? memoryCatalog.packs.filter(pack => setup.memoryIds.includes(pack.id))
    : []

  const ready = Boolean(
    local &&
    setup &&
    customer?.name?.trim() &&
    customer?.email?.trim() &&
    (success || setup.generalTeamMode),
  )

  const simulate = async () => {
    if (!ready || !setup || !customer) return
    setWorking(true)
    setStatus("")
    try {
      const issuedAt = new Date().toISOString()
      const entitlement: SandboxEntitlement = {
        schema: "lux-sandbox-entitlement/v1",
        id: `sandbox-entitlement-${crypto.randomUUID()}`,
        state: "sandbox-active",
        production: false,
        issuedAt,
        customerEmail: customer.email,
        setupId: `sandbox-setup-${crypto.randomUUID()}`,
        note: "LOCAL ACCEPTANCE TEST ONLY. No money moved and no production entitlement was created.",
      }
      const blob = await createSandboxSetupBundle({
        setup,
        successPack: success,
        memoryPacks: memory,
        customer,
        entitlement,
      })
      triggerDownload(blob, `lux-agent-local-acceptance-${entitlement.setupId}.zip`)
      window.localStorage.setItem("lux-local-acceptance-last", JSON.stringify({
        schema: "lux-local-acceptance-receipt/v1",
        at: issuedAt,
        entitlementId: entitlement.id,
        setupId: entitlement.setupId,
        customerEmail: customer.email,
        target: setup.target,
        successId: setup.successId || null,
        memoryIds: setup.memoryIds,
        production: false,
        charged: false,
      }))
      setStatus("PASS — synthetic payment accepted locally and the sandbox setup bundle was generated. No money moved.")
    } catch {
      setStatus("FAIL — the local acceptance bundle could not be generated. No money moved.")
    } finally {
      setWorking(false)
    }
  }

  if (!local) {
    return (
      <main style={{ paddingTop: 160, paddingBottom: 100, minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
          <p className="lux-eyebrow">LOCAL ACCEPTANCE ONLY</p>
          <h1>Payment Sandbox</h1>
          <p style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
            This synthetic checkout is intentionally disabled on public hosting. It only runs on localhost
            and never creates a real payment or production entitlement.
          </p>
          <Link href="/build" className="btn btn-secondary">← Back to Build My Lux</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 140, paddingBottom: 100, minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <p className="lux-eyebrow">DAY-ONE REHEARSAL · LOCALHOST ONLY</p>
        <h1 style={{ fontSize: 38, marginBottom: 12 }}>Synthetic Payment + Entitlement Test</h1>
        <p style={{ color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 28 }}>
          This proves the Build My Lux handoff can move from customer configuration to a downloadable
          setup bundle without charging a card or creating production authority.
        </p>

        <section className="builder-order-summary">
          <article>
            <span>CUSTOMER</span>
            <h2>{customer?.name || "Missing customer details"}</h2>
            <p>{customer?.email || "Return to checkout and enter a synthetic email."}</p>
          </article>
          <article>
            <span>OPERATING MODE</span>
            <h2>{success?.name ?? (setup?.generalTeamMode ? "General Business Team" : "No setup found")}</h2>
            <p>{memory.length} Memory Pack{memory.length === 1 ? "" : "s"} selected</p>
          </article>
          <article>
            <span>INSTALL TARGET</span>
            <h2>{setup?.target ?? "Not selected"}</h2>
            <p>Sandbox bundle only — no installer or USB write.</p>
          </article>
        </section>

        <div className="install-after-checkout" style={{ marginTop: 28 }}>
          <h3>Acceptance contract</h3>
          <ol>
            <li><span>1</span><div><strong>Simulate payment success</strong><p>No Stripe call and no charge.</p></div></li>
            <li><span>2</span><div><strong>Create sandbox entitlement</strong><p>Marked production=false and sandbox-active.</p></div></li>
            <li><span>3</span><div><strong>Generate setup bundle</strong><p>ZIP includes setup, packs, synthetic customer profile, entitlement, and SHA-256 manifest.</p></div></li>
          </ol>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <button className="lux-button primary" disabled={!ready || working} onClick={() => void simulate()} type="button">
            {working ? "Generating Sandbox Bundle…" : "Simulate Successful Payment + Download Bundle"}
          </button>
          <Link href="/checkout?source=build-my-lux" className="lux-button secondary">← Back to Checkout</Link>
        </div>
        {status && <p role="status" style={{ marginTop: 18, color: "var(--text-dim)", lineHeight: 1.6 }}>{status}</p>}
        {!ready && (
          <p style={{ marginTop: 18, color: "var(--text-dim)" }}>
            Complete Build My Lux and enter customer details first. Use synthetic test data only.
          </p>
        )}
      </div>
    </main>
  )
}
