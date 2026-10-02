import Link from "next/link"

export const metadata = { title: "Checkout Canceled" }

export default function CheckoutCanceledPage() {
  return (
    <main className="builder-checkout empty">
      <p className="lux-eyebrow">BUILD MY LUX · CHECKOUT</p>
      <h1>No payment was completed.</h1>
      <p>Your saved Lux configuration is still available on this device. You can review it or return when you are ready.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link className="lux-button primary" href="/checkout">Return to Checkout</Link>
        <Link className="lux-button secondary" href="/build">Edit My Setup</Link>
      </div>
    </main>
  )
}
