import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import type { ArticleCardModel } from '@/components/cards/ArticleCard'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Listing, Post } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'

export const metadata = { title: 'Food' }

export default async function FoodPage() {
  const [listings, posts] = await Promise.all([
    safeFetch<Listing[]>(q.listingsByType, { type: 'food' }, []),
    safeFetch<Post[]>(q.latestPosts('food'), undefined, [])
  ])

  const allPosts = posts.length ? posts : dummyArticles.food
  const heroPost = allPosts[0] || {
    title: 'Food',
    excerpt: 'AZ food directory first. Articles second.',
    category: 'Food'
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
      {/* Food Stories */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-bold text-brand-dark">Food Stories</h2>
          <Link href="/" className="text-sm font-bold text-brand-orange hover:underline">See all</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {(posts.length ? posts.slice(0, 4) : dummyArticles.food).map((p, idx) => {
            const article = posts.length ? p : dummyArticles.food[idx]
            return (
              <div
                key={p && '_id' in p && p._id ? p._id : `food-story-${idx}`}
                className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-sm font-bold text-brand-dark">{article.title || p?.title || 'Food article'}</div>
                <p className="mt-2 text-sm text-brand-dark/70 line-clamp-2 leading-relaxed">{article.excerpt || p?.excerpt || 'Excerpt'}</p>
                <div className="mt-3">
                  <Link
                    href={
                      p && 'slug' in p && p.slug?.current ? `/article/${p.slug.current}` : '#'
                    }
                    className="text-sm font-bold text-brand-orange hover:underline"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Restaurant Listings */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-brand-dark">Restaurants</h2>
        </div>
        
        {/* In-content top */}
        <div className="mb-6">
          <AdSlot placement="food_in_content_top" size="rectangle" variant="display" label="Advertisement" />
        </div>

        <div className="grid gap-3">
          {(listings.length ? listings : new Array(12).fill(null)).map((l, idx) => {
            const isMid = idx === 5
            const isLower = idx === 8
            
            return (
              <div key={l?._id || idx}>
                <div className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold text-brand-dark">{l?.name || 'Restaurant Name'}</div>
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
                
                {/* In-content mid */}
                {isMid && (
                  <div className="mt-4">
                    <AdSlot placement="food_in_content_mid" size="leaderboard" variant="display" label="Advertisement" />
                  </div>
                )}

                {/* In-content lower */}
                {isLower && (
                  <div className="mt-4">
                    <AdSlot placement="food_in_content_lower" size="rectangle" variant="display" label="Advertisement" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </PageScaffold>
  )
}
