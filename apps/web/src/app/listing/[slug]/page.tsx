import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionHero } from '@/components/SectionHero'
import { AdSlot } from '@/components/AdSlot'
import { safeFetch } from '@/lib/sanity/safeFetch'
import { q } from '@/lib/sanity/queries'
import type { Deal, Listing } from '@/types/content'

export default async function ListingPage({ params }: { params: { slug: string } }) {
  const listing = await safeFetch<Listing | null>(q.listingBySlug, { slug: params.slug }, null)
  if (!listing) return notFound()

  const deals = listing.listingType === 'dispensary'
    ? await safeFetch<Deal[]>(q.dealsFeatured, undefined, [])
    : []

  return (
    <div>
      <SectionHero title={listing.name} subtitle={`${listing.city || 'Arizona'} · ${listing.listingType}`} />

      <section className="bg-white">
        <div className="container-page py-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {listing.website ? (
                    <a
                      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                      href={listing.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  ) : null}
                  <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                    Directions
                  </button>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Info label="Address" value={listing.address || '—'} />
                  <Info label="Phone" value={listing.phone || '—'} />
                  <Info label="Hours" value={listing.hours ? 'Configured in CMS' : '—'} />
                  <Info label="Amenities" value={listing.amenities?.length ? listing.amenities.join(', ') : '—'} />
                </div>

                {listing.description ? (
                  <div className="mt-6">
                    <div className="text-sm font-semibold">About</div>
                    <p className="mt-2 text-sm text-slate-600">{listing.description}</p>
                  </div>
                ) : null}

                {listing.listingType === 'dispensary' ? (
                  <div className="mt-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-lg font-bold">Deals</h2>
                        <p className="mt-1 text-sm text-slate-600">Cannabis deals appear here and in the Cannabis hub.</p>
                      </div>
                      <Link href="/cannabis" className="text-sm font-semibold text-brand-700 hover:underline">View Cannabis</Link>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {(deals.length ? deals.slice(0, 4) : new Array(4).fill(null)).map((d, idx) => (
                        <div key={d?._id || idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sponsored</div>
                          <div className="mt-2 text-sm font-semibold">{d?.title || 'Deal title'}</div>
                          <div className="mt-1 text-xs text-slate-500">{d?.city || 'Phoenix, AZ'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 grid gap-2 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm font-semibold">Reviews</div>
                    <p className="mt-1 text-sm text-slate-600">Coming soon.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm font-semibold">Jobs</div>
                    <p className="mt-1 text-sm text-slate-600">Coming soon.</p>
                  </div>
                </div>

                <div className="mt-10">
                  <Link href={`/${listing.listingType === 'dispensary' ? 'cannabis' : listing.listingType}`} className="text-sm font-semibold text-brand-700 hover:underline">
                    Back
                  </Link>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-20 grid gap-3">
                <AdSlot type="INLINE" />
                <AdSlot type="MID_FEED" />
                <AdSlot type="END_CAP" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  )
}
