'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export type MobileNavItem = {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

export default function MobileNav({ items }: { items: MobileNavItem[] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const itemClass = (active?: boolean) =>
    `flex min-h-14 w-full items-center text-left text-2xl font-bold uppercase tracking-wide ${
      active ? 'text-white' : 'text-white/75'
    }`

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="relative z-[70] flex h-11 w-11 items-center justify-center text-white"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-28 z-[60] overflow-y-auto bg-slate-950 px-6 pb-12">
          <nav className="mx-auto flex min-h-full max-w-sm flex-col justify-center gap-1" aria-label="Mobile">
            {items.map((item) =>
              item.href && !item.onClick ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={itemClass(item.active)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  className={itemClass(item.active)}
                  onClick={() => {
                    const run = item.onClick
                    setOpen(false)
                    if (run) window.setTimeout(run, 50)
                  }}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  )
}
