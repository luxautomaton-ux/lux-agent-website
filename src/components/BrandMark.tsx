import Link from "next/link"

const P = "/lux-agent-website"

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={"lux-brandmark" + (compact ? " compact" : "")} aria-label="Lux Agent home">
      <img src={P + "/lux-agent-icon.png"} alt="" />
      <span>
        <strong>LUX AGENT</strong>
        <small>by Lux Automaton</small>
      </span>
    </Link>
  )
}
