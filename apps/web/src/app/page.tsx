import { PageScaffold } from '@/components/layout/PageScaffold'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Post, Event, Listing } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'
import Link from 'next/link'
import { AdSlot } from '@/components/AdSlot'

export default async function HomePage() {
  const [posts, events, nightlife] = await Promise.all([
    safeFetch<Post[]>(q.latestPosts(), undefined, []),
    safeFetch<Event[]>(q.eventsUpcoming, undefined, []),
    safeFetch<Listing[]>(q.listingsByType, { type: 'nightlife' }, [])
  ])

  const allPosts = posts.length ? posts : dummyArticles.news
  const heroPost = allPosts[0] || {
    title: 'Arizona discovery, without the noise.',
    excerpt: 'News, food, cannabis, nightlife, events, classes, and GTA Radio — built for fast browsing and real-world action.',
    category: 'News'
  }
  const secondaryPosts = allPosts.slice(1, 30)

  return (
    <PageScaffold
      billboard={{
        adSlot: {
          size: '970x90',
          position: 'top-leaderboard',
          label: 'Major Sponsors',
          section: 'news',
          mobileSize: '320x50'
        }
      }}
      heroItem={heroPost}
      secondaryItems={secondaryPosts}
      rightRail={{
        adSlots: [
          {
            size: '300x600',
            position: 'sidebar-sticky',
            label: 'Premium Sponsor',
            section: 'news',
            sticky: true
          }
        ],
        widgets: [
          <div key="events" className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm">
            <h3 className="text-sm font-bold text-brand-dark">Upcoming Events</h3>
            <div className="mt-3 space-y-2">
              {(events.length ? events.slice(0, 3) : new Array(3).fill(null)).map((e, idx) => (
                <Link 
                  key={e?._id || `event-${idx}`} 
                  href="/events" 
                  className="block rounded-lg border border-brand-light p-2 hover:bg-brand-light/50 transition-colors"
                >
                  <div className="text-xs font-semibold text-brand-dark">{e?.title || 'Event name'}</div>
                  <div className="mt-1 text-xs text-brand-dark/60">
                    {e?.dateTime ? new Date(e.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date TBA'}
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/events" className="mt-3 block text-xs font-bold text-brand-orange hover:underline">
              View All Events →
            </Link>
          </div>,
          <div key="nightlife" className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm">
            <h3 className="text-sm font-bold text-brand-dark">Featured Nightlife</h3>
            <div className="mt-3 space-y-2">
              {(nightlife.length ? nightlife.slice(0, 2) : new Array(2).fill(null)).map((l, idx) => (
                <Link 
                  key={l?._id || `nightlife-${idx}`} 
                  href="/nightlife" 
                  className="block rounded-lg border border-brand-light p-2 hover:bg-brand-light/50 transition-colors"
                >
                  <div className="text-xs font-semibold text-brand-dark">{l?.name || 'Venue name'}</div>
                  <div className="mt-1 text-xs text-brand-dark/60">{l?.city || 'Phoenix, AZ'}</div>
                </Link>
              ))}
            </div>
            <Link href="/nightlife" className="mt-3 block text-xs font-bold text-brand-orange hover:underline">
              Explore Nightlife →
            </Link>
          </div>
        ]
      }}
      gridColumns={{ mobile: 2, tablet: 2, desktop: 3 }}
    >
      {/* Newsletter section can be added as custom content */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="rounded-3xl border border-brand-light bg-brand-light/30 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-brand-dark">Daily updates. Zero spam.</h2>
          <p className="mt-2 max-w-2xl text-brand-dark/70">Get Arizona drops: deals, events, and the best new spots.</p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              placeholder="Email address"
              className="w-full rounded-xl border border-brand-light bg-white px-4 py-3 text-sm outline-none focus:border-brand-orange"
            />
            <button className="rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white hover:bg-brand-orange-600 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </PageScaffold>
  )
}
