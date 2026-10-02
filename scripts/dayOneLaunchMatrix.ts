import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { createSandboxSetupBundle, type SandboxSetup } from "../src/lib/buildMyLuxSandbox"

type Pack = { id: string; name: string }
const root = process.cwd()
const success = (JSON.parse(readFileSync(join(root, "public/data/lux-success-packs-100.json"), "utf8")) as { packs: Pack[] }).packs
const memory = (JSON.parse(readFileSync(join(root, "public/data/lux-memory-packs-100.json"), "utf8")) as { packs: Pack[] }).packs

const cases: Array<{ name: string; setup: SandboxSetup }> = [
  {
    name: "general-team-desktop",
    setup: { successId: "", generalTeamMode: true, memoryIds: [], customTeam: false, customDepartments: [], customNotes: "", target: "desktop" },
  },
  {
    name: "specialized-desktop-memory",
    setup: { successId: success[0].id, memoryIds: [memory[0].id, memory[1].id], customTeam: false, customDepartments: [], customNotes: "", target: "desktop" },
  },
  {
    name: "specialized-usb-travel",
    setup: { successId: success[1].id, memoryIds: [memory[2].id], customTeam: false, customDepartments: [], customNotes: "", target: "usb" },
  },
  {
    name: "premium-both-targets",
    setup: { successId: success[2].id, memoryIds: [memory[3].id, memory[4].id], customTeam: true, customDepartments: ["Sales", "Operations"], customNotes: "Synthetic launch rehearsal", target: "both" },
  },
]

const results = []
for (const row of cases) {
  const selectedSuccess = row.setup.successId ? success.find(pack => pack.id === row.setup.successId) : null
  const selectedMemory = memory.filter(pack => row.setup.memoryIds.includes(pack.id))
  const blob = await createSandboxSetupBundle({
    setup: row.setup,
    successPack: selectedSuccess as never,
    memoryPacks: selectedMemory as never,
    customer: { name: "Launch Test", email: `${row.name}@example.invalid`, business: "Lux Day One Synthetic" },
    entitlement: {
      schema: "lux-sandbox-entitlement/v1",
      id: `sandbox-${row.name}`,
      state: "sandbox-active",
      production: false,
      issuedAt: new Date().toISOString(),
      customerEmail: `${row.name}@example.invalid`,
      setupId: `setup-${row.name}`,
      note: "Synthetic Day-One rehearsal only.",
    },
  })
  const bytes = new Uint8Array(await blob.arrayBuffer())
  if (bytes[0] !== 0x50 || bytes[1] !== 0x4b || bytes.length < 500) throw new Error(`${row.name}: invalid setup ZIP`)
  results.push({ name: row.name, ok: true, zipBytes: bytes.length, target: row.setup.target, memoryCount: row.setup.memoryIds.length, customTeam: row.setup.customTeam })
}

const checkout = await fetch("https://khyzmyvrfjwwnbvwfhhk.supabase.co/functions/v1/lux-agent-checkout")
const checkoutStatus = await checkout.json() as { chargesAllowed?: boolean; activeCatalogItems?: number }
if (!checkout.ok || checkoutStatus.chargesAllowed !== false) throw new Error("Pre-launch checkout gate is not fail-closed")

const receipt = { generatedAt: new Date().toISOString(), cases: results, checkoutStatus, productionChargesExpected: false }
mkdirSync(join(root, "output/launch-readiness"), { recursive: true })
writeFileSync(join(root, "output/launch-readiness/day-one-matrix-latest.json"), JSON.stringify(receipt, null, 2) + "\n")
console.log(JSON.stringify(receipt, null, 2))
