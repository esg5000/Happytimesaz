import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity/image'
import type { HomepageSettings } from '@/types/content'
import { cn } from '@/lib/utils'

/** Local asset in `public/images/hero/` — full-bleed hero backdrop */
const HERO_SECTION_BG = '/images/hero/Hero Easter.png'

function TileSmall({
  tile,
  className
}: {
  tile?: { title?: string; categoryTag?: string; image?: unknown; linkUrl?: string }
  className?: string
}) {
  if (!tile?.title) return null
  const src = getImageUrl(tile.image, { width: 800, quality: 82 })
  const href = tile.linkUrl || '#'
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex min-h-[10rem] flex-1 overflow-hidden rounded-2xl border border-az-sand/90 bg-az-ink shadow-card md:min-h-[12rem]',
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 40vw"
          unoptimized={src.startsWith('http')}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-az-terracotta/40 to-az-ember/60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-az-ink/90 via-az-ink/35 to-transparent" />
      <div className="relative z-10 mt-auto p-4 md:p-5">
        {tile.categoryTag ? (
          <span className="mb-1 inline-block font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-az-gold">
            {tile.categoryTag}
          </span>
        ) : null}
        <p className="font-display text-lg font-bold leading-snug text-white md:text-xl line-clamp-3">{tile.title}</p>
      </div>
    </Link>
  )
}

export function HeroMosaic({ settings }: { settings: HomepageSettings | null }) {
  const s = settings
  const hasMosaic = Boolean(s?.featuredHeadline && s?.featuredImage)

  if (!hasMosaic) {
    return (
      <section
        className="relative flex min-h-[60vh] max-h-[70vh] items-end overflow-hidden border-b border-az-sand/80 bg-az-ink md:min-h-[62vh]"
        aria-label="Featured"
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={HERO_SECTION_BG}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/80" />
        <div className="container-page relative z-10 pb-12 pt-24 md:pb-16">
          <p className="section-label mb-3 text-az-gold">HappytimesAZ</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            Arizona lifestyle — food, cannabis, nightlife, events &amp; GTA Radio
          </h1>
          <p className="mt-4 max-w-xl font-sans text-lg text-white/85">
            Add a <strong>Homepage (mosaic hero)</strong> document in Sanity to curate the three hero tiles.
          </p>
          <Link
            href="/news"
            className="mt-8 inline-flex rounded-full bg-az-gold px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-az-ink"
          >
            Read stories
          </Link>
        </div>
      </section>
    )
  }

  const mainSrc = getImageUrl(s!.featuredImage, { width: 1800, quality: 88 })
  const ctaHref = s!.featuredCtaUrl || '/'
  const ctaLabel = s!.featuredCtaLabel || 'Explore'

  return (
    <section
      className="relative overflow-hidden border-b border-az-sand/80 bg-az-ink"
      aria-label="Featured mosaic"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={HERO_SECTION_BG}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/65" />
      <div className="container-page relative z-10 py-4 md:py-6">
        <div className="grid min-h-[min(68vh,40rem)] max-h-[70vh] grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {/* ~60% large tile */}
          <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-az-sand/90 lg:col-span-7">
            {mainSrc ? (
              <Image
                src={mainSrc}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 60vw"
                unoptimized={mainSrc.startsWith('http')}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-az-terracotta to-az-ember" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-az-ink/92 via-az-ink/45 to-az-ink/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              {s!.featuredThemeLabel ? (
                <span className="mb-3 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.12em] text-az-gold backdrop-blur-sm">
                  {s!.featuredThemeLabel}
                </span>
              ) : null}
              <h1 className="max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-5xl">
                {s!.featuredHeadline}
              </h1>
              {s!.featuredSubheadline ? (
                <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/90 md:text-lg">
                  {s!.featuredSubheadline}
                </p>
              ) : null}
              <Link
                href={ctaHref}
                className="mt-8 inline-flex w-fit rounded-full bg-az-gold px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-az-ink transition hover:bg-white"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* ~40% stacked */}
          <div className="flex min-h-0 flex-col gap-4 lg:col-span-5">
            <TileSmall tile={s!.tileTop} className="flex-1" />
            <TileSmall tile={s!.tileBottom} className="flex-1" />
          </div>
        </div>
      </div>
    </section>
  )
}
