import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getImageUrl } from '@/lib/sanity/image'
import type { Ad } from '@/types/content'

export type AdSlotSize = 'leaderboard' | 'rectangle' | 'native-card'
export type AdSlotVariant = 'display' | 'affiliate' | 'sponsored-content'

const defaultLabels: Record<AdSlotVariant, string> = {
  display: 'Advertisement',
  affiliate: 'Partner Content',
  'sponsored-content': 'Sponsored'
}

function placeholderInner(size: AdSlotSize) {
  const box =
    size === 'leaderboard'
      ? 'aspect-[728/90] max-md:aspect-[320/50] max-md:max-h-[52px]'
      : size === 'rectangle'
        ? 'aspect-[300/250] max-w-[300px] mx-auto'
        : 'aspect-[16/9] md:aspect-[21/9]'

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center rounded-xl border border-dashed border-az-sand bg-white/60',
        box
      )}
    >
      <p className="px-4 text-center font-sans text-xs text-az-ink-muted">Your ad here — manage in Sanity</p>
    </div>
  )
}

export function AdRenderer({
  ad,
  size,
  variant = 'display',
  className,
  sticky,
  labelOverride
}: {
  ad: Ad | null
  size: AdSlotSize
  variant?: AdSlotVariant
  className?: string
  sticky?: boolean
  labelOverride?: string
}) {
  const label = labelOverride ?? defaultLabels[variant]

  const shell = (inner: ReactNode) => (
    <aside
      className={cn(
        'rounded-2xl border border-az-sand/90 bg-az-cream-dark/40 p-3 shadow-sm md:p-4',
        sticky && 'lg:sticky lg:top-24',
        size === 'leaderboard' && 'max-md:px-2 max-md:py-2',
        className
      )}
      data-ad-size={size}
      data-ad-variant={variant}
    >
      <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-az-ink-muted">{label}</p>
      {inner}
    </aside>
  )

  if (!ad) {
    return shell(placeholderInner(size))
  }

  if (ad.adType === 'html' && ad.html) {
    return shell(
      <div
        className={cn(
          'overflow-hidden rounded-xl bg-white',
          size === 'leaderboard' && 'max-md:max-h-[52px] max-md:[&_*]:max-h-[50px]'
        )}
      >
        <div className="ad-html [&_iframe]:max-w-full" dangerouslySetInnerHTML={{ __html: ad.html }} />
      </div>
    )
  }

  if (ad.adType === 'image' && ad.image) {
    const imageUrl = getImageUrl(ad.image, {
      width: size === 'rectangle' ? 600 : size === 'native-card' ? 800 : 1200,
      quality: 85
    })
    if (!imageUrl) return null

    const img = (
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl bg-az-sand/50',
          size === 'leaderboard' && 'aspect-[728/90] max-md:aspect-[320/50] max-md:max-h-[52px]',
          size === 'rectangle' && 'mx-auto aspect-[300/250] max-w-[300px]',
          size === 'native-card' && 'aspect-[16/9] md:aspect-[21/9]'
        )}
      >
        <Image
          src={imageUrl}
          alt={ad.headline || ad.title || 'Advertisement'}
          fill
          className="object-cover"
          sizes={
            size === 'rectangle'
              ? '300px'
              : size === 'native-card'
                ? '(max-width:768px) 100vw, 800px'
                : '(max-width:768px) 100vw, 970px'
          }
          unoptimized={imageUrl.startsWith('http')}
        />
        {(ad.headline || ad.cta) && size === 'native-card' ? (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-az-ink/80 via-az-ink/20 to-transparent p-4">
            {ad.headline ? <p className="font-display text-lg font-bold text-white">{ad.headline}</p> : null}
            {ad.cta && ad.linkUrl ? (
              <span className="mt-2 inline-flex w-fit rounded-full bg-az-gold px-4 py-2 font-sans text-xs font-bold text-az-ink">
                {ad.cta}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    )

    const linked = ad.linkUrl ? (
      <Link href={ad.linkUrl} target="_blank" rel="noopener noreferrer sponsored" className="block">
        {img}
      </Link>
    ) : (
      img
    )

    return shell(
      <div className="space-y-2">
        {linked}
        {size !== 'native-card' && ad.headline ? (
          <p className="font-sans text-sm font-semibold text-az-ink">{ad.headline}</p>
        ) : null}
        {size !== 'native-card' && ad.cta && ad.linkUrl ? (
          <Link
            href={ad.linkUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex rounded-full bg-az-terracotta px-4 py-2 font-sans text-xs font-bold text-white"
          >
            {ad.cta}
          </Link>
        ) : null}
      </div>
    )
  }

  return null
}
