import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import type { ArticleCardModel } from '@/components/cards/ArticleCard'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import { formatDateUtc } from '@/lib/date'
import type { Event } from '@/types/content'
import { dummyEvents } from '@/lib/dummy-content'

export const metadata = { title: 'Events' }

function eventToGridItem(e: Pick<Event, 'title' | 'dateTime' | 'city' | 'link' | 'heroImage'> & { _id?: string }): ArticleCardModel {
  const when = e.dateTime
    ? formatDateUtc(e.dateTime, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
    : 'Date TBA'
  return {
    _id: e._id,
    title: e.title,
    heroImage: e.heroImage,
    category: 'Events',
    excerpt: `${e.city || 'Arizona'} · ${when}`,
    href: e.link || '/events'
  }
}

export default async function EventsPage() {
  const events = await safeFetch<Event[]>(q.eventsUpcoming, undefined, [])

  const allEvents = events.length ? events : dummyEvents
  const heroEvent = allEvents[0] || {
    title: 'Events',
    dateTime: '',
    city: 'Arizona',
    link: '/events'
  }

  const gridItems = allEvents.slice(1, 30).map(eventToGridItem)

  const heroExcerpt =
    typeof heroEvent.dateTime === 'string' && heroEvent.dateTime
      ? formatDateUtc(heroEvent.dateTime, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      : 'Plan fast. Date-first discovery.'

  return (
    <PageScaffold
      billboard={{ placement: 'category_leaderboard', label: 'Advertisement' }}
      heroItem={{
        title: heroEvent.title,
        excerpt: heroExcerpt,
        category: 'Events',
        slug: 'slug' in heroEvent ? heroEvent.slug : undefined,
        publishedAt: typeof heroEvent.dateTime === 'string' ? heroEvent.dateTime : undefined,
        heroImage: 'heroImage' in heroEvent ? heroEvent.heroImage : undefined
      }}
      editorialGrid={{
        items: gridItems,
        sponsoredPlacement: 'category_grid_sponsored',
        nativePlacement: 'category_native_mid'
      }}
      rightRail={{
        adPlacements: [
          { placement: 'category_sidebar_mpu', size: 'rectangle', variant: 'display', label: 'Advertisement' }
        ]
      }}
    >
      <section className="mt-12 border-t border-az-sand/80 pt-10">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-az-ink">All events</h2>
        </div>
        <div className="grid gap-3">
          {allEvents.map((e, idx) => {
            const isBetween = idx === 4 || idx === 8
            const event = events.length ? e : dummyEvents[idx]

            return (
              <div key={'_id' in e && e._id ? e._id : `evt-${idx}-${e.title}`}>
                <div className="rounded-2xl border border-az-sand/90 bg-white p-4 shadow-card transition-shadow hover:shadow-lift">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-sans text-base font-bold text-az-ink">{event.title || e?.title || 'Event title'}</div>
                      <div className="mt-1 font-sans text-sm text-az-ink-muted">
                        {event.dateTime
                          ? formatDateUtc(event.dateTime, {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })
                          : e?.dateTime
                            ? formatDateUtc(e.dateTime, {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })
                            : 'Date/time'}
                      </div>
                      <div className="mt-1 font-sans text-xs font-semibold text-az-terracotta">
                        {event.city || e?.city || 'Phoenix, AZ'}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {event.link || e?.link ? (
                        <a
                          className="rounded-xl bg-az-terracotta px-4 py-2 font-sans text-xs font-bold text-white transition hover:bg-az-terracotta-deep"
                          href={event.link || e.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Details
                        </a>
                      ) : (
                        <span className="rounded-xl border border-az-sand px-3 py-2 font-sans text-xs font-semibold text-az-ink-muted">
                          Link pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isBetween ? (
                  <div className="mt-4">
                    <AdSlot
                      placement="events_listing_leaderboard"
                      size="leaderboard"
                      variant="display"
                      label="Advertisement"
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </section>
    </PageScaffold>
  )
}
