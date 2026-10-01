"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  createSetupManifest,
  STANDARD_CUSTOMER_TEAM,
  type InstallTarget,
  type MemoryPackRecord,
  type SuccessPackRecord,
} from "@/lib/customerSetup"

const P = "/lux-agent-website"
const steps = ["Success Pack", "Memory Packs", "Team", "Install", "Review"]
const departments = [
  "Marketing",
  "Sales",
  "Customer Service",
  "HR",
  "Operations",
  "Finance",
  "Research",
  "Technology",
]

type SuccessCatalog = { count: number; packs: SuccessPackRecord[] }
type MemoryCatalog = { count: number; packs: MemoryPackRecord[] }

export default function BuildMyLux() {
  const [step, setStep] = useState(0)
  const [successCatalog, setSuccessCatalog] = useState<SuccessCatalog | null>(null)
  const [memoryCatalog, setMemoryCatalog] = useState<MemoryCatalog | null>(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [successId, setSuccessId] = useState("")
  const [memoryIds, setMemoryIds] = useState<string[]>([])
  const [memoryQuery, setMemoryQuery] = useState("")
  const [customTeam, setCustomTeam] = useState(false)
  const [customDepartments, setCustomDepartments] = useState<string[]>([])
  const [customNotes, setCustomNotes] = useState("")
  const [target, setTarget] = useState<InstallTarget>("desktop")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(P + "/data/lux-success-packs-100.json").then(r => r.json()),
      fetch(P + "/data/lux-memory-packs-100.json").then(r => r.json()),
    ]).then(([success, memory]) => {
      setSuccessCatalog(success)
      setMemoryCatalog(memory)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    const saved = window.localStorage.getItem("lux-build-my-lux")
    if (!saved) return
    try {
      const data = JSON.parse(saved)
      setSuccessId(data.successId ?? "")
      setMemoryIds(data.memoryIds ?? [])
      setCustomTeam(Boolean(data.customTeam))
      setCustomDepartments(data.customDepartments ?? [])
      setCustomNotes(data.customNotes ?? "")
      setTarget(data.target ?? "desktop")
    } catch {}
  }, [])

  useEffect(() => {
    if (!loaded) return
    window.localStorage.setItem(
      "lux-build-my-lux",
      JSON.stringify({
        successId,
        memoryIds,
        customTeam,
        customDepartments,
        customNotes,
        target,
      }),
    )
  }, [loaded, successId, memoryIds, customTeam, customDepartments, customNotes, target])

  const successPacks = successCatalog?.packs ?? []
  const memoryPacks = memoryCatalog?.packs ?? []
  const selectedSuccess = successPacks.find(pack => pack.id === successId)
  const selectedMemory = memoryPacks.filter(pack => memoryIds.includes(pack.id))
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(successPacks.map(pack => pack.category))).sort()],
    [successPacks],
  )

  const filteredSuccess = useMemo(() => {
    const q = query.trim().toLowerCase()
    return successPacks.filter(pack => {
      const categoryMatch = category === "All" || pack.category === category
      const text = [pack.name, pack.category, pack.profession, pack.oneLiner]
        .join(" ")
        .toLowerCase()
      return categoryMatch && (!q || text.includes(q))
    })
  }, [successPacks, query, category])

  const rankedMemory = useMemo(() => {
    const q = memoryQuery.trim().toLowerCase()
    const source = selectedSuccess
      ? [selectedSuccess.category, selectedSuccess.profession, ...selectedSuccess.primaryOutcomes]
          .join(" ")
          .toLowerCase()
      : ""
    const words = new Set(source.split(/[^a-z0-9]+/).filter(word => word.length > 3))
    return memoryPacks
      .filter(pack =>
        !q ||
        [pack.name, pack.category, pack.description, ...(pack.use_cases ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map(pack => {
        const haystack = [
          pack.category,
          pack.description,
          ...(pack.use_cases ?? []),
          ...(pack.recommended_team_focus ?? []),
        ]
          .join(" ")
          .toLowerCase()
        let score = 0
        words.forEach(word => {
          if (haystack.includes(word)) score += 1
        })
        return { pack, score }
      })
      .sort((a, b) => b.score - a.score || a.pack.name.localeCompare(b.pack.name))
  }, [memoryPacks, selectedSuccess, memoryQuery])

  const manifest = selectedSuccess
    ? createSetupManifest({
        successPack: selectedSuccess,
        memoryPacks: selectedMemory,
        target,
        customTeam: {
          enabled: customTeam,
          departments: customDepartments,
          notes: customNotes,
        },
      })
    : null

  const toggleMemory = (id: string) => {
    setMemoryIds(current =>
      current.includes(id) ? current.filter(value => value !== id) : [...current, id],
    )
  }

  const toggleDepartment = (name: string) => {
    setCustomDepartments(current =>
      current.includes(name) ? current.filter(value => value !== name) : [...current, name],
    )
  }

  const downloadPreview = () => {
    if (!manifest) return
    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: "application/json",
    })
    const href = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = href
    link.download = `lux-setup-${selectedSuccess?.id ?? "preview"}.json`
    link.click()
    URL.revokeObjectURL(href)
  }

  const canContinue = step !== 0 || Boolean(selectedSuccess)

  if (!loaded) {
    return <div className="build-loading">Loading the Lux pack library…</div>
  }

  return (
    <div className="build-my-lux">
      <div className="build-progress">
        {steps.map((label, index) => (
          <button
            key={label}
            className={index === step ? "active" : index < step ? "done" : ""}
            onClick={() => {
              if (index === 0 || selectedSuccess) setStep(index)
            }}
          >
            <span>{index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 1 · START WITH WHAT ALREADY WORKS</p>
            <h2>Choose your Success Pack.</h2>
            <p>
              A Success Pack is your prebuilt industry AI team. LANA, roles, workflows,
              starter prompts, outcomes, and safety rules are already organized for the field.
            </p>
          </div>
          <div className="build-filters">
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search 100 Success Packs — real estate, restaurant, trucking…"
            />
            <select value={category} onChange={event => setCategory(event.target.value)}>
              {categories.map(value => <option key={value}>{value}</option>)}
            </select>
            <span>{filteredSuccess.length} of {successCatalog?.count ?? 100}</span>
          </div>

          <div className="success-pack-grid">
            {filteredSuccess.map(pack => {
              const selected = pack.id === successId
              return (
                <button
                  key={pack.id}
                  className={"success-pack-choice" + (selected ? " selected" : "")}
                  onClick={() => setSuccessId(pack.id)}
                >
                  <div className="pack-number">#{String(pack.packNumber).padStart(3, "0")}</div>
                  <span>{pack.category}</span>
                  <h3>{pack.name}</h3>
                  <p>{pack.oneLiner}</p>
                  <strong>{selected ? "Selected ✓" : "Choose this pack"}</strong>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 1 && selectedSuccess && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 2 · OPTIONAL ENHANCEMENTS</p>
            <h2>Add Memory Packs.</h2>
            <p>
              Your {selectedSuccess.name} already works on its own. Memory Packs deepen
              business judgment and knowledge without replacing the active Success Pack.
            </p>
          </div>

          <div className="build-selected-bar">
            <strong>{selectedSuccess.name}</strong>
            <span>{memoryIds.length} Memory Pack{memoryIds.length === 1 ? "" : "s"} added</span>
          </div>

          <div className="build-filters">
            <input
              value={memoryQuery}
              onChange={event => setMemoryQuery(event.target.value)}
              placeholder="Search 100 Memory Packs"
            />
            <span>{rankedMemory.length} available</span>
          </div>
          <div className="memory-pack-grid">
            {rankedMemory.map(({ pack, score }, index) => {
              const selected = memoryIds.includes(pack.id)
              const recommended = index < 8 && score > 0
              return (
                <button
                  key={pack.id}
                  className={"memory-pack-choice" + (selected ? " selected" : "")}
                  onClick={() => toggleMemory(pack.id)}
                >
                  <div className="memory-choice-top">
                    <span>{pack.category}</span>
                    <em>{recommended ? "Recommended" : "Optional"}</em>
                  </div>
                  <h3>{pack.short_name || pack.name}</h3>
                  <p>{pack.description}</p>
                  <strong>{selected ? "Added ✓" : "+ Add Memory Pack"}</strong>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 2 && selectedSuccess && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 3 · YOUR AI TEAM</p>
            <h2>Your professional team is already included.</h2>
            <p>
              LANA installs on every Lux setup. The standard team stays generic,
              business-oriented, friendly, professional, and ready for customer-facing work.
            </p>
          </div>

          <div className="standard-team-grid">
            {STANDARD_CUSTOMER_TEAM.map(agent => (
              <article key={agent.id}>
                <span>{agent.lane}</span>
                <h3>{agent.displayName}</h3>
                <p>{agent.role}</p>
                <small>{agent.voiceProfile.replaceAll("-", " ")}</small>
              </article>
            ))}
          </div>

          <div className={"premium-team-panel" + (customTeam ? " enabled" : "")}>
            <div>
              <p className="lux-eyebrow">PREMIUM CUSTOMIZATION</p>
              <h3>Want a team built specifically for your company?</h3>
              <p>
                Keep the standard team at no customization charge, or upgrade to customize
                departments, names, personas, role details, and voice style through Lux Agent Builder.
              </p>
            </div>
            <label className="premium-toggle">
              <input
                type="checkbox"
                checked={customTeam}
                onChange={event => setCustomTeam(event.target.checked)}
              />
              <span>Customize my team · premium add-on</span>
            </label>

            {customTeam && (
              <div className="custom-team-options">
                <h4>Which departments should we customize?</h4>
                <div className="department-pills">
                  {departments.map(name => (
                    <button
                      key={name}
                      className={customDepartments.includes(name) ? "selected" : ""}
                      onClick={() => toggleDepartment(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <textarea
                  value={customNotes}
                  onChange={event => setCustomNotes(event.target.value)}
                  placeholder="Optional: Tell us what you want changed about the team."
                  rows={4}
                />
                <p>
                  This request stays inside the Lux Agent ecosystem and becomes the handoff
                  to the integrated Agent Builder before the final signed setup bundle is issued.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {step === 3 && selectedSuccess && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 4 · CHOOSE WHERE LUX LIVES</p>
            <h2>Desktop, USB, or both.</h2>
            <p>
              Desktop is the full home or office experience. USB is the portable companion.
              The same setup can be entitled for both.
            </p>
          </div>

          <div className="install-target-grid">
            <button
              className={target === "desktop" ? "selected" : ""}
              onClick={() => setTarget("desktop")}
            >
              <img src={P + "/brand/products/lux-agent-desktop-frontback.webp"} alt="" />
              <h3>Lux Agent Desktop</h3>
              <p>Full Mac / Windows AI workspace.</p>
              <strong>{target === "desktop" ? "Selected ✓" : "Choose Desktop"}</strong>
            </button>
            <button
              className={target === "usb" ? "selected" : ""}
              onClick={() => setTarget("usb")}
            >
              <img src={P + "/brand/products/lux-agent-usb.webp"} alt="" />
              <h3>Lux Agent USB</h3>
              <p>Portable setup for your compatible USB drive.</p>
              <strong>{target === "usb" ? "Selected ✓" : "Choose USB"}</strong>
            </button>

            <button
              className={target === "both" ? "selected" : ""}
              onClick={() => setTarget("both")}
            >
              <div className="both-target-art">
                <img src={P + "/brand/products/lux-agent-desktop.webp"} alt="" />
                <img src={P + "/brand/products/lux-agent-usb.webp"} alt="" />
              </div>
              <h3>Desktop + USB</h3>
              <p>Full workspace plus portable travel companion.</p>
              <strong>{target === "both" ? "Selected ✓" : "Choose Both"}</strong>
            </button>
          </div>
        </section>
      )}

      {step === 4 && selectedSuccess && manifest && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 5 · REVIEW MY LUX</p>
            <h2>Your setup is ready for checkout.</h2>
            <p>
              Review the configuration before payment. Production installation will use a
              server-signed entitlement bundle; this browser preview never contains credentials.
            </p>
          </div>

          <div className="setup-review">
            <article>
              <span>SUCCESS PACK</span>
              <h3>{selectedSuccess.name}</h3>
              <p>{selectedSuccess.profession}</p>
            </article>
            <article>
              <span>MEMORY</span>
              <h3>{selectedMemory.length} Memory Pack{selectedMemory.length === 1 ? "" : "s"}</h3>
              <p>{selectedMemory.length ? selectedMemory.map(pack => pack.short_name).join(" · ") : "No add-ons selected"}</p>
            </article>
            <article>
              <span>TEAM</span>
              <h3>LANA + {STANDARD_CUSTOMER_TEAM.length - 1} professional agents</h3>
              <p>{customTeam ? "Premium team customization requested" : "Standard generic business team"}</p>
            </article>
            <article>
              <span>INSTALL</span>
              <h3>{target === "both" ? "Desktop + USB" : target === "usb" ? "USB Travel" : "Desktop"}</h3>
              <p>Entitlement and installer handoff after checkout.</p>
            </article>
          </div>

          {customTeam && (
            <div className="premium-review">
              <strong>Premium Custom Team</strong>
              <span>{customDepartments.length ? customDepartments.join(" · ") : "Department choices pending"}</span>
              {customNotes && <p>{customNotes}</p>}
            </div>
          )}

          <div className="install-after-checkout">
            <h3>What happens after checkout</h3>
            <ol>
              <li><span>1</span><div><strong>Entitlement issued</strong><p>Your purchase is tied to your Lux account.</p></div></li>
              <li><span>2</span><div><strong>Signed Lux Setup generated</strong><p>Success Pack, Memory Packs, team policy, and install targets are sealed together.</p></div></li>
              <li><span>3</span><div><strong>Install to Lux Agent</strong><p>Desktop opens the signed setup and applies it after customer review.</p></div></li>
              <li><span>4</span><div><strong>Create USB when selected</strong><p>Desktop prepares the portable environment on the customer&apos;s compatible drive.</p></div></li>
            </ol>
          </div>

          <div className="build-review-actions">
            <button className="lux-button secondary" onClick={downloadPreview}>
              Download setup preview
            </button>
            <Link className="lux-button primary" href="/checkout?source=build-my-lux">
              Continue to Checkout →
            </Link>
          </div>
          <p className="setup-preview-note">
            The downloaded JSON is a configuration preview only. It is not a paid entitlement,
            signature, or executable installer.
          </p>
        </section>
      )}

      <div className="build-nav">
        <button
          className="lux-button secondary"
          disabled={step === 0}
          onClick={() => setStep(value => Math.max(0, value - 1))}
        >
          ← Back
        </button>
        {step < 4 && (
          <button
            className="lux-button primary"
            disabled={!canContinue}
            onClick={() => setStep(value => Math.min(4, value + 1))}
          >
            {step === 0 ? "Add Memory Packs" : step === 1 ? "Review Team" : step === 2 ? "Choose Install" : "Review Setup"} →
          </button>
        )}
      </div>
    </div>
  )
}
