import BuildMyLux from "@/components/BuildMyLux"

export const metadata = {
  title: "Build My Lux",
  description: "Choose a prebuilt Success Pack, add Memory Packs, optionally customize your AI team, and prepare your Lux Agent Desktop or USB setup.",
}

export default function BuildPage() {
  return (
    <main>
      <section className="build-page-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy">
          <p className="lux-eyebrow">BUILD MY LUX</p>
          <h1>Choose what works.<br /><span>Make it yours.</span></h1>
          <p>
            Start with one of 100 prebuilt Success Packs, add optional Memory Packs,
            keep the professional standard team or request premium customization,
            then prepare your Desktop, USB, or combined setup.
          </p>
        </div>
      </section>
      <BuildMyLux />
    </main>
  )
}
