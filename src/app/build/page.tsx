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

      <section className="easy-setup-guide" aria-label="Build My Lux setup steps">
        <article><span>1</span><div><strong>Choose your Success Pack</strong><p>Pick the business or profession that best matches what you do.</p></div></article>
        <article><span>2</span><div><strong>Add Memory Packs</strong><p>Optional extras that give your Lux team deeper knowledge and context.</p></div></article>
        <article><span>3</span><div><strong>Choose your team</strong><p>Use the included professional team or upgrade to a custom team.</p></div></article>
        <article><span>4</span><div><strong>Choose Desktop, USB, or both</strong><p>Tell Lux where you want your setup installed.</p></div></article>
        <article><span>5</span><div><strong>Review, pay, and install</strong><p>Check your setup, complete checkout, then install your signed Lux setup.</p></div></article>
      </section>

      <div className="easy-setup-help">
        <strong>Not sure what to pick?</strong>
        <p>Start with the Success Pack closest to your business. You can add or change Memory Packs later, and LANA is included automatically.</p>
      </div>

      <BuildMyLux />
    </main>
  )
}
