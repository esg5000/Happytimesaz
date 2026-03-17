import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Post } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'

export const metadata = { title: 'News' }

export default async function NewsPage() {
  const posts = await safeFetch<Post[]>(q.latestPosts(), undefined, [])

  const allPosts = posts.length ? posts : dummyArticles.news
  const heroPost = allPosts[0] || {
    title: 'News',
    excerpt: 'Latest stories across cannabis, food, nightlife, events, and more.',
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
        ]
      }}
      gridColumns={{ mobile: 2, tablet: 2, desktop: 3 }}
    >
      {/* In-feed ads are handled within the grid items */}
    </PageScaffold>
  )
}
