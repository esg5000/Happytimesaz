import React, { type ReactNode } from 'react'
import { UtilityBar } from './UtilityBar'
import { SiteHeader } from './SiteHeader'
import { Billboard } from './Billboard'
import { EditorialHero } from './EditorialHero'
import { SecondaryGrid } from './SecondaryGrid'
import { EditorialGridWithAds } from '@/components/publication/EditorialGridWithAds'
import { RightRail, type RightRailAdConfig } from './RightRail'
import { SiteFooter } from './SiteFooter'
import type { ArticleCardModel } from '@/components/cards/ArticleCard'

interface PageScaffoldProps {
  children?: ReactNode
  billboard?: React.ReactNode | { placement: string; label?: string }
  heroItem: {
    title: string
    excerpt?: string
    category?: string | { title?: string; slug?: { current: string } }
    heroImage?: any
    slug?: { current: string }
    publishedAt?: string
    readTime?: number
    author?: string
  }
  heroHref?: string
  /** Legacy simple grid without sponsored slots — prefer `editorialGrid`. */
  secondaryItems?: Array<{
    _id?: string
    title: string
    excerpt?: string
    category?: string | { title?: string }
    heroImage?: any
    slug?: { current: string }
    publishedAt?: string
    readTime?: number
    href?: string
    meta?: string
  }>
  /** Publication grid: every 6th sponsored + native row after two rows. */
  editorialGrid?: {
    items: ArticleCardModel[]
    sponsoredPlacement: string
    nativePlacement: string
  }
  rightRail?: {
    adPlacements?: RightRailAdConfig[]
    widgets?: ReactNode[]
  }
  gridColumns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export function PageScaffold({
  children,
  billboard,
  heroItem,
  heroHref,
  secondaryItems = [],
  editorialGrid,
  rightRail,
  gridColumns
}: PageScaffoldProps) {
  return (
    <>
      <UtilityBar />
      <SiteHeader />

      {billboard
        ? React.isValidElement(billboard) ||
          typeof billboard === 'string' ||
          typeof billboard === 'number' ||
          Array.isArray(billboard) ? (
          <Billboard>{billboard}</Billboard>
        ) : typeof billboard === 'object' &&
          billboard !== null &&
          'placement' in billboard &&
          typeof (billboard as { placement: unknown }).placement === 'string' ? (
          <Billboard
            placement={(billboard as { placement: string }).placement}
            label={(billboard as { label?: string }).label}
          />
        ) : (
          <Billboard>{billboard as ReactNode}</Billboard>
        )
        : null}

      <main className="bg-az-cream">
        <section className="container-page py-10 md:py-12">
          <div className={rightRail ? 'grid gap-8 lg:grid-cols-12' : ''}>
            <div className={rightRail ? 'lg:col-span-9' : ''}>
              <EditorialHero item={heroItem} href={heroHref} />

              {editorialGrid ? (
                <div className="mt-10">
                  <EditorialGridWithAds
                    items={editorialGrid.items}
                    sponsoredPlacement={editorialGrid.sponsoredPlacement}
                    nativePlacement={editorialGrid.nativePlacement}
                  />
                </div>
              ) : secondaryItems.length > 0 ? (
                <div className="mt-10">
                  <SecondaryGrid items={secondaryItems} columns={gridColumns} />
                </div>
              ) : null}

              {children}
            </div>

            {rightRail ? <RightRail adPlacements={rightRail.adPlacements} widgets={rightRail.widgets} /> : null}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
