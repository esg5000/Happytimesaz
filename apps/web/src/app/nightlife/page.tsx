import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Listing, Post } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'

export const metadata = { title: 'Nightlife' }

export default async function NightlifePage() {
  const [listings, posts] = await Promise.all([
    safeFetch<Listing[]>(q.listingsByType, { type: 'nightlife' }, []),
    safeFetch<Post[]>(q.latestPosts('nightlife'), undefined, [])
  ])

  const allPosts = posts.length ? posts : dummyArticles.nightlife
  const heroPost = allPosts[0] || {
    title: 'Nightlife',
    excerpt: 'Pick the vibe. Go.',
    category: 'Nightlife'
  }
  const secondaryPosts = allPosts.slice(1, 30)

  return (
    <PageScaffold
      billboard={{
        adSlot: {
          size: '1920x400',
          position: 'hero-takeover',
          label: 'Featured Venue',
          section: 'nightlife',
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
            label: 'Happy Hour Specials',
            section: 'nightlife',
            sticky: true
          }
        ]
      }}
      gridColumns={{ mobile: 2, tablet: 2, desktop: 3 }}
    >
      {/* Venue Listings */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-brand-dark">Venues</h2>
        </div>

        {/* In-content top */}
        <div className="mb-6">
          <AdSlot 
            size="728x90" 
            position="in-content-top" 
            label="Drink Specials" 
            section="nightlife"
            mobileSize="320x50"
          />
        </div>

        <div className="grid gap-3">
          {(listings.length ? listings : new Array(12).fill(null)).map((l, idx) => {
            const isMid = idx === 5
            const isGridTile = idx === 3
            
            return (
              <div key={l?._id || idx}>
                {isGridTile ? (
                  <div className="mb-3">
                    <AdSlot 
                      size="300x250" 
                      position="grid-tile" 
                      label="Best Bars" 
                      section="nightlife"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-semibold text-brand-dark">{l?.name || 'Venue name'}</div>
                        <div className="mt-1 text-sm text-brand-dark/70">{l?.city || 'Phoenix, AZ'}</div>
                        <div className="mt-2 text-xs text-brand-dark/60">{l?.address || ''}</div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        {l?.website ? (
                          <a className="rounded-xl border border-brand-light px-3 py-2 text-xs font-semibold hover:bg-brand-light" href={l.website} target="_blank" rel="noreferrer">
                            Website
                          </a>
                        ) : null}
                        <Link className="rounded-xl bg-brand-dark px-3 py-2 text-xs font-semibold text-white hover:bg-brand-dark/90" href={l?.slug?.current ? `/listing/${l.slug.current}` : '#'}>
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* In-content mid */}
                {isMid && (
                  <div className="mt-4">
                    <AdSlot 
                      size="300x250" 
                      position="in-content-mid" 
                      label="Event Promoter" 
                      section="nightlife"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Nightlife Stories */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-bold text-brand-dark">Nightlife Stories</h2>
          <Link href="/" className="text-sm font-bold text-brand-orange hover:underline">See all</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {(posts.length ? posts.slice(0, 4) : dummyArticles.nightlife).map((p, idx) => {
            const article = posts.length ? p : dummyArticles.nightlife[idx]
            return (
              <div key={p?._id || `dummy-${idx}`} className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-bold text-brand-dark">{article.title || p?.title || 'Nightlife article'}</div>
                <p className="mt-2 text-sm text-brand-dark/70 line-clamp-2 leading-relaxed">{article.excerpt || p?.excerpt || 'Excerpt'}</p>
                <div className="mt-3">
                  <Link href={p?.slug?.current ? `/article/${p.slug.current}` : '#'} className="text-sm font-bold text-brand-orange hover:underline">Read →</Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer Banner */}
      <section className="mt-12 border-t border-brand-light pt-6">
        <AdSlot 
          size="970x90" 
          position="footer-banner" 
          label="Rideshare Partners" 
          section="nightlife"
          mobileSize="320x50"
        />
      </section>
    </PageScaffold>
  )
}
