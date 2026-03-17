import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-light bg-white">
      <div className="container-page py-10">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold text-brand-dark">HappytimesAZ</div>
            <p className="mt-2 text-sm text-brand-dark/70">Arizona-first discovery platform.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-brand-dark">Explore</div>
            <div className="mt-2 grid gap-2 text-sm">
              <Link className="text-brand-dark/70 hover:text-brand-orange transition-colors" href="/cannabis">Cannabis</Link>
              <Link className="text-brand-dark/70 hover:text-brand-orange transition-colors" href="/food">Food</Link>
              <Link className="text-brand-dark/70 hover:text-brand-orange transition-colors" href="/events">Events</Link>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-brand-dark">Business</div>
            <div className="mt-2 grid gap-2 text-sm">
              <Link className="text-brand-dark/70 hover:text-brand-orange transition-colors" href="/advertise">Advertise</Link>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-brand-dark">Legal</div>
            <p className="mt-2 text-sm text-brand-dark/70">© {new Date().getFullYear()} HappytimesAZ</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

