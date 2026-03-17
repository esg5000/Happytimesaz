import type React from 'react'
import { UtilityBar } from './UtilityBar'
import { SiteHeader } from './SiteHeader'
import { Billboard } from './Billboard'
import { EditorialHero } from './EditorialHero'
import { SecondaryGrid } from './SecondaryGrid'
import { RightRail } from './RightRail'
import { SiteFooter } from './SiteFooter'

interface PageScaffoldProps {
  children?: React.ReactNode
  billboard?: React.ReactNode | {
    adSlot?: {
      size: string
      position: string
      label: string
      section: string
      mobileSize?: string
    }
  }
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
  secondaryItems: Array<{
    _id?: string
    title: string
    excerpt?: string
    category?: string | { title?: string }
    heroImage?: any
    slug?: { current: string }
    publishedAt?: string
    readTime?: number
  }>
  rightRail?: {
    adSlots?: Array<{
      size: string
      position: string
      label: string
      section: string
      sticky?: boolean
    }>
    widgets?: React.ReactNode[]
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
  secondaryItems,
  rightRail,
  gridColumns
}: PageScaffoldProps) {
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      
      {billboard && (
        typeof billboard === 'object' && 'adSlot' in billboard ? (
          <Billboard adSlot={billboard.adSlot} />
        ) : (
          <Billboard>{billboard}</Billboard>
        )
      )}

      <main className="bg-white">
        <section className="container-page py-10">
          <div className={rightRail ? 'grid gap-8 lg:grid-cols-12' : ''}>
            {/* Main Content */}
            <div className={rightRail ? 'lg:col-span-9' : ''}>
              {/* Editorial Hero */}
              <EditorialHero item={heroItem} href={heroHref} />

              {/* Secondary Grid */}
              {secondaryItems && secondaryItems.length > 0 && (
                <div className="mt-10">
                  <SecondaryGrid items={secondaryItems} columns={gridColumns} />
                </div>
              )}

              {/* Custom children content */}
              {children}
            </div>

            {/* Right Rail */}
            {rightRail && (
              <RightRail
                adSlots={rightRail.adSlots}
                widgets={rightRail.widgets}
              />
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

