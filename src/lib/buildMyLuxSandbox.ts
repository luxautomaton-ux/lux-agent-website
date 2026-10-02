import { createSetupManifest, type InstallTarget, type MemoryPackRecord, type SuccessPackRecord } from "./customerSetup"
import { createStoredZip, sha256Hex, type ZipEntry } from "./browserZip"

export type SandboxCustomer = {
  name: string
  email: string
  business: string
}

export type SandboxSetup = {
  successId: string
  generalTeamMode?: boolean
  memoryIds: string[]
  customTeam: boolean
  customDepartments: string[]
  customNotes: string
  target: InstallTarget
}

export type SandboxEntitlement = {
  schema: "lux-sandbox-entitlement/v1"
  id: string
  state: "sandbox-active"
  production: false
  issuedAt: string
  customerEmail: string
  setupId: string
  note: string
}

export async function createSandboxSetupBundle(input: {
  setup: SandboxSetup
  successPack?: SuccessPackRecord | null
  memoryPacks: MemoryPackRecord[]
  customer: SandboxCustomer
  entitlement: SandboxEntitlement
}) {
  const baseManifest = createSetupManifest({
    successPack: input.successPack ?? null,
    memoryPacks: input.memoryPacks,
    target: input.setup.target,
    customTeam: {
      enabled: input.setup.customTeam,
      departments: input.setup.customDepartments,
      notes: input.setup.customNotes,
    },
  })

  const setupManifest = {
    ...baseManifest,
    setupId: input.entitlement.setupId,
    commercial: {
      ...baseManifest.commercial,
      entitlementStatus: "sandbox-active",
      signed: false,
      note: "LOCAL ACCEPTANCE TEST ONLY. This is not a production payment receipt, license, or signed entitlement.",
    },
    acceptance: {
      mode: "local-sandbox",
      productionReady: false,
      generatedAt: new Date().toISOString(),
    },
  }

  const sourceFiles = [
    {
      name: "lux-setup.json",
      data: JSON.stringify(setupManifest, null, 2) + "\n",
    },
    {
      name: "success-pack.json",
      data: JSON.stringify(input.successPack ?? { mode: "general-business-team", included: false }, null, 2) + "\n",
    },
    {
      name: "memory-packs.json",
      data: JSON.stringify(input.memoryPacks, null, 2) + "\n",
    },
    {
      name: "sandbox-entitlement.json",
      data: JSON.stringify(input.entitlement, null, 2) + "\n",
    },
    {
      name: "customer-test-profile.json",
      data: JSON.stringify(input.customer, null, 2) + "\n",
    },
    {
      name: "README.txt",
      data: [
        "LUX SETUP BUNDLE — LOCAL ACCEPTANCE TEST",
        "",
        "This ZIP proves the Build My Lux website can create and download a complete configuration bundle.",
        "It is NOT a paid production entitlement and does NOT contain the Lux Agent Desktop installer.",
        "",
        "Included:",
        "- lux-setup.json — Success Pack, Memory Packs, team policy, install target",
        "- success-pack.json — selected profession playbook",
        "- memory-packs.json — selected memory add-ons",
        "- sandbox-entitlement.json — local acceptance-test entitlement only",
        "- customer-test-profile.json — synthetic/local checkout profile",
        "- bundle-manifest.json — SHA-256 checksums",
        "",
        "Production installer status:",
        "The customer Mac/Windows installer remains gated until the approved release candidate and independent verification evidence are published.",
        "",
      ].join("\n"),
    },
  ]

  const checksums = []
  for (const file of sourceFiles) {
    checksums.push({
      file: file.name,
      sha256: await sha256Hex(file.data),
    })
  }

  const bundleManifest = {
    schema: "lux-setup-bundle-manifest/v1",
    generatedAt: new Date().toISOString(),
    entitlementId: input.entitlement.id,
    setupId: input.entitlement.setupId,
    production: false,
    files: checksums,
  }

  const entries: ZipEntry[] = [
    ...sourceFiles,
    {
      name: "bundle-manifest.json",
      data: JSON.stringify(bundleManifest, null, 2) + "\n",
    },
  ]

  return createStoredZip(entries)
}

export function triggerDownload(blob: Blob, filename: string) {
  const href = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = href
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(href), 1000)
}
