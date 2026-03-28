'use client'

import { useMemo, useState } from 'react'
import type { Deal } from '@/types/content'
import { formatDateUtc } from '@/lib/date'

function normalize(s: string) {
  return s.trim().toLowerCase()
}

export function DealsGrid({ deals }: { deals: Deal[] }) {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState<string>('all')

  const cities = useMemo(() => {
    const set = new Set<string>()
    for (const d of deals) {
      if (d.city) set.add(d.city)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [deals])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return deals.filter((d) => {
      if (city !== 'all' && (d.city || '').toLowerCase() !== city.toLowerCase()) return false
      if (!q) return true
      const hay = `${d.title || ''} ${d.brandName || ''} ${d.dispensaryName || ''} ${d.city || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [deals, query, city])

  return (
    <div className="rounded-3xl border border-brand-light bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-lg font-bold text-brand-dark">Featured Cannabis Deals</h3>
          <p className="mt-1 text-sm text-brand-dark/70">Optional, lightweight promos. No daily menu upkeep.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deals…"
            className="h-11 w-full rounded-2xl border border-brand-light bg-white px-4 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 sm:w-72"
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-11 w-full rounded-2xl border border-brand-light bg-white px-4 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange/40 sm:w-56"
          >
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 text-xs text-brand-dark/60">{filtered.length} deals</div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {(filtered.length ? filtered : new Array(6).fill(null)).slice(0, 12).map((d, idx) => (
          <div
            key={d?._id || idx}
            className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-brand-orange/70">Sponsored</div>
            <div className="mt-2 text-base font-semibold text-brand-dark">{d?.title || 'Deal Title'}</div>
            <div className="mt-1 text-sm text-brand-dark/70">{d?.brandName || d?.dispensaryName || 'Brand / Dispensary'}</div>
            <div className="mt-1 text-xs text-brand-dark/60">{d?.city || 'Phoenix, AZ'}</div>
            <div className="mt-4 flex items-center justify-between">
              {d?.link ? (
                <a className="text-sm font-bold text-brand-orange hover:underline" href={d.link} target="_blank" rel="noreferrer">
                  Claim Deal
                </a>
              ) : (
                <span className="text-sm text-brand-dark/40">Link pending</span>
              )}
              <span className="text-xs text-brand-dark/40">
                {d?.endDate ? `Ends ${formatDateUtc(d.endDate, { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

