import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import type { ArticleCardModel } from '@/components/cards/ArticleCard'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Post } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'

export const metadata = { title: 'Mushroom Guide' }

export default async function MushroomGuidePage() {
  const posts = await safeFetch<Post[]>(q.latestPosts('mushroom'), undefined, [])

  const allPosts = posts.length ? posts : dummyArticles['mushroom-guide']
  const heroPost = allPosts[0] || {
    title: 'Mushroom Guide',
    excerpt: 'Education-first. Clean reading. Minimal monetization.',
    category: 'Mushroom Guide'
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
      {/* Additional Guide Content */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6">
          <AdSlot placement="mushroom_guide_top" size="leaderboard" variant="display" label="Advertisement" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {allPosts.map((p, idx) => {
            const isMid = idx === 3
            const isLower = idx === 6
            const article = posts.length ? p : dummyArticles['mushroom-guide'][idx]
            
            return (
              <div key={p && '_id' in p && p._id ? p._id : `mush-${idx}`}>
                <div className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-brand-orange/70 font-semibold uppercase tracking-wide">Guide</div>
                  <div className="mt-2 text-base font-bold text-brand-dark leading-tight">{article.title || p?.title || 'Mushroom article'}</div>
                  <p className="mt-2 text-sm text-brand-dark/70 line-clamp-3 leading-relaxed">{article.excerpt || p?.excerpt || 'Excerpt'}</p>
                  <div className="mt-4">
                    <Link
                      href={
                        p && 'slug' in p && p.slug?.current ? `/article/${p.slug.current}` : '#'
                      }
                      className="text-sm font-bold text-brand-orange hover:underline"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
                
                {/* In-guide mid */}
                {isMid && (
                  <div className="mt-4">
                    <AdSlot placement="mushroom_guide_mid" size="rectangle" variant="display" label="Advertisement" />
                  </div>
                )}
                
                {/* In-guide lower */}
                {isLower && (
                  <div className="mt-4">
                    <AdSlot placement="mushroom_guide_lower" size="leaderboard" variant="display" label="Advertisement" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer Banner */}
      <section className="mt-12 border-t border-az-sand/80 pt-6">
        <AdSlot placement="mushroom_footer_leaderboard" size="leaderboard" variant="display" label="Advertisement" />
      </section>
    </PageScaffold>
  )
}
