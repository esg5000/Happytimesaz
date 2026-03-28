import Link from 'next/link'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { HeroMosaic } from '@/components/home/HeroMosaic'
import { CategoryStrip } from '@/components/home/CategoryStrip'
import { VerticalSpotlight } from '@/components/home/VerticalSpotlight'
import { ArticleCard, type ArticleCardModel } from '@/components/cards/ArticleCard'
import { EditorialGridWithAds } from '@/components/publication/EditorialGridWithAds'
import { AdSlot } from '@/components/AdSlot'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import { formatDateUtc } from '@/lib/date'
import type { Post, Event, HomepageSettings } from '@/types/content'
import { dummyArticles } from '@/lib/dummy-content'

const FALLBACK_HERO: ArticleCardModel = {
  title: "What's happening across Arizona",
  excerpt:
    'Food, cannabis, nightlife, mushrooms, events, and classes — plus GTA Radio. A local guide to the state we love.',
  category: 'HappytimesAZ',
  href: '/food'
}

function eventToCard(e: Event): ArticleCardModel {
  return {
    _id: e._id,
    title: e.title,
    heroImage: e.heroImage,
    category: 'Events',
    meta: [
      e.city || 'Arizona',
      e.dateTime
        ? formatDateUtc(e.dateTime, { month: 'short', day: 'numeric', year: 'numeric' })
        : null
    ]
      .filter(Boolean)
      .join(' · '),
    href: '/events'
  }
}

function asModels(posts: Post[]): ArticleCardModel[] {
  return posts as unknown as ArticleCardModel[]
}

function tripleModels(items: ArticleCardModel[]): [ArticleCardModel, ArticleCardModel, ArticleCardModel] {
  const a = items[0] ?? FALLBACK_HERO
  const b = items[1] ?? a
  const c = items[2] ?? b
  return [a, b, c]
}

export default async function HomePage() {
  const [posts, cannabisPosts, events, homepage] = await Promise.all([
    safeFetch<Post[]>(q.latestPosts(), undefined, []),
    safeFetch<Post[]>(q.latestPosts('cannabis'), undefined, []),
    safeFetch<Event[]>(q.eventsUpcoming, undefined, []),
    safeFetch<HomepageSettings | null>(q.homepageSettings, undefined, null)
  ])

  const dummy = dummyArticles.news as unknown as Post[]
  const allPosts = posts.length ? posts : dummy

  const canPool = cannabisPosts.length >= 3 ? cannabisPosts : cannabisPosts.length ? [...cannabisPosts, ...allPosts] : allPosts
  const [canL, canS1, canS2] = tripleModels(asModels(canPool.slice(0, 12)))

  const eventPlaceholders: ArticleCardModel[] = [
    { title: 'Valley nights & desert stages', category: 'Events', meta: 'Phoenix · See calendar', href: '/events' },
    { title: 'Food, music & culture', category: 'Events', meta: 'Statewide · Date TBA', href: '/events' },
    { title: 'Your weekend starts here', category: 'Events', meta: 'Arizona · Updated weekly', href: '/events' }
  ]
  const eventModels = events.map(eventToCard)
  while (eventModels.length < 3) {
    eventModels.push(eventPlaceholders[eventModels.length])
  }
  const [evL, evS1, evS2] = tripleModels(eventModels.slice(0, 3))

  return (
    <>
      <SiteHeader />
      <main className="bg-az-cream">
        <HeroMosaic settings={homepage} />

        <div className="container-page py-6 md:py-8">
          <AdSlot placement="homepage_leaderboard" size="leaderboard" variant="display" label="Advertisement" />
        </div>

        <CategoryStrip />

        <section className="py-12 md:py-16">
          <div className="container-page">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label mb-2">The latest</p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-az-ink md:text-4xl">
                  Fresh from across Arizona
                </h2>
              </div>
              <Link
                href="/news"
                className="font-sans text-sm font-bold uppercase tracking-wider text-az-terracotta hover:underline"
              >
                More stories →
              </Link>
            </div>
            <EditorialGridWithAds
              items={allPosts as ArticleCardModel[]}
              sponsoredPlacement="homepage_grid_sponsored"
              nativePlacement="homepage_native_mid"
            />
          </div>
        </section>

        <VerticalSpotlight
          className="border-t border-az-sand/80 bg-white/60"
          subtitle="High value vertical"
          title="Cannabis"
          href="/cannabis"
          large={canL}
          small={[canS1, canS2]}
          aside={<AdSlot placement="spotlight_cannabis_sidebar" size="rectangle" variant="display" label="Advertisement" />}
        />

        <VerticalSpotlight
          className="border-t border-az-sand/80"
          subtitle="On the calendar"
          title="Events"
          href="/events"
          large={evL}
          small={[evS1, evS2]}
          aside={<AdSlot placement="spotlight_events_sidebar" size="rectangle" variant="display" label="Advertisement" />}
        />

        <section className="border-t border-az-sand/80 py-12 md:py-16">
          <div className="container-page">
            <div className="rounded-3xl border border-az-sand bg-gradient-to-br from-white to-az-cream-dark/50 p-8 shadow-card md:p-12">
              <p className="section-label mb-2">Newsletter</p>
              <h2 className="font-display text-3xl font-bold text-az-ink">Daily drops. Zero spam.</h2>
              <p className="mt-3 max-w-2xl font-sans text-az-ink-muted">
                Arizona food openings, events, deals, and nightlife — in one short read.
              </p>
              <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <input
                  suppressHydrationWarning
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="h-12 flex-1 rounded-full border border-az-sand bg-white px-5 font-sans text-sm outline-none ring-az-terracotta/30 focus:ring-2"
                />
                <button
                  suppressHydrationWarning
                  type="button"
                  className="h-12 rounded-full bg-az-terracotta px-8 font-sans text-sm font-bold uppercase tracking-wider text-white transition hover:bg-az-terracotta-deep"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
