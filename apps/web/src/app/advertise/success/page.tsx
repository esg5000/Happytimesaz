import Link from 'next/link'
import { SectionHero } from '@/components/SectionHero'

export const metadata = { title: 'Payment Success' }

export default function AdvertiseSuccessPage() {
  return (
    <div>
      <SectionHero title="Payment received" subtitle="Your order is confirmed. We will reach out to collect creative assets and schedule your placement." />
      <section className="bg-white">
        <div className="container-page py-10">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-10">
            <h2 className="text-2xl font-bold">Next steps</h2>
            <ol className="mt-4 list-decimal pl-5 text-slate-700">
              <li>We confirm placement + dates</li>
              <li>You send creatives (logo, image, copy, link)</li>
              <li>We launch and monitor</li>
            </ol>
            <div className="mt-8 flex gap-2">
              <Link href="/" className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">Home</Link>
              <Link href="/advertise" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">Buy another</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
