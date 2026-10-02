'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const sessionId = useSearchParams().get('session_id')
  return (
    <main style={{ paddingTop: 160, paddingBottom: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 620, textAlign: 'center' }}>
        <div aria-hidden="true" style={{ fontSize: 52, marginBottom: 18 }}>…</div>
        <p className="lux-eyebrow">LUX AGENT CHECKOUT</p>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 12 }}>Payment confirmation pending.</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
          We have not verified your payment on this page. Check your payment receipt or contact Support
          before trying checkout again. Downloads and activation remain pending until your purchase
          and signed setup are confirmed.
        </p>
        {sessionId && <small style={{ display: 'block', color: 'var(--text-dim)', marginBottom: 22 }}>A checkout reference is present; it does not confirm payment.</small>}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/getting-started" className="btn btn-primary">Getting Started</Link>
          <Link href="/support" className="btn btn-secondary">Support</Link>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}
