import Link from 'next/link'
import { SITE_NAV } from '@/lib/site-nav'

const CURRENT_YEAR = new Date().getUTCFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-az-sand bg-az-cream-dark/50">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="font-display text-2xl font-bold text-az-ink">HappytimesAZ</div>
            <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-az-ink-muted">
              Arizona lifestyle: food, cannabis, nightlife, mushrooms, events, classes — and GTA Radio. Editorial meets
              local culture.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <div className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-az-ink-muted">Sections</div>
              <ul className="grid gap-2 font-sans text-sm">
                {SITE_NAV.map((item) => (
                  <li key={item.href}>
                    <Link className="text-az-ink-muted transition hover:text-az-terracotta" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-az-ink-muted">Business</div>
              <ul className="grid gap-2 font-sans text-sm">
                <li>
                  <Link className="text-az-ink-muted transition hover:text-az-terracotta" href="/advertise">
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link className="text-az-ink-muted transition hover:text-az-terracotta" href="/news">
                    Latest stories
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-az-ink-muted">Legal</div>
              <p className="font-sans text-sm text-az-ink-muted">© {CURRENT_YEAR} HappytimesAZ. Arizona.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
