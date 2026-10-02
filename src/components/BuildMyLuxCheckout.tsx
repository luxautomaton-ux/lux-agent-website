"use client"

import { useMemo, useRef, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import successCatalogData from "../../public/data/lux-success-packs-100.json"
import memoryCatalogData from "../../public/data/lux-memory-packs-100.json"
import type { MemoryPackRecord, SuccessPackRecord } from "@/lib/customerSetup"
import type { SandboxCustomer, SandboxSetup } from "@/lib/buildMyLuxSandbox"

const P = "/lux-agent-website"
const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_LUX_AGENT_CHECKOUT_URL ||
  "https://khyzmyvrfjwwnbvwfhhk.supabase.co/functions/v1/lux-agent-checkout"

type SuccessCatalog = { count?: number; packs: SuccessPackRecord[] }
type MemoryCatalog = { count?: number; packs: MemoryPackRecord[] }

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

function parseSetup(raw: string | null): SandboxSetup | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as Partial<SandboxSetup>
    if (
      typeof value.successId !== "string" ||
      !Array.isArray(value.memoryIds) ||
      !["desktop", "usb", "both"].includes(String(value.target))
    ) return null

    return {
      successId: value.successId,
      generalTeamMode: Boolean(value.generalTeamMode),
      memoryIds: value.memoryIds.filter((id): id is string => typeof id === "string"),
      customTeam: Boolean(value.customTeam),
      customDepartments: Array.isArray(value.customDepartments)
        ? value.customDepartments.filter((name): name is string => typeof name === "string")
        : [],
      customNotes: typeof value.customNotes === "string" ? value.customNotes : "",
      target: value.target as SandboxSetup["target"],
    }
  } catch {
    return null
  }
}

