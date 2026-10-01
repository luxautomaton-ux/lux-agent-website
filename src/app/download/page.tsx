import Link from "next/link"

export const metadata = { title: "Download" }

export default function DownloadPage() {
  return (
    <main>
      <section className="download-hero">
        <div>
          <p className="lux-eyebrow">GET STARTED WITH LUX AGENT DESKTOP</p>
          <h1>Download Lux Agent.</h1>
          <p>Lux Agent Desktop is the main Mac and Windows experience. The production installer buttons will be activated when the current release candidate passes final installed-app verification.</p>
          <div className="download-buttons">
            <button disabled> Mac installer · release pending</button>
            <button disabled>⊞ Windows installer · release pending</button>
          </div>
          <small>We do not publish an installer until the release candidate and verification evidence match.</small>
        </div>
        <img src="/lux-agent-website/brand/desktop-logo-reference.png" alt="Lux Agent Desktop" />
      </section>

      <section className="download-steps">
        <article><span>01</span><h3>Download</h3><p>Choose the approved Mac or Windows installer when it is published.</p></article>
        <article><span>02</span><h3>Install</h3><p>Run the installer and complete the guided setup.</p></article>
        <article><span>03</span><h3>Activate</h3><p>Launch Lux Agent, set up your business profile, and meet LANA.</p></article>
      </section>

      <section className="download-usb">
        <div>
          <p className="lux-eyebrow">OPTIONAL TRAVEL COMPANION</p>
          <h2>Create a Lux Agent USB on your own compatible drive.</h2>
          <p>The standard USB path is downloadable and self-service. Use a sufficiently large compatible USB drive, prepare the portable Lux environment, select what travels with you, and reconnect/sync when appropriate.</p>
          <Link className="lux-button secondary" href="/products/usb">Explore USB Travel Edition</Link>
        </div>
        <img src="/lux-agent-website/brand/usb-logo-reference.png" alt="Lux Agent USB" />
      </section>
    </main>
  )
}
