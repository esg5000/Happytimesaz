import Link from 'next/link'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { AdSlot } from '@/components/AdSlot'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Event } from '@/types/content'
import { dummyEvents } from '@/lib/dummy-content'

export const metadata = { title: 'Events' }

export default async function EventsPage() {
  const events = await safeFetch<Event[]>(q.eventsUpcoming, undefined, [])

  const allEvents = events.length ? events : dummyEvents
  const heroEvent = allEvents[0] || {
    title: 'Events',
    excerpt: 'Plan fast. Date-first discovery.',
    category: 'Events'
  }
  
  // Convert events to post-like format for secondary grid
  const secondaryItems = allEvents.slice(1, 10).map(e => ({
    _id: e._id,
    title: e.title,
    excerpt: `${e.city || 'Phoenix, AZ'} • ${e.dateTime ? new Date(e.dateTime).toLocaleDateString() : 'Date TBA'}`,
    category: 'Events',
    slug: e.slug,
    publishedAt: e.dateTime
  }))

  return (
    <PageScaffold
      billboard={{
        adSlot: {
          size: '970x250',
          position: 'hero-banner',
          label: 'Featured Event Sponsor',
          section: 'events',
          mobileSize: '320x50'
        }
      }}
      heroItem={{
        title: heroEvent.title,
        excerpt: heroEvent.dateTime ? new Date(heroEvent.dateTime).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }) : heroEvent.excerpt,
        category: 'Events',
        slug: heroEvent.slug,
        publishedAt: heroEvent.dateTime,
        heroImage: heroEvent.heroImage
      }}
      secondaryItems={secondaryItems}
      rightRail={{
        adSlots: [
          {
            size: '300x250',
            position: 'sidebar-mid',
            label: 'Ticket Platform',
            section: 'events'
          },
          {
            size: '300x600',
            position: 'sidebar-sticky',
            label: 'Upcoming Highlights',
            section: 'events',
            sticky: true
          }
        ]
      }}
      gridColumns={{ mobile: 2, tablet: 2, desktop: 3 }}
    >
      {/* Event Listings */}
      <section className="mt-12 border-t border-brand-light pt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-brand-dark">All Events</h2>
        </div>
        <div className="grid gap-3">
          {allEvents.map((e, idx) => {
            const isBetween = idx === 4 || idx === 8
            const event = events.length ? e : dummyEvents[idx]
            
            return (
              <div key={e?._id || `dummy-${idx}`}>
                <div className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-base font-bold text-brand-dark">{event.title || e?.title || 'Event title'}</div>
                      <div className="mt-1 text-sm text-brand-dark/70">
                        {event.dateTime ? new Date(event.dateTime).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        }) : e?.dateTime ? new Date(e.dateTime).toLocaleString() : 'Date/time'}
                      </div>
                      <div className="mt-1 text-xs text-brand-orange/70 font-semibold">{event.city || e?.city || 'Phoenix, AZ'}</div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {(event.link || e?.link) ? (
                        <a className="rounded-xl bg-brand-orange px-4 py-2 text-xs font-bold text-white hover:bg-brand-orange-600 transition-colors" href={event.link || e.link} target="_blank" rel="noreferrer">
                          Details
                        </a>
                      ) : (
                        <span className="rounded-xl border border-brand-light px-3 py-2 text-xs font-semibold text-brand-dark/40">Link pending</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Between listings */}
                {isBetween && (
                  <div className="mt-4">
                    <AdSlot 
                      size="728x90" 
                      position="in-feed" 
                      label="Venue Promotion" 
                      section="events"
                      mobileSize="320x50"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </PageScaffold>
  )
}