export default function BuildMyLuxCheckout() {
  const formRef = useRef<HTMLFormElement>(null)
  const rawSetup = useStorageString("lux-build-my-lux")
  const localAcceptance = useLocalAcceptanceAvailable()
  const setup = useMemo(() => parseSetup(rawSetup), [rawSetup])
  const [submitting, setSubmitting] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState("")

  const success = setup
    ? successCatalog.packs.find(pack => pack.id === setup.successId) ?? null
    : null

  const memory = setup
    ? memoryCatalog.packs.filter(pack => setup.memoryIds.includes(pack.id))
    : []

  if (!setup || (!success && !setup.generalTeamMode)) {
    return (
      <main className="builder-checkout empty">
        <h1>No Lux setup found.</h1>
        <p>Build your configuration first, then return to checkout.</p>
        <Link className="lux-button primary" href="/build">Build My Lux</Link>
      </main>
    )
  }

  const targetLabel =
    setup.target === "both" ? "Lux Agent Desktop + USB" :
    setup.target === "usb" ? "Lux Agent USB" :
    "Lux Agent Desktop"

  const customerFromForm = (): SandboxCustomer | null => {
    const form = formRef.current
    if (!form || !form.reportValidity()) return null
    const data = new FormData(form)
    return {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      business: String(data.get("business") || ""),
    }
  }

  const saveCustomer = (customer: SandboxCustomer) => {
    window.localStorage.setItem("lux-build-my-lux-customer", JSON.stringify(customer))
  }

  const openAssistedCheckout = (customer: SandboxCustomer) => {
    const subject = encodeURIComponent("Build My Lux checkout request")
    const memoryLine = memory.map(pack => pack.name).join(", ") || "None"
    const body = encodeURIComponent(
      `Build My Lux Checkout\n\nCustomer: ${customer.name}\nEmail: ${customer.email}\nBusiness: ${customer.business}\n\nBusiness Team: $199 one-time\nOperating Mode: ${success?.name ?? "General Business Team"}\nMemory Packs: ${memoryLine}\nInstall: ${targetLabel}\nPremium Custom Team: ${setup.customTeam ? "Yes" : "No"}\nDepartments: ${setup.customDepartments.join(", ") || "Standard team"}\n\nPlease send the secure payment/entitlement next step.`,
    )
    window.location.href = `mailto:luxagent@gmail.com?subject=${subject}&body=${body}`
  }

  const beginCheckout = async (customer: SandboxCustomer) => {
    setSubmitting(true)
    setCheckoutMessage("Checking secure checkout…")

    try {
      const returnPathPrefix = window.location.pathname.startsWith(P) ? P : ""
      const response = await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          setup,
          returnPathPrefix,
        }),
      })

      const data = await response.json().catch(() => ({})) as {
        url?: string
        error?: string
        missingProducts?: string[]
      }

      if (response.ok && data.url) {
        setCheckoutMessage("Opening secure Stripe Checkout…")
        window.location.assign(data.url)
        return
      }

      if (response.status === 503 || data.error === "CHECKOUT_NOT_ACTIVATED") {
        setCheckoutMessage("Online payment is still launch-gated. Opening assisted checkout instead—no charge has been made.")
        openAssistedCheckout(customer)
        return
      }

      setCheckoutMessage("Secure checkout is temporarily unavailable. Opening assisted checkout—no charge has been made.")
      openAssistedCheckout(customer)
    } catch {
      setCheckoutMessage("Online payment is not active on this host yet. Opening assisted checkout—no charge has been made.")
      openAssistedCheckout(customer)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="builder-checkout">
      <section className="builder-checkout-heading">
        <Link href="/build">← Edit setup</Link>
        <p className="lux-eyebrow">BUILD MY LUX · CHECKOUT</p>
        <h1>Review your Lux setup.</h1>
        <p>
          Your configuration is saved. When Stripe is activated, this same checkout will create
          the entitlement needed for the signed setup and installer handoff.
        </p>
      </section>

      <div className="builder-checkout-grid">
        <section className="builder-order-summary">
          <article>
            <span>{success ? "SUCCESS PACK" : "OPERATING MODE"}</span>
            <h2>{success?.name ?? "General Business Team"}</h2>
            <p>{success?.oneLiner ?? "Eight coordinated business roles with no industry specialization required."}</p>
          </article>
          <article>
            <span>MEMORY ADD-ONS</span>
            <h2>{memory.length} selected</h2>
            <p>{memory.length ? memory.map(pack => pack.short_name).join(" · ") : "None selected"}</p>
          </article>
          <article>
            <span>TEAM</span>
            <h2>LANA + 7 professional agents · $199 one-time</h2>
            <p>{setup.customTeam ? "Premium team customization added on top of the core team" : "Complete generic business team included"}</p>
          </article>
          <article>
            <span>INSTALL TARGET</span>
            <h2>{targetLabel}</h2>
            <p>Signed setup handoff after entitlement verification.</p>
          </article>

          {setup.customTeam && (
            <div className="checkout-premium">
              <strong>Premium customization</strong>
              <span>{setup.customDepartments.join(" · ") || "Departments selected during Builder review"}</span>
              {setup.customNotes && <p>{setup.customNotes}</p>}
            </div>
          )}
        </section>

        <aside className="builder-checkout-form">
          <p className="lux-eyebrow">CUSTOMER DETAILS</p>
          <h2>Continue with this setup</h2>
          <p className="checkout-price-note">
            Final pricing uses the current Success Pack, Memory Pack, install-target,
            and premium-customization pricing table.
          </p>

          <form
            ref={formRef}
            onSubmit={async event => {
              event.preventDefault()
              const customer = customerFromForm()
              if (!customer) return
              saveCustomer(customer)
              await beginCheckout(customer)
            }}
          >
            <label>
              Full name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@company.com" />
            </label>
            <label>
              Business
              <input name="business" placeholder="Business name" />
            </label>

            <div className="checkout-total">
              <span>Core business team</span>
              <strong>$199 one-time + selected add-ons</strong>
            </div>

            <button className="lux-button primary" type="submit" disabled={submitting}>
              {submitting ? "Checking secure checkout…" : "Continue to Payment / Entitlement →"}
            </button>

            {checkoutMessage && (
              <small role="status">{checkoutMessage}</small>
            )}

            {localAcceptance && (
              <button
                className="lux-button secondary local-acceptance-button"
                type="button"
                onClick={() => {
                  const customer = customerFromForm()
                  if (!customer) return
                  saveCustomer(customer)
                  window.location.href = P + "/checkout/mock-pay"
                }}
              >
                Run Local Acceptance Checkout
              </button>
            )}

            <small>
              Stripe charging is intentionally disabled until the launch gate is approved and configured.
              If online payment is unavailable, this page falls back to assisted checkout and does not create a charge.
            </small>
          </form>
        </aside>
      </div>
    </main>
  )
}
