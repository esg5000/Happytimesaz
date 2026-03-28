import { getAdByPlacement } from '@/lib/sanity/ads'
import { ArticleCard, type ArticleCardModel } from '@/components/cards/ArticleCard'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Post } from '@/types/content'

function adToPartnerCard(ad: NonNullable<Awaited<ReturnType<typeof getAdByPlacement>>>): ArticleCardModel {
  return {
    _id: ad._id,
    title: ad.headline || ad.title,
    excerpt: ad.advertiser,
    heroImage: ad.image,
    href: ad.url || '#'
  }
}

export async function RelatedArticlesRow({ slug, categorySlug }: { slug: string; categorySlug?: string | null }) {
  const relatedParams = categorySlug ? { slug, categorySlug } : { slug }
  const [related, affiliateAd] = await Promise.all([
    safeFetch<Post[]>(q.relatedPosts, relatedParams, []),
    getAdByPlacement('article_related_card')
  ])

  if (!related.length && !affiliateAd) return null

  return (
    <section className="mt-14 border-t border-az-sand/80 pt-10">
      <h2 className="font-display text-2xl font-bold text-az-ink md:text-3xl">You might also like</h2>
      <p className="mt-1 font-sans text-sm text-az-ink-muted">Editorial picks and partner recommendations</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.slice(0, 6).map((post, idx) => (
          <ArticleCard key={post._id || idx} item={post as ArticleCardModel} />
        ))}
        {affiliateAd ? (
          <ArticleCard item={adToPartnerCard(affiliateAd)} disclosure="Partner" />
        ) : null}
      </div>
    </section>
  )
}
