import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Deal, Listing, Post } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'

export const metadata = { title: 'Cannabis' }

export default async function CannabisPage() {
  const [deals, listings, posts] = await Promise.all([
    safeFetch<Deal[]>(q.dealsFeatured, undefined, []),
    safeFetch<Listing[]>(q.listingsByType, { type: 'dispensary' }, []),
    safeFetch<Post[]>(q.latestPosts('cannabis'), undefined, [])
  ])

  const allPosts = posts.length ? posts : dummyArticles.cannabis
  const heroPost = allPosts[0] || {
    title: 'Cannabis',
    excerpt: 'Dispensary directory + brand deals. Contextual monetization only.',
    category: 'Cannabis'
  }
  const secondaryPosts = allPosts.slice(1, 30)

  return (
    <PageScaffold
      billboard={{
        adSlot: {
          size: '970x90',
          position: 'top-leaderboard',
          label: 'Dispensary Network',
          section: 'cannabis',
          mobileSize: '320x50'
        }
      }}
      heroItem={heroPost}
      secondaryItems={secondaryPosts}
      rightRail={{
        adSlots: [
          {
            size: '300x250',
            position: 'sidebar-top',
            label: 'Featured Dispensary #1',
            section: 'cannabis'
          },
          {
            size: '300x250',
            position: 'sidebar-mid',
            label: 'Featured Dispensary #2',
            section: 'cannabis'
          },
          {
            size: '300x250',
            position: 'sidebar-bottom',
            label: 'Featured Dispensary #3',
            section: 'cannabis'
          }
        ]
      }}
      gridColumns={{ mobile: 2, tablet: 3, desktop: 3 }}
    >
      {/* Featured Cannabis Deals */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-brand-dark">Featured Cannabis Deals</h2>
          <p className="mt-1 text-sm text-brand-dark/70">Deals live inside Cannabis. Always contextual.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {(deals.length ? deals.slice(0, 6) : new Array(6).fill(null)).map((d, idx) => (
            <div key={d?._id || idx} className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-orange/70">Sponsored</div>
              <div className="mt-2 text-base font-semibold text-brand-dark">{d?.title || 'Deal Title'}</div>
              <div className="mt-1 text-sm text-brand-dark/70">{d?.brandName || d?.dispensaryName || 'Brand / Dispensary'}</div>
              <div className="mt-1 text-xs text-brand-dark/60">{d?.city || 'Phoenix, AZ'}</div>
              <div className="mt-4 flex items-center justify-between">
                {d?.link ? (
                  <a className="text-sm font-bold text-brand-orange hover:underline" href={d.link} target="_blank" rel="noreferrer">
                    Claim Deal
                  </a>
                ) : (
                  <span className="text-sm text-brand-dark/40">Link pending</span>
                )}
                <span className="text-xs text-brand-dark/40">{d?.endDate ? `Ends ${new Date(d.endDate).toLocaleDateString()}` : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Dispensaries in Arizona */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-brand-dark">Top Dispensaries in Arizona</h2>
          <p className="mt-1 text-sm text-brand-dark/70">Find the best dispensaries across the state.</p>
        </div>
        <div className="grid gap-3">
          {(listings.length ? listings : new Array(12).fill(null)).map((l, idx) => {
            const isAfterSecond = idx === 1
            const isAfterFifth = idx === 4
            
            return (
              <div key={l?._id || idx}>
                <div className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold text-brand-dark">{l?.name || 'Dispensary name'}</div>
                      <div className="mt-1 text-sm text-brand-dark/70">{l?.city || 'Phoenix, AZ'}</div>
                      <div className="mt-2 text-xs text-brand-dark/60">{l?.address || ''}</div>
                      <div className="mt-3 flex gap-2">
                        <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-dark">
                          Reviews (coming soon)
                        </span>
                        <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-dark">
                          Jobs (coming soon)
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {l?.website ? (
                        <a className="rounded-xl border border-brand-light px-3 py-2 text-xs font-semibold hover:bg-brand-light transition-colors" href={l.website} target="_blank" rel="noreferrer">
                          Website
                        </a>
                      ) : null}
                      <Link className="rounded-xl bg-brand-orange px-3 py-2 text-xs font-bold text-white hover:bg-brand-orange-600 transition-colors" href={l?.slug?.current ? `/listing/${l.slug.current}` : '#'}>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* In-feed after 2nd item */}
                {isAfterSecond && (
                  <div className="mt-4">
                    <AdSlot 
                      size="728x90" 
                      position="in-feed" 
                      label="Product Spotlight" 
                      section="cannabis"
                      mobileSize="320x50"
                    />
                  </div>
                )}
                
                {/* In-feed after 5th item */}
                {isAfterFifth && (
                  <div className="mt-4">
                    <AdSlot 
                      size="300x250" 
                      position="in-feed" 
                      label="Brand Partnership" 
                      section="cannabis"
                    />
                  </div>
                )}
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
          label="Accessories/Services" 
          section="cannabis"
          mobileSize="320x50"
        />
      </section>
    </PageScaffold>
  )
}
