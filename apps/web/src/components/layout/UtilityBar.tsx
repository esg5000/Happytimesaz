'use client'

import { useState } from 'react'
import Link from 'next/link'
export function UtilityBar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="border-b border-az-sand/80 bg-az-cream-dark/30 font-sans text-xs text-az-ink-muted">
      <div className="container-page flex h-9 items-center justify-between gap-4 md:h-10">
        <div className="hidden items-center gap-3 md:flex" />

        <div className="flex-1 md:hidden">
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-1.5 font-semibold text-az-ink-muted transition hover:text-az-terracotta"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/advertise" className="hidden font-semibold text-az-ink-muted transition hover:text-az-terracotta md:inline">
            Advertise
          </Link>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-az-sand/80 bg-az-cream p-4 md:hidden">
          <input
            suppressHydrationWarning
            type="search"
            placeholder="Search…"
            className="w-full rounded-full border border-az-sand bg-white px-4 py-2.5 text-sm outline-none ring-az-terracotta/30 focus:ring-2"
            autoFocus
          />
        </div>
      ) : null}
    </div>
  )
}
