import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity/image'
import { cn } from '@/lib/utils'

export type ArticleCardModel = {
  _id?: string
  title: string
  excerpt?: string
  category?: string | { title?: string }
  heroImage?: unknown
  slug?: { current?: string }
  readTime?: number
  /** Overrides link target (e.g. events listing) */
  href?: string
  /** Secondary line under title when no excerpt (e.g. event date) */
  meta?: string
}

function categoryLabel(category: ArticleCardModel['category']) {
  if (!category) return ''
  return typeof category === 'string' ? category : category?.title || ''
}

export function ArticleCard({
  item,
  className,
  imageClassName,
  priority,
  layout = 'default',
  disclosure
}: {
  item: ArticleCardModel
  className?: string
  imageClassName?: string
  priority?: boolean
  /** Larger type for spotlight hero card */
  layout?: 'default' | 'featured'
  /** Overlay badge on image — Sponsored / Partner */
  disclosure?: 'Sponsored' | 'Partner'
}) {
  const href = item.href ?? (item.slug?.current ? `/article/${item.slug.current}` : '#')
  const cat = categoryLabel(item.category)
  const src = getImageUrl(
    (item as { heroImage?: unknown; image?: unknown; mainImage?: unknown }).heroImage ??
      (item as { image?: unknown }).image ??
      (item as { mainImage?: unknown }).mainImage ??
      null,
    { width: 800, quality: 82 }
  )
  const alt = item.title ? `${item.title} featured image` : 'Article image'

  return (
    <article className={cn('group h-full', className)}>
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-az-sand/90 bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-az-terracotta/25 hover:shadow-lift"
      >
        <div
          className={cn(
            'relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-az-sand/50',
            imageClassName
          )}
        >
          {disclosure ? (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-az-ink/90 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-white">
              {disclosure}
            </span>
          ) : null}
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={src.startsWith('http')}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-az-terracotta/15 to-az-gold/10">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-az-ink-muted">
                HappytimesAZ
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 md:p-5">
          {cat ? (
            <span className="mb-2 inline-flex w-fit rounded-full bg-az-terracotta/10 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-az-terracotta-deep">
              {cat}
            </span>
          ) : null}
          <h3
            className={cn(
              'font-display font-bold leading-snug tracking-tight text-az-ink line-clamp-3',
              layout === 'featured' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            )}
          >
            {item.title}
          </h3>
          {item.excerpt ? (
            <p
              className={cn(
                'mt-2 line-clamp-3 flex-1 font-sans leading-relaxed text-az-ink-muted',
                layout === 'featured' ? 'text-base md:text-lg' : 'text-sm line-clamp-2'
              )}
            >
              {item.excerpt}
            </p>
          ) : item.meta ? (
            <p
              className={cn(
                'mt-2 line-clamp-2 font-sans text-az-ink-muted',
                layout === 'featured' ? 'text-base' : 'text-sm'
              )}
            >
              {item.meta}
            </p>
          ) : (
            <div className="flex-1" />
          )}
          <div className="mt-4 flex items-center justify-between border-t border-az-sand/80 pt-3">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-az-terracotta">
              Read
            </span>
            {item.readTime != null ? (
              <span className="font-sans text-xs tabular-nums text-az-ink-muted">{item.readTime} min</span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  )
}
