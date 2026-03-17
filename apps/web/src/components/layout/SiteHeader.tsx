import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/food', label: 'Food' },
  { href: '/cannabis', label: 'Cannabis' },
  { href: '/nightlife', label: 'Nightlife' },
  { href: '/mushroom-guide', label: 'Mushroom Guide' },
  { href: '/events', label: 'Events' },
  { href: '/classes', label: 'Classes' },
  { href: '/gta-radio', label: 'GTA Radio' }
]

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn('sticky top-0 z-40 border-b border-brand-orange/20 bg-brand-orange/95 backdrop-blur', className)}>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-auto">
            <Image
              src="/assets/logos/TextV2.png"
              alt="Happy Times AZ"
              width={120}
              height={40}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-book text-brand-dark hover:text-brand-dark/80 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/advertise"
            className="hidden rounded-xl border border-brand-dark bg-brand-dark px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark/90 transition-colors md:inline-flex"
          >
            Advertise
          </Link>
        </div>
      </div>

      <div className="border-t border-brand-orange/20 lg:hidden">
        <div className="container-page flex items-center justify-between gap-3 overflow-x-auto py-2">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full bg-brand-dark/10 px-3 py-1 text-xs font-bold text-brand-dark hover:bg-brand-dark hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

