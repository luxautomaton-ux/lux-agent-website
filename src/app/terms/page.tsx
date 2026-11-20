import { seoCanonical } from "@/lib/seoCanonical";

export const metadata = { alternates: { canonical: seoCanonical("terms") } };

import Link from "next/link";

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, margin: 0 }}>
          Last Updated: June 7, 2026
        </p>
      </div>

      <div className="card" style={{ padding: 40, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20 }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>1. Agreement to Terms</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            By purchasing the Lux Agent USB drive or downloading the digital workspace configurations, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Lux Automaton.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>2. License Grant</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            Lux Automaton grants you a non-exclusive, non-transferable, revocable license to use the Lux Agent software. Each purchase is limited to a single-user (seat) license unless a custom enterprise plan is negotiated. 
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>3. Key Gating & Activations</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            Our software requires online activation using the unique key issued upon purchase. Device activation limits are strictly enforced (1 device for USB hardware packs, up to 3 devices for digital-only bundles). Key sharing, reselling, or reverse-engineering our activation servers will result in immediate license revocation without refund.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>4. Limitation of Liability</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.8 }}>
            Lux Agent operates using local and remote AI models which are probabilistic in nature. Lux Automaton does not warrant that AI-generated code, text, business plans, or analytics are error-free or fit for specific operations. Review all outputs before production deploy.
          </p>
        </section>

        <div style={{ marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/privacy" style={{ color: '#A275FF', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            Read Privacy Policy &rarr;
          </Link>
          <Link href="/store" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>
            Back to USB Store
          </Link>
        </div>
      </div>
    </main>
  );
}
