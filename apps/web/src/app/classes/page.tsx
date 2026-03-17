import { PageScaffold } from '@/components/layout/PageScaffold'

export const metadata = { title: 'Classes' }

export default function ClassesPage() {
  const ghlUrl = 'https://example.gohighlevel.com/'

  return (
    <PageScaffold
      heroItem={{
        title: 'Classes',
        excerpt: 'Classes will be managed through GoHighLevel Community CRM. This page is the gateway.',
        category: 'Classes'
      }}
      secondaryItems={[]}
    >
      <section className="mt-12">
        <div className="rounded-3xl border border-brand-light bg-brand-light/30 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-brand-dark">Join the community</h2>
          <p className="mt-2 max-w-2xl text-brand-dark/70">
            Classes, workshops, and community drops live in our GoHighLevel community. Click below to view and join.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={ghlUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand-orange px-4 py-2 text-sm font-bold text-white hover:bg-brand-orange-600 transition-colors"
            >
              Open Classes Portal
            </a>
            <a
              href="/advertise"
              className="rounded-xl border border-brand-light bg-white px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-light transition-colors"
            >
              Advertise
            </a>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {['Workshops', 'Community', 'Announcements'].map((x) => (
              <div key={x} className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-brand-dark">{x}</div>
                <p className="mt-2 text-sm text-brand-dark/70">Managed externally for v1. Full integration can ship later.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageScaffold>
  )
}
