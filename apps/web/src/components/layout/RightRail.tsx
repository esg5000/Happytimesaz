import type React from 'react'
import { AdSlot, type AdSlotSize, type AdSlotVariant } from '@/components/AdSlot'
import Link from 'next/link'

export type RightRailAdConfig = {
  placement: string
  size: AdSlotSize
  variant?: AdSlotVariant
  label?: string
  sticky?: boolean
}

interface RightRailProps {
  adPlacements?: RightRailAdConfig[]
  widgets?: React.ReactNode[]
}

export function RightRail({ adPlacements = [], widgets = [] }: RightRailProps) {
  if (adPlacements.length === 0 && widgets.length === 0) return null

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24 space-y-6">
        {adPlacements.map((ad, idx) => (
          <AdSlot
            key={`${ad.placement}-${idx}`}
            placement={ad.placement}
            size={ad.size}
            variant={ad.variant ?? 'display'}
            label={ad.label}
            sticky={ad.sticky}
          />
        ))}

        {widgets.map((widget, idx) => (
          <div key={idx}>{widget}</div>
        ))}

        {widgets.length === 0 ? (
          <div className="rounded-2xl border border-az-sand/90 bg-white p-6 shadow-card">
            <h3 className="font-sans text-sm font-bold text-az-ink">Newsletter</h3>
            <p className="mt-2 font-sans text-xs text-az-ink-muted">Arizona drops in your inbox.</p>
            <form className="mt-4 space-y-2">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-az-sand bg-az-cream px-3 py-2 font-sans text-xs outline-none ring-az-terracotta/25 focus:ring-2"
              />
              <button
                suppressHydrationWarning
                type="button"
                className="w-full rounded-xl bg-az-terracotta px-3 py-2 font-sans text-xs font-bold text-white transition hover:bg-az-terracotta-deep"
              >
                Subscribe
              </button>
            </form>
            <Link
              href="/advertise"
              className="mt-4 inline-block font-sans text-xs font-semibold text-az-terracotta hover:underline"
            >
              Advertise with us →
            </Link>
          </div>
        ) : null}
      </div>
    </aside>
  )
}
