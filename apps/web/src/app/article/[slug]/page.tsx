import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionHero } from '@/components/SectionHero'
import { AdSlot } from '@/components/AdSlot'
import { PortableText } from '@/components/PortableText'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'
import type { Post } from '@/types/content'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await safeFetch<Post | null>(q.postBySlug, { slug: params.slug }, null)
  if (!post) return notFound()

  // Convert heroImage to URL
  const heroImageUrl = getImageUrl(post.heroImage, {
    width: 1920,
    quality: 90
  })

  return (
    <div>
      <SectionHero 
        title={post.title} 
        subtitle={post.excerpt || ''} 
        heroImage={heroImageUrl || undefined}
      />

      <section className="bg-white">
        <div className="container-page py-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <p className="text-sm text-brand-dark/60 mb-6">
                {post.category?.title ? `${post.category.title} • ` : ''}
                {post.readTime ? `${post.readTime} min read` : ''}
              </p>

              <AdSlot type="INLINE" className="my-6" />

              {/* Render Portable Text body content */}
              <PortableText content={post.body} />

              <div className="mt-10">
                <Link href="/" className="text-sm font-semibold text-brand-orange hover:underline">
                  ← Back to News
                </Link>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-20 grid gap-3">
                <AdSlot type="HERO_COMPANION" />
                <AdSlot type="END_CAP" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
