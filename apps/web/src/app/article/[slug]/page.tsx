import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SectionHero } from '@/components/SectionHero'
import { AdSlot } from '@/components/AdSlot'
import { PortableText } from '@/components/PortableText'
import { PartnerCallout } from '@/components/ads/PartnerCallout'
import { RelatedArticlesRow } from '@/components/article/RelatedArticlesRow'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'
import { splitArticleBodyForAds } from '@/lib/articleBodySplit'
import type { Post } from '@/types/content'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const { slug } = await params
  await searchParams
  const post = await safeFetch<Post | null>(q.postBySlug, { slug }, null)
  if (!post) return notFound()

  const heroImageUrl = getImageUrl(post.heroImage, {
    width: 1920,
    quality: 90
  })

  const { intro, mid, tail } = splitArticleBodyForAds(post.body)

  return (
    <>
      <SiteHeader />
      <SectionHero title={post.title} subtitle={post.excerpt || ''} heroImage={heroImageUrl || undefined} />

      <section className="bg-az-cream">
        <div className="container-page py-10 md:py-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <p className="mb-6 font-sans text-sm text-az-ink-muted">
                {post.category?.title ? `${post.category.title} · ` : ''}
                {post.readTime ? `${post.readTime} min read` : ''}
              </p>

              {intro.length > 0 ? <PortableText content={intro} /> : null}

              <div className="my-8">
                <AdSlot
                  placement="article_inline_banner"
                  size="leaderboard"
                  variant="display"
                  label="Advertisement"
                />
              </div>

              {mid.length > 0 ? <PortableText content={mid} /> : null}

              <PartnerCallout />

              {tail.length > 0 ? <PortableText content={tail} /> : null}

              <RelatedArticlesRow slug={slug} categorySlug={post.category?.slug?.current} />

              <div className="mt-10">
                <Link href="/news" className="text-sm font-semibold text-az-terracotta hover:underline">
                  ← Back to stories
                </Link>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <AdSlot placement="article_sidebar_mpu" size="rectangle" variant="display" label="Advertisement" />
              </div>
            </aside>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}
