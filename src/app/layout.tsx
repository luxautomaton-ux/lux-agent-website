import Link from "next/link"
import "./globals.css"
import BrandMark from "@/components/BrandMark"

export const metadata = {
  title: {
    default: "Lux Agent | Your AI Team. Your Business OS.",
    template: "%s | Lux Agent",
  },
  description: "Lux Agent is a private AI workforce and business operating system for desktop, travel, automation, communication, knowledge, and real work.",
  icons: {
    icon: "/lux-agent-website/lux-agent-icon.png",
    apple: "/lux-agent-website/lux-agent-icon.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <BrandMark />
            <nav className="site-nav" aria-label="Primary navigation">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/build">Build My Lux</Link>
              <Link href="/solutions">Solutions</Link>
              <Link href="/store">Pricing</Link>
              <Link href="/download">Download</Link>
              <Link href="/knowledge">Knowledge</Link>
              <Link href="/updates">Updates</Link>
              <Link href="/support">Support</Link>
              <Link href="/about">Company</Link>
            </nav>
            <Link href="/download" className="header-cta">Get Lux Agent <span>→</span></Link>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="site-footer-main">
            <div>
              <BrandMark compact />
              <p>Your AI team. Your business OS. Built for real work.</p>
              <div className="lux-automaton-credit">
                <span>Developed by</span>
                <img src="/lux-agent-website/brand/lux-automaton-logo-transparent.png" alt="Lux Automaton" />
              </div>
            </div>
            <div className="site-footer-links">
              <div>
                <strong>Explore</strong>
                <Link href="/products">Products</Link>
                <Link href="/getting-started">Getting Started</Link>
                <Link href="/build">Build My Lux</Link>
                <Link href="/knowledge">Knowledge</Link>
                <Link href="/updates">Updates</Link>
                <Link href="/support">Support</Link>
              </div>
              <div>
                <strong>Products</strong>
                <Link href="/products/desktop">Desktop</Link>
                <Link href="/products/usb">USB Travel</Link>
                <Link href="/memory-packs">Memory Packs</Link>
                <Link href="/success-packs">Success Packs</Link>
              </div>
              <div>
                <strong>Company</strong>
                <Link href="/about">About</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </div>
            </div>
          </div>
          <div className="site-footer-bottom">
            <span>© 2026 Lux Agent. Developed by Lux Automaton.</span>
            <span>AUTOMATE · INNOVATE · ACCELERATE</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
