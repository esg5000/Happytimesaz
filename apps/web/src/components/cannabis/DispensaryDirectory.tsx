'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Listing } from '@/types/content'

type Coords = { lat: number; lng: number }

function toRad(n: number) {
  return (n * Math.PI) / 180
}

function haversineMiles(a: Coords, b: Coords) {
  const R = 3958.8 // earth radius in miles
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  return R * c
}

function listingCoords(l: Listing): Coords | null {
  const lat = l.location?.lat
  const lng = l.location?.lng
  if (typeof lat !== 'number' || typeof lng !== 'number') return null
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null
  return { lat, lng }
}

function normalize(s: string) {
  return s.trim().toLowerCase()
}

export function DispensaryDirectory({
  listings,
  initialNearCount = 10,
  initialResultsCount = 24
}: {
  listings: Listing[]
  initialNearCount?: number
  initialResultsCount?: number
}) {
  const [coords, setCoords] = useState<Coords | null>(null)
  const [geoState, setGeoState] = useState<'idle' | 'loading' | 'granted' | 'denied' | 'unavailable'>('idle')
  const [query, setQuery] = useState('')
  const [city, setCity] = useState<string>('all')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGeoState('unavailable')
      return
    }
    setGeoState('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoState('granted')
      },
      () => {
        setCoords(null)
        setGeoState('denied')
      },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 8_000 }
    )
  }, [])

  const cities = useMemo(() => {
    const set = new Set<string>()
    for (const l of listings) {
      if (l.city) set.add(l.city)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [listings])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return listings.filter((l) => {
      if (city !== 'all' && (l.city || '').toLowerCase() !== city.toLowerCase()) return false
      if (!q) return true
      const hay = `${l.name || ''} ${l.city || ''} ${l.address || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [listings, query, city])

  const near = useMemo(() => {
    const base = filtered
    if (!coords) return base.filter((l) => l.featured).slice(0, initialNearCount)

    const withDistance = base
      .map((l) => {
        const c = listingCoords(l)
        if (!c) return null
        return { l, miles: haversineMiles(coords, c) }
      })
      .filter(Boolean) as Array<{ l: Listing; miles: number }>

    if (!withDistance.length) return base.filter((l) => l.featured).slice(0, initialNearCount)

    withDistance.sort((a, b) => a.miles - b.miles)
    return withDistance.slice(0, initialNearCount).map((x) => x.l)
  }, [coords, filtered, initialNearCount])

  const results = useMemo(() => {
    if (!showAll) return filtered.slice(0, initialResultsCount)
    return filtered
  }, [filtered, showAll, initialResultsCount])

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-dark">Dispensaries Near You</h2>
          <p className="mt-2 text-sm text-brand-dark/70">
            {geoState === 'loading'
              ? 'Finding nearby dispensaries…'
              : geoState === 'granted'
                ? 'Showing the closest dispensaries based on your location.'
                : 'Turn on location to sort by distance. Otherwise, we’ll show featured dispensaries.'}
          </p>
        </div>
        <button
          type="button"
          className="h-10 rounded-full border border-brand-light bg-white px-4 text-sm font-semibold text-brand-dark hover:bg-brand-light/30"
          onClick={() => setShowAll(true)}
        >
          Browse full directory
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {near.map((l) => (
          <DispensaryCard key={l._id} listing={l} />
        ))}
      </div>

      <div className="rounded-3xl border border-brand-light bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-brand-dark">Find a dispensary</h3>
            <p className="mt-1 text-sm text-brand-dark/70">Search by name, city, or address. Keep it simple and fast.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search (name, city, address)…"
              className="h-11 w-full rounded-2xl border border-brand-light bg-white px-4 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 sm:w-80"
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

        <div className="mt-4 flex items-center justify-between text-xs text-brand-dark/60">
          <div>{filtered.length} results</div>
          {showAll ? (
            <button type="button" className="font-semibold text-brand-orange hover:underline" onClick={() => setShowAll(false)}>
              Show fewer
            </button>
          ) : null}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {results.map((l) => (
            <DispensaryCard key={l._id} listing={l} dense />
          ))}
        </div>

        {!showAll && filtered.length > initialResultsCount ? (
          <div className="mt-4">
            <button
              type="button"
              className="h-11 w-full rounded-2xl bg-brand-orange px-4 text-sm font-bold text-white hover:bg-brand-orange-600"
              onClick={() => setShowAll(true)}
            >
              Show more
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function DispensaryCard({ listing, dense }: { listing: Listing; dense?: boolean }) {
  return (
    <div className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-base font-semibold text-brand-dark">{listing.name}</div>
          <div className="mt-1 text-sm text-brand-dark/70">{listing.city || 'Arizona'}</div>
          {!dense ? <div className="mt-1 text-xs text-brand-dark/60">{listing.address || ''}</div> : null}
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {listing.website ? (
            <a
              className="rounded-xl border border-brand-light px-3 py-2 text-xs font-semibold hover:bg-brand-light transition-colors"
              href={listing.website}
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          ) : (
            <span className="rounded-xl border border-brand-light px-3 py-2 text-xs font-semibold text-brand-dark/40">
              Website pending
            </span>
          )}
          <Link
            className="rounded-xl bg-brand-orange px-3 py-2 text-xs font-bold text-white hover:bg-brand-orange-600 transition-colors"
            href={listing?.slug?.current ? `/listing/${listing.slug.current}` : '#'}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

