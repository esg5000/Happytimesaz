import type { ReactNode } from 'react'
import { ArticleCard, type ArticleCardModel } from '@/components/cards/ArticleCard'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function VerticalSpotlight({
  title,
  subtitle,
  href,
  large,
  small,
  className,
  /** Desktop-only 300px sidebar (e.g. AdSlot) */
  aside
}: {
  title: string
  subtitle?: string
  href: string
  large: ArticleCardModel
  small: [ArticleCardModel, ArticleCardModel]
  className?: string
  aside?: ReactNode
}) {
  return (
    <section className={cn('py-10 md:py-12', className)}>
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label mb-2">{subtitle || 'Spotlight'}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-az-ink md:text-4xl">
              {title}
            </h2>
          </div>
          <Link
            href={href}
            className="font-sans text-sm font-bold uppercase tracking-wider text-az-terracotta hover:underline"
          >
            View all →
          </Link>
        </div>

        <div
          className={cn(
            'grid gap-8',
            aside ? 'lg:grid-cols-[1fr_minmax(260px,300px)] lg:items-start' : ''
          )}
        >
          <div className="min-w-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ArticleCard
                  item={large}
                  priority
                  layout="featured"
                  className="h-full"
                  imageClassName="min-h-[14rem] sm:min-h-[18rem] lg:min-h-[22rem]"
                />
              </div>
              <div className="flex flex-col gap-6">
                <ArticleCard item={small[0]} imageClassName="aspect-[16/9]" />
                <ArticleCard item={small[1]} imageClassName="aspect-[16/9]" />
              </div>
            </div>
          </div>
          {aside ? (
            <div className="hidden lg:block">
              <div className="lg:sticky lg:top-28">{aside}</div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
