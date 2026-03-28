import { PageScaffold } from '@/components/layout/PageScaffold'
import type { ArticleCardModel } from '@/components/cards/ArticleCard'
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
  const gridItems = allPosts.slice(1, 30) as ArticleCardModel[]

  return (
    <PageScaffold
      billboard={{
        placement: 'category_leaderboard',
        label: 'Advertisement'
      }}
      heroItem={heroPost}
      editorialGrid={{
        items: gridItems,
        sponsoredPlacement: 'category_grid_sponsored',
        nativePlacement: 'category_native_mid'
      }}
      rightRail={{
        adPlacements: [
          {
            placement: 'category_sidebar_mpu',
            size: 'rectangle',
            variant: 'display',
            label: 'Advertisement'
          }
        ]
      }}
    />
  )
}
