import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity/image'
import type { ArticleCardModel } from '@/components/cards/ArticleCard'

export function MagazineHero({ item }: { item: ArticleCardModel }) {
  const href = item.href ?? (item.slug?.current ? `/article/${item.slug.current}` : '/')
  const src = getImageUrl(
    (item as { heroImage?: unknown }).heroImage ??
      (item as { image?: unknown }).image ??
      null,
    { width: 1920, quality: 88 }
  )
  const cat =
    typeof item.category === 'string'
      ? item.category
      : item.category && typeof item.category === 'object'
        ? item.category.title
        : ''

  return (
    <section className="relative min-h-[min(85vh,40rem)] w-full overflow-hidden bg-az-ink md:min-h-[min(78vh,44rem)]">
      {src ? (
        <Image
          src={src}
          alt={item.title ? `${item.title} — hero` : 'Arizona lifestyle'}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized={src.startsWith('http')}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-az-terracotta via-az-ember to-az-ink"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-az-ink via-az-ink/55 to-az-ink/25" />

      <div className="container-page relative z-10 flex min-h-[min(85vh,40rem)] flex-col justify-end pb-12 pt-28 md:min-h-[min(78vh,44rem)] md:pb-16 md:pt-32">
        <div className="max-w-3xl">
          <p className="section-label mb-4 text-az-gold">What&apos;s happening in Arizona</p>
          {cat ? (
            <span className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.16em] text-az-cream backdrop-blur-sm">
              {cat}
            </span>
          ) : null}
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {item.title}
          </h1>
          {item.excerpt ? (
            <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-white/90 md:text-xl">
              {item.excerpt}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-full bg-az-gold px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-az-ink shadow-lg transition hover:bg-white"
            >
              Read the story
            </Link>
            <Link
              href="/food"
              className="font-sans text-sm font-semibold text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              Explore sections
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
