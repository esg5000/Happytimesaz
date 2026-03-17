import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
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
  const secondaryPosts = allPosts.slice(1, 30)

  return (
    <PageScaffold
      billboard={{
        adSlot: {
          size: '970x90',
          position: 'top-leaderboard',
          label: 'Premium Mushroom Brand',
          section: 'mushroom-guide',
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
            label: 'Vendor Spotlight #1',
            section: 'mushroom-guide'
          },
          {
            size: '300x250',
            position: 'sidebar-mid',
            label: 'Vendor Spotlight #2',
            section: 'mushroom-guide'
          },
          {
            size: '300x250',
            position: 'sidebar-bottom',
            label: 'Vendor Spotlight #3',
            section: 'mushroom-guide'
          }
        ]
      }}
      gridColumns={{ mobile: 2, tablet: 2, desktop: 3 }}
    >
      {/* Additional Guide Content */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6">
          <AdSlot 
            size="728x90" 
            position="in-content-top" 
            label="Educational Sponsor" 
            section="mushroom-guide"
            mobileSize="320x50"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {allPosts.map((p, idx) => {
            const isMid = idx === 3
            const isLower = idx === 6
            const article = posts.length ? p : dummyArticles['mushroom-guide'][idx]
            
            return (
              <div key={p?._id || `dummy-${idx}`}>
                <div className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-brand-orange/70 font-semibold uppercase tracking-wide">Guide</div>
                  <div className="mt-2 text-base font-bold text-brand-dark leading-tight">{article.title || p?.title || 'Mushroom article'}</div>
                  <p className="mt-2 text-sm text-brand-dark/70 line-clamp-3 leading-relaxed">{article.excerpt || p?.excerpt || 'Excerpt'}</p>
                  <div className="mt-4">
                    <Link href={p?.slug?.current ? `/article/${p.slug.current}` : '#'} className="text-sm font-bold text-brand-orange hover:underline">
                      Read Article →
                    </Link>
                  </div>
                </div>
                
                {/* In-guide mid */}
                {isMid && (
                  <div className="mt-4">
                    <AdSlot 
                      size="300x250" 
                      position="in-content-mid" 
                      label="Product Category" 
                      section="mushroom-guide"
                    />
                  </div>
                )}
                
                {/* In-guide lower */}
                {isLower && (
                  <div className="mt-4">
                    <AdSlot 
                      size="728x90" 
                      position="in-content-lower" 
                      label="Testing/Safety Services" 
                      section="mushroom-guide"
                      mobileSize="320x50"
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
          label="Community Resources" 
          section="mushroom-guide"
          mobileSize="320x50"
        />
      </section>
    </PageScaffold>
  )
}
