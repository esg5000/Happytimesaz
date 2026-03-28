import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import type { ArticleCardModel } from '@/components/cards/ArticleCard'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Deal, Listing, Post } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'
import { DISPENSARY_REGIONS, getDispensariesByRegion } from '@/lib/dispensary-data'
import { DealsGrid } from '@/components/cannabis/DealsGrid'
import { DispensaryDirectory } from '@/components/cannabis/DispensaryDirectory'

export const metadata = { title: 'Cannabis' }

export default async function CannabisPage() {
  const [deals, listings, posts] = await Promise.all([
    safeFetch<Deal[]>(q.dealsFeatured, undefined, []),
    safeFetch<Listing[]>(q.listingsByType, { type: 'dispensary' }, []),
    safeFetch<Post[]>(q.latestPosts('cannabis'), undefined, [])
  ])

  const dispensariesByRegion = getDispensariesByRegion()
  const allPosts = posts.length ? posts : dummyArticles.cannabis
  const heroPost = allPosts[0] || {
    title: 'Cannabis',
    excerpt: 'Dispensary directory + brand deals. Contextual monetization only.',
    category: 'Cannabis'
  }
  const gridItems = allPosts.slice(1, 30) as ArticleCardModel[]

  return (
    <PageScaffold
      billboard={{ placement: 'category_leaderboard', label: 'Advertisement' }}
      heroItem={heroPost}
      editorialGrid={{
        items: gridItems,
        sponsoredPlacement: 'category_grid_sponsored',
        nativePlacement: 'category_native_mid'
      }}
      rightRail={{
        adPlacements: [
          { placement: 'category_sidebar_mpu', size: 'rectangle', variant: 'display', label: 'Advertisement' }
        ]
      }}
    >
      {/* Featured Cannabis Deals */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <DealsGrid deals={deals} />
      </section>

      {/* Dispensary Directory */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-brand-dark">Arizona Dispensary Directory</h2>
          <p className="mt-2 text-sm text-brand-dark/70">
            {listings.length
              ? 'Find the best dispensaries across the state.'
              : `${dispensariesByRegion ? Object.values(dispensariesByRegion).reduce((sum, arr) => sum + arr.length, 0) : 0}+ dispensaries listed statewide — updated regularly.`}
          </p>
        </div>

        {listings.length ? (
          <>
            <DispensaryDirectory listings={listings} />
            <div className="mt-8">
              <AdSlot placement="cannabis_listing_leaderboard" size="leaderboard" variant="display" label="Advertisement" />
            </div>
            <div className="mt-6">
              <AdSlot placement="cannabis_listing_rectangle" size="rectangle" variant="display" label="Advertisement" />
            </div>
          </>
        ) : (
          /* Static dispensary directory organized by region */
          <div className="space-y-10">
            {DISPENSARY_REGIONS.map((region, regionIdx) => {
              const entries = dispensariesByRegion[region]
              if (!entries?.length) return null
              return (
                <div key={region}>
                  {/* Region header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-brand-light" />
                    <h3 className="shrink-0 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                      {region}
                    </h3>
                    <div className="h-px flex-1 bg-brand-light" />
                  </div>

                  {/* Dispensary cards for this region */}
                  <div className="grid gap-2 sm:grid-cols-2">
                    {entries.map((d) => (
                      <div
                        key={d.id}
                        className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-brand-dark">{d.name}</div>
                            <div className="mt-0.5 text-xs text-brand-dark/60">{d.address}</div>
                            <div className="mt-0.5 text-xs text-brand-dark/50">{d.city}, AZ</div>
                          </div>
                          <div className="shrink-0 flex flex-col gap-2 items-end">
                            <a
                              href={`tel:${d.phone.replace(/\D/g, '')}`}
                              className="rounded-xl border border-brand-light px-3 py-1.5 text-xs font-semibold text-brand-dark hover:bg-brand-light transition-colors"
                            >
                              {d.phone}
                            </a>
                            <div className="flex gap-2">
                              <a
                                className="rounded-xl border border-brand-light px-3 py-1.5 text-xs font-semibold text-brand-dark hover:bg-brand-light transition-colors"
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.address}, ${d.city}, AZ`)}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Directions
                              </a>
                              <a
                                className="rounded-xl bg-brand-orange px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-orange-600 transition-colors"
                                href={`https://www.google.com/search?q=${encodeURIComponent(`${d.name} ${d.city} AZ dispensary`)}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Search
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* In-feed ad after every 2nd region */}
                  {regionIdx === 1 && (
                    <div className="mt-6">
                      <AdSlot placement="cannabis_listing_leaderboard" size="leaderboard" variant="display" label="Advertisement" />
                    </div>
                  )}
                  {regionIdx === 4 && (
                    <div className="mt-6">
                      <AdSlot placement="cannabis_listing_rectangle" size="rectangle" variant="display" label="Advertisement" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Footer Banner */}
      <section className="mt-12 border-t border-az-sand/80 pt-6">
        <AdSlot
          placement="cannabis_footer_leaderboard"
          size="leaderboard"
          variant="display"
          label="Advertisement"
        />
      </section>
    </PageScaffold>
  )
}
