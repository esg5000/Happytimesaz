import { PageScaffold } from '@/components/layout/PageScaffold'

export const metadata = { title: 'GTA Radio' }

function stationEnv(i: number, key: 'NAME' | 'URL') {
  return process.env[`NEXT_PUBLIC_RADIO_STATION_${i}_${key}` as const]
}

export default function GTARadioPage() {
  const stations = [...Array(4)].map((_, idx) => {
    const i = idx + 1
    return {
      id: i,
      name: stationEnv(i, 'NAME') || `Station ${i}`,
      url: stationEnv(i, 'URL') || ''
    }
  })

  return (
    <PageScaffold
      heroItem={{
        title: 'GTA Radio',
        excerpt: 'Glass Radio with 4 stations. Player is always available on every page.',
        category: 'GTA Radio'
      }}
      secondaryItems={[]}
    >
      <section className="mt-12">
        <div className="rounded-3xl border border-brand-light bg-brand-light/30 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-brand-dark">Stations</h2>
          <p className="mt-2 text-brand-dark/70">Use the floating player to play, pause, change station, and adjust volume from any page.</p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {stations.map((s) => (
              <div key={s.id} className="rounded-2xl border border-brand-light bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-brand-dark">{s.name}</div>
                <div className="mt-1 text-xs text-brand-dark/60">{s.url ? 'Stream configured' : 'Stream URL not set yet'}</div>
                <div className="mt-3 text-xs text-brand-dark/60">
                  Configure in <code className="rounded bg-brand-light px-1">apps/web/.env.local</code>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brand-light bg-white p-4">
            <div className="text-sm font-semibold text-brand-dark">Future</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-brand-dark/70">
              <li>Show schedule per station</li>
              <li>Audio sponsor slots</li>
              <li>Now playing metadata</li>
            </ul>
          </div>
        </div>
      </section>
    </PageScaffold>
  )
}
