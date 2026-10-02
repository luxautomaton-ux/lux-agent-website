"use client"

import Link from "next/link"
import type { ReactNode } from "react"

export default function MemoryPackLoadLink({
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
      const currentIds = Array.isArray(data.memoryIds) ? data.memoryIds : []
      const memoryIds = currentIds.includes(packId) ? currentIds : [...currentIds, packId]
      window.localStorage.setItem(
        key,
        JSON.stringify({
          ...data,
          memoryIds,
        }),
      )
    } catch {}
  }

  return (
    <Link href="/build?step=memory" className={className} onClick={saveSelection}>
      {children}
    </Link>
  )
}
