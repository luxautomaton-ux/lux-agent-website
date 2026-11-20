import { seoCanonical } from "@/lib/seoCanonical";

export const metadata = { alternates: { canonical: seoCanonical("privacy") } };

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="container" style={{ paddingTop: 120, paddingBottom: 100, maxWidth: 800 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: 2, color: '#A275FF', marginBottom: 12,
          background: 'rgba(162, 117, 255, 0.08)', padding: '5px 12px', borderRadius: 100,
          border: '1px solid rgba(162, 117, 255, 0.15)'
        }}>
          Legal Documents
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', letterSpacing: '-1px', margin: '0 0 16px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, margin: 0 }}>
          Last Updated: June 7, 2026
        </p>
      </div>

      <div className="card" style={{ padding: 40, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20 }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>1. Local-First Isolation Policy</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            Lux Agent is designed as a local-first system. All code generation, text drafting, prompts, conversation logs, and active databases run locally on your USB device or local computer. We do not transmit your local workspace files, project contents, or chat history to our servers.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>2. Third-Party API Integration</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            If you connect third-party AI APIs (such as DeepSeek, Gemini, Anthropic, or OpenAI API keys) inside your system settings, requests are sent directly to those third-party providers. Lux Automaton never acts as an intermediary, nor do we store or collect your API keys.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>3. License Check Metadata</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            When checking license activation state or validating subscription keys, our API collects minor configuration metadata, including your hashed key, hardware fingerprint, and timestamp, to prevent key sharing. We collect no personal chat logs or workspace files during these validations.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>4. Stripe Billing Security</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            We process all transactions securely through Stripe Checkout. Your credit card and payment credentials are never processed or saved on our servers.
          </p>
        </section>

        <div style={{ marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/terms" style={{ color: '#A275FF', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            Read Terms of Service &rarr;
          </Link>
          <Link href="/store" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>
            Back to USB Store
          </Link>
        </div>
      </div>
    </main>
  );
}
