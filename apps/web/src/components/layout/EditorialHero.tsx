import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types/content'
import { getImageUrl } from '@/lib/sanity/image'

interface EditorialHeroProps {
  item: {
    title: string
    excerpt?: string
    category?: string | { title?: string; slug?: { current: string } }
    heroImage?: any
    slug?: { current: string }
    publishedAt?: string
    readTime?: number
    author?: string
  }
  href?: string
}

export function EditorialHero({ item, href }: EditorialHeroProps) {
  const categoryTitle = typeof item.category === 'string' 
    ? item.category 
    : item.category?.title || 'News'
  
  const categorySlug = typeof item.category === 'object' && item.category?.slug?.current
    ? item.category.slug.current
    : categoryTitle.toLowerCase().replace(/\s+/g, '-')

  // Use urlFor helper to get proper Sanity image URL
  const src = getImageUrl(item?.heroImage ?? item?.image ?? item?.mainImage ?? null, {
    width: 1200,
    quality: 85
  })

  // Safe alt text - never undefined
  const altText = item?.title ? `${item.title} featured image` : 'Featured image'

  return (
    <article className="group">
      <Link href={href || (item.slug?.current ? `/article/${item.slug.current}` : '#')} className="block">
        {/* Image */}
        {src ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-brand-light">
            <Image
              src={src}
              alt={altText}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-brand-light/60">
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-sm text-brand-dark/40">No image available</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-4">
          {/* Category */}
          {categoryTitle && (
            <div className="mb-2">
              <span className="inline-block rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-orange">
                {categoryTitle}
              </span>
            </div>
          )}

          {/* Headline */}
          <h1 className="text-3xl font-black leading-tight tracking-tight text-brand-dark md:text-4xl lg:text-5xl line-clamp-3">
            {item.title}
          </h1>

          {/* Excerpt */}
          {item.excerpt && (
            <p className="mt-3 text-lg text-brand-dark/70 line-clamp-2">
              {item.excerpt}
            </p>
          )}

          {/* Byline */}
          <div className="mt-4 flex items-center gap-4 text-sm text-brand-dark/60">
            {item.author && <span>{item.author}</span>}
            {item.publishedAt && (
              <time dateTime={item.publishedAt}>
                {new Date(item.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            )}
            {item.readTime && <span>{item.readTime} min read</span>}
          </div>
        </div>
      </Link>
    </article>
  )
}

