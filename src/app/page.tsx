import Link from "next/link"
import ProductGrid from "@/components/ProductGrid"

const P = "/lux-agent-website"

export const metadata = {
  title: "Lux Agent | Your AI Team. Your Business OS.",
  description: "Meet Lux Agent: LANA, your AI team, Lux Agent Desktop, optional USB Travel Edition, Memory Packs, Success Packs, and connected business tools.",
}

const outcomes = [
  ["AI Team", "LANA coordinates specialist agents for real work."],
  ["Automate", "Turn repeatable tasks and workflows into systems."],
  ["Grow", "Use AI to create, research, follow up, and move faster."],
  ["Stay Secure", "Keep data, approvals, and business context under your control."],
]

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-shade" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="lux-eyebrow">WORK SMARTER. GO FURTHER.</p>
            <h1>Your AI Team.<br /><span>Your Business OS.</span></h1>
            <p className="home-hero-lede">
              Lux Agent brings LANA, your AI workforce, business memory, workflows, communication,
              research, and practical tools into one connected environment—on your desktop and on the go.
            </p>
            <div className="home-actions">
              <Link className="lux-button primary" href="/download">Download Lux Agent Desktop <span>→</span></Link>
              <Link className="lux-button secondary" href="/products/usb">Explore USB Travel Edition <span>→</span></Link>
            </div>
            <div className="hero-platforms">
              <span>Mac + Windows</span>
              <i />
              <span>Optional USB Travel Edition</span>
              <i />
              <span>Local-first + connected</span>
            </div>
            <div className="hero-outcomes">
              {outcomes.map(([title, body]) => (
                <div key={title}>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lana-live-card" aria-label="LANA animated introduction">
            <div className="lana-card-top">
              <span className="live-dot"><i /> LIVE</span>
              <span>LANA · AI Executive Assistant</span>
            </div>
            <video
              src={P + "/aiMotion.mp4"}
              poster={P + "/brand/lana-locked.png"}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="lana-card-bottom">
              <span className="voice-wave">▮▮▮▮▮</span>
              <strong>How can I help you move the work forward?</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-product-section">
        <div className="section-heading">
          <div>
            <p className="lux-eyebrow">THE LUX AGENT ECOSYSTEM</p>
            <h2>Everything you need to work, create, organize, and grow.</h2>
          </div>
          <Link href="/products">View all products →</Link>
        </div>
        <ProductGrid limit={8} />
      </section>

      <section className="desktop-usb-section">
        <div className="desktop-usb-image desktop-image">
          <img src={P + "/brand/products/lux-agent-desktop-frontback.webp?v=20261001-5"} alt="Lux Agent Desktop product package" />
        </div>
        <div className="desktop-usb-copy">
          <p className="lux-eyebrow">ONE TEAM · TWO WAYS TO WORK</p>
          <h2>Full power at your desk.<br /><span>Portable when you need it.</span></h2>
          <p>
            Lux Agent Desktop is your main home or office workspace. Lux Agent USB is the optional travel companion:
            a portable environment you can install on your own compatible USB drive for work away from your main computer.
          </p>
          <div className="home-actions">
            <Link className="lux-button primary" href="/products/desktop">Explore Desktop</Link>
            <Link className="lux-button secondary" href="/products/usb">Explore USB</Link>
          </div>
        </div>
        <div className="desktop-usb-image usb-image">
          <img src={P + "/brand/products/lux-agent-usb.webp?v=20261001-5"} alt="Lux Agent USB product package and drive" />
        </div>
      </section>

      <section className="office-story">
        <div className="office-story-copy">
          <p className="lux-eyebrow">BUILT FOR REAL WORK</p>
          <h2>AI that feels like an operating team—not another blank chat box.</h2>
          <p>
            LANA keeps the work moving, your agents handle specialized lanes, and the Lux tools connect communication,
            documents, workflows, verification, memory, relationships, and business execution.
          </p>
          <Link className="text-link" href="/solutions">See how Lux Agent works for your business →</Link>
        </div>
        <div className="office-story-image">
          <img src={P + "/brand/office-boardroom.png"} alt="Lux Agent corporate office" />
        </div>
      </section>

      <section className="lana-section">
        <div className="lana-portrait">
          <img src={P + "/brand/lana-locked.png"} alt="LANA, Lux Agent AI executive assistant" />
        </div>
        <div className="lana-copy">
          <p className="lux-eyebrow">MEET LANA</p>
          <h2>Your AI executive assistant at the center of Lux Agent.</h2>
          <p>
            LANA helps plan the day, understand the business, coordinate agents, prepare drafts, research,
            organize information, route work, and surface the next action—while keeping the owner in control.
          </p>
          <div className="lana-pill-row">
            <span>Plan</span><span>Create</span><span>Automate</span><span>Coordinate</span><span>Review</span>
          </div>
          <Link className="lux-button primary" href="/how-it-works">See how Lux Agent works</Link>
        </div>
      </section>

      <section className="home-final-cta">
        <p className="lux-eyebrow">A BRIGHTER TOMORROW BUILDS HERE.</p>
        <h2>Bring your AI team to work.</h2>
        <p>Start with Lux Agent Desktop. Add portable, memory, workflow, and business tools as you grow.</p>
        <div className="home-actions">
          <Link className="lux-button primary" href="/download">Get Lux Agent</Link>
          <Link className="lux-button secondary" href="/products">Explore the ecosystem</Link>
        </div>
      </section>
    </main>
  )
}
