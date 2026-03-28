'use client'

import Link from 'next/link'
import {
  CalendarDays,
  GraduationCap,
  Leaf,
  Music2,
  Radio,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon
} from 'lucide-react'
import { SITE_NAV } from '@/lib/site-nav'
import { cn } from '@/lib/utils'

const ICONS: Record<(typeof SITE_NAV)[number]['iconKey'], LucideIcon> = {
  food: UtensilsCrossed,
  cannabis: Leaf,
  nightlife: Music2,
  mushrooms: Sparkles,
  events: CalendarDays,
  classes: GraduationCap,
  radio: Radio
}

export function CategoryStrip({ className }: { className?: string }) {
  return (
    <section className={cn('border-b border-az-sand/80 bg-az-cream-dark/40 py-8 md:py-10', className)}>
      <div className="container-page">
        <p className="section-label mb-6">Jump in</p>
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:mx-0 md:grid md:grid-cols-7 md:gap-4 md:overflow-visible md:pb-0">
          {SITE_NAV.map((item) => {
            const Icon = ICONS[item.iconKey]
            const isRadio = item.isRadio
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative flex min-w-[7.5rem] flex-1 snap-start flex-col items-center rounded-2xl border p-4 text-center transition md:min-w-0',
                  isRadio
                    ? 'border-az-ink bg-az-ink text-az-cream shadow-md hover:border-az-terracotta hover:bg-az-terracotta'
                    : 'border-az-sand/90 bg-white shadow-card hover:border-az-terracotta/35 hover:shadow-lift'
                )}
              >
                <div
                  className={cn(
                    'mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition',
                    isRadio
                      ? 'bg-white/10 text-az-cream'
                      : 'bg-az-cream text-az-terracotta group-hover:bg-az-terracotta/10'
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={isRadio ? 2.25 : 2} aria-hidden />
                </div>
                <span
                  className={cn(
                    'font-display text-sm font-bold leading-tight',
                    isRadio ? 'uppercase tracking-wide' : ''
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    'mt-1 font-sans text-[11px] leading-tight',
                    isRadio ? 'text-az-cream/80' : 'text-az-ink-muted'
                  )}
                >
                  {item.tagline}
                </span>
                {isRadio ? (
                  <span className="absolute right-2 top-2 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
