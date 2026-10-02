'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import BuildMyLuxCheckout from '@/components/BuildMyLuxCheckout'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || ''

  if (source === 'build-my-lux') {
    return <BuildMyLuxCheckout />
  }

  return (
    <main style={{ paddingTop: 140, paddingBottom: 100 }}>
      <section className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
        <p className="lux-eyebrow">LUX AGENT CHECKOUT</p>
        <h1 style={{ fontSize: 40, marginBottom: 16 }}>Build your Lux setup first.</h1>
        <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 28 }}>
          The old physical-USB checkout has been retired. Choose your Success Pack, optional Memory Packs,
          team configuration, and Desktop / USB target in Build My Lux. Secure payment stays launch-locked
          until the approved pricing catalog is activated.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/build" className="btn btn-primary">Build My Lux</Link>
          <Link href="/store" className="btn btn-secondary">View Product Paths</Link>
        </div>
      </section>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main style={{ paddingTop: 140, paddingBottom: 100 }}>
        <section className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)' }}>Loading checkout…</p>
        </section>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
