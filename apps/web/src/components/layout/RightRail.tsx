import type React from 'react'
import { AdSlot } from '@/components/AdSlot'
import Link from 'next/link'

interface RightRailProps {
  adSlots?: Array<{
    size: string
    position: string
    label: string
    section: string
    sticky?: boolean
  }>
  widgets?: React.ReactNode[]
}

export function RightRail({ adSlots = [], widgets = [] }: RightRailProps) {
  if (adSlots.length === 0 && widgets.length === 0) return null

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-20 space-y-6">
        {/* Ad Slots */}
        {adSlots.map((ad, idx) => (
          <AdSlot
            key={idx}
            size={ad.size}
            position={ad.position}
            label={ad.label}
            section={ad.section}
            sticky={ad.sticky}
          />
        ))}

        {/* Widgets */}
        {widgets.map((widget, idx) => (
          <div key={idx}>{widget}</div>
        ))}

        {/* Default Newsletter Widget if no widgets provided */}
        {widgets.length === 0 && (
          <div className="rounded-2xl border border-brand-light bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-brand-dark">Newsletter</h3>
            <p className="mt-2 text-xs text-brand-dark/70">Get Arizona drops delivered to your inbox.</p>
            <form className="mt-4 space-y-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-brand-light px-3 py-2 text-xs outline-none focus:border-brand-orange"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-orange px-3 py-2 text-xs font-bold text-white hover:bg-brand-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        )}
      </div>
    </aside>
  )
}

