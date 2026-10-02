import type { SuccessPackRecord } from "./customerSetup"

const exactImages: Record<number, string> = {
  1: "/lux-agent-website/packs/success-official/001-real-estate.png",
  2: "/lux-agent-website/packs/success-official/002-restaurant.png",
  3: "/lux-agent-website/packs/success-official/003-doctor-clinic.png",
  4: "/lux-agent-website/packs/success-official/004-electrical-contractor.png",
  5: "/lux-agent-website/packs/success-official/005-creator.png",
  6: "/lux-agent-website/packs/success-official/006-beauty-salon.png",
  7: "/lux-agent-website/packs/success-official/007-fitness-coach.png",
  8: "/lux-agent-website/packs/success-official/008-realtor-team.png",
  9: "/lux-agent-website/packs/success-official/009-insurance-agent.png",
  10: "/lux-agent-website/packs/success-official/010-consultant.png",
  11: "/lux-agent-website/packs/success-official/011-barbershop.png",
  12: "/lux-agent-website/packs/success-official/012-auto-repair.png",
  13: "/lux-agent-website/packs/success-official/013-hvac.png",
  14: "/lux-agent-website/packs/success-official/014-plumbing.png",
  15: "/lux-agent-website/packs/success-official/015-roofing.png",
  16: "/lux-agent-website/packs/success-official/016-landscaping.png",
  17: "/lux-agent-website/packs/success-official/017-cleaning-service.png",
  18: "/lux-agent-website/packs/success-official/018-mobile-detailing.png",
  19: "/lux-agent-website/packs/success-official/019-event-planner.png",
  20: "/lux-agent-website/packs/success-official/020-photographer.png",
}

const categoryImages: Array<[RegExp, string]> = [
  [/real estate|property|housing/i, "/lux-agent-website/packs/success-real-estate.png"],
  [/restaurant|food|hospitality|chef|catering/i, "/lux-agent-website/packs/success-restaurant.png"],
  [/health|medical|doctor|clinic|wellness|care/i, "/lux-agent-website/packs/success-doctor.png"],
  [/beauty|salon|barber|spa/i, "/lux-agent-website/packs/success-salon.png"],
  [/music|studio|artist|dj/i, "/lux-agent-website/packs/success-music-label.png"],
  [/creator|media|photo|video|film|podcast|writing/i, "/lux-agent-website/packs/success-creator.png"],
  [/marketing|seo|agency|consult/i, "/lux-agent-website/packs/success-marketing-agency.jpg"],
  [/nonprofit|faith|church|ministry|education/i, "/lux-agent-website/packs/success-nonprofit.png"],
  [/roof/i, "/lux-agent-website/packs/success-roofing.png"],
  [/plumb|electric|hvac|trade|contractor|home service|cleaning|landscap/i, "/lux-agent-website/packs/success-local-service.jpg"],
  [/auto|vehicle|detailing|transport/i, "/lux-agent-website/packs/success-local-service.jpg"],
  [/fitness|coach|sports/i, "/lux-agent-website/packs/success-coach.png"],
  [/ai|technology|software|b2b/i, "/lux-agent-website/packs/success-ai-consultant.png"],
]

export function successPackImage(pack: Pick<SuccessPackRecord, "packNumber" | "category" | "profession" | "name">) {
  if (exactImages[pack.packNumber]) return exactImages[pack.packNumber]
  const text = [pack.category, pack.profession, pack.name].join(" ")
  return categoryImages.find(([pattern]) => pattern.test(text))?.[1]
    ?? "/lux-agent-website/brand/products/success-packs.webp"
}

const accents = ["#38bdf8", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ec4899"]

export function successPackAccent(packNumber: number) {
  return accents[(packNumber - 1) % accents.length]
}

export function successPackWhen(pack: SuccessPackRecord) {
  return [
    `When you are starting or reorganizing a ${pack.profession} business.`,
    "When the team needs consistent workflows instead of one-off prompts.",
    "When you want faster follow-up, clearer operations, and repeatable business habits.",
    "When you want LANA to begin with profession-specific context before you explain every detail.",
  ]
}

export function successPackWhy(pack: SuccessPackRecord) {
  const focus = pack.primaryOutcomes.slice(0, 3).join(", ")
  return `The pack gives your Lux team a shared operating playbook for ${pack.profession} work, including ${focus}. It reduces setup and gives LANA a clearer starting point for routing work across the team.`
}

export function successPackSlug(pack: Pick<SuccessPackRecord, "id">) {
  return pack.id.replaceAll("_", "-")
}
