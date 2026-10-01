import Link from "next/link"

const P = "/lux-agent-website"

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={"lux-brandmark" + (compact ? " compact" : "")} aria-label="Lux Agent home">
      <img src={P + "/brand/lux-agent-bubble-dark-transparent.png"} alt="" />
      <span>
        <strong><b>LUX</b> AGENT</strong>
        <small>by Lux Automaton</small>
      </span>
    </Link>
  )
}
