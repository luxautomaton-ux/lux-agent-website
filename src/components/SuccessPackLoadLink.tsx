"use client"

import Link from "next/link"
import type { ReactNode } from "react"

export default function SuccessPackLoadLink({
  packId,
  className,
  children,
}: {
  packId: string
  className?: string
  children: ReactNode
}) {
  const saveSelection = () => {
    try {
      const key = "lux-build-my-lux"
      const current = window.localStorage.getItem(key)
      const data = current ? JSON.parse(current) : {}
      window.localStorage.setItem(
        key,
        JSON.stringify({
          ...data,
          successId: packId,
          generalTeamMode: false,
        }),
      )
    } catch {}
  }

  return (
    <Link href="/build" className={className} onClick={saveSelection}>
      {children}
    </Link>
  )
}
