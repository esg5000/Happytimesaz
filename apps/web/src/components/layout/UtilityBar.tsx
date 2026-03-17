'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function UtilityBar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="border-b border-brand-light bg-white text-xs">
      <div className="container-page flex h-8 items-center justify-between gap-4">
        {/* Left: Social links (optional) */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Social links can be added here */}
        </div>

        {/* Center: Search (mobile) */}
        <div className="flex-1 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-1 text-brand-dark/60 hover:text-brand-dark"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
          </button>
        </div>

        {/* Right: Account + CTA */}
        <div className="flex items-center gap-3">
          <Link href="/advertise" className="hidden text-brand-dark/60 hover:text-brand-orange md:inline">
            Advertise
          </Link>
        </div>
      </div>

      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className="border-t border-brand-light bg-white p-4 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-brand-light px-3 py-2 text-sm outline-none focus:border-brand-orange"
            autoFocus
          />
        </div>
      )}
    </div>
  )
}

