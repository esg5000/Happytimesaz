import { getAdByPlacement } from '@/lib/sanity/ads'
import { ArticleCard, type ArticleCardModel } from '@/components/cards/ArticleCard'
import { AdRenderer } from '@/components/ads/AdRenderer'
import type { Ad } from '@/types/content'

function adToArticleModel(ad: Ad): ArticleCardModel {
  return {
    _id: ad._id,
    title: ad.headline || ad.title,
    excerpt: ad.advertiser,
    heroImage: ad.image,
    href: ad.url || '#'
  }
}

type GridSlot = { kind: 'article'; item: ArticleCardModel } | { kind: 'sponsored' } | { kind: 'native' }

function buildGridSlots(items: ArticleCardModel[]): GridSlot[] {
  const slots: GridSlot[] = []
  let pi = 0
  let pos = 0
  let nativeDone = false
  while (pi < items.length) {
    pos++
    if (pos === 7 && !nativeDone) {
      slots.push({ kind: 'native' })
      nativeDone = true
      continue
    }
    if (pos % 6 === 0) {
      slots.push({ kind: 'sponsored' })
      continue
    }
    slots.push({ kind: 'article', item: items[pi++] })
  }
  return slots
}

export async function EditorialGridWithAds({
  items,
  sponsoredPlacement,
  nativePlacement
}: {
  items: ArticleCardModel[]
  sponsoredPlacement: string
  nativePlacement: string
}) {
  const [sponsoredAd, nativeAd] = await Promise.all([
    getAdByPlacement(sponsoredPlacement),
    getAdByPlacement(nativePlacement)
  ])

  const slots = buildGridSlots(items)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((s, idx) => {
        if (s.kind === 'native') {
          return (
            <div key={`native-${idx}`} className="col-span-full">
              <AdRenderer
                ad={nativeAd}
                size="native-card"
                variant="sponsored-content"
                labelOverride="Sponsored"
              />
            </div>
          )
        }
        if (s.kind === 'sponsored') {
          return (
            <div key={`sp-${idx}`} className="min-h-0">
              {sponsoredAd ? (
                <ArticleCard item={adToArticleModel(sponsoredAd)} disclosure="Sponsored" />
              ) : (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-az-sand bg-az-cream-dark/30 p-6 text-center">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-az-ink-muted">
                    Sponsored
                  </p>
                  <p className="mt-2 font-sans text-sm text-az-ink-muted">Your brand here</p>
                  <a
                    href="/advertise"
                    className="mt-4 font-sans text-sm font-bold text-az-terracotta hover:underline"
                  >
                    Advertise →
                  </a>
                </div>
              )}
            </div>
          )
        }
        return (
          <ArticleCard key={s.item._id || `a-${idx}`} item={s.item} priority={idx < 3} />
        )
      })}
    </div>
  )
}
