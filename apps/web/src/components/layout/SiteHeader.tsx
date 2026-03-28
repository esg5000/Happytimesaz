'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EDITORIAL_NAV, RADIO_NAV_ITEM, SITE_NAV } from '@/lib/site-nav'

export function SiteHeader({ className }: { className?: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[100] border-b border-az-sand/80 bg-az-cream/92 backdrop-blur-md',
          className
        )}
      >
        <div className="container-page flex h-16 items-center gap-4 md:h-[4.5rem] md:gap-6">
          <Link href="/" className="relative z-[110] flex shrink-0 items-center gap-2">
            <div className="relative h-9 w-auto md:h-10">
              <Image
                src="/assets/logos/TextV2.png"
                alt="HappytimesAZ"
                width={140}
                height={44}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center nav — desktop */}
          <nav
            className="mx-auto hidden flex-1 items-center justify-center gap-1 lg:flex lg:gap-0.5 xl:gap-1"
            aria-label="Main"
          >
            {EDITORIAL_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 font-sans text-sm font-semibold text-az-ink transition-colors hover:bg-az-sand/60 hover:text-az-terracotta xl:px-3.5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={RADIO_NAV_ITEM.href}
              className="group relative ml-2 flex items-center gap-2 rounded-full border-2 border-az-ink bg-az-ink px-4 py-2 font-sans text-sm font-bold uppercase tracking-wide text-az-cream shadow-sm transition hover:border-az-terracotta hover:bg-az-terracotta"
            >
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {RADIO_NAV_ITEM.label}
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <Link
              href="/advertise"
              className="hidden rounded-full border border-az-ink/15 bg-white px-4 py-2 font-sans text-sm font-semibold text-az-ink shadow-sm transition hover:border-az-terracotta hover:text-az-terracotta md:inline-flex"
            >
              Advertise
            </Link>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-az-sand bg-white text-az-ink shadow-sm transition hover:border-az-terracotta lg:hidden"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="h-5 w-5" aria-hidden />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[200] lg:hidden',
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className={cn(
            'absolute inset-0 bg-az-ink/40 backdrop-blur-sm transition-opacity',
            drawerOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        />
        <div
          id="mobile-drawer"
          className={cn(
            'absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-az-cream shadow-lift transition-transform duration-300 ease-out',
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between border-b border-az-sand px-4 py-4">
            <span className="font-display text-lg font-bold text-az-ink">Menu</span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-az-sand bg-white"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile">
            {SITE_NAV.map((item) =>
              item.isRadio ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-az-ink px-4 py-3 font-sans text-base font-bold uppercase tracking-wide text-az-cream"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-xl px-4 py-3 font-sans text-base font-semibold text-az-ink transition hover:bg-az-sand/80"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/advertise"
              onClick={() => setDrawerOpen(false)}
              className="mt-4 rounded-full border border-az-terracotta px-4 py-3 text-center font-sans text-sm font-bold text-az-terracotta"
            >
              Advertise
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
