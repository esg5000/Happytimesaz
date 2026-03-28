'use client'

import { useMemo, useState } from 'react'
import { SectionHero } from '@/components/SectionHero'
import { AD_PRODUCTS, type AdSku } from '@/lib/ads/catalog'

type FormState = {
  name: string
  email: string
  business: string
  notes: string
}

export default function AdvertisePage() {
  const products = useMemo(() => AD_PRODUCTS, [])
  const [selectedSku, setSelectedSku] = useState<AdSku | null>(products[0]?.sku || null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', email: '', business: '', notes: '' })

  async function startCheckout() {
    if (!selectedSku) return
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku: selectedSku, advertiser: form })
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = (await res.json()) as { url: string }
      window.location.href = data.url
    } catch {
      alert('Checkout failed. Verify Stripe keys and price IDs in .env.local.')
    } finally {
      setLoading(false)
    }
  }

  const selected = products.find((p) => p.sku === selectedSku)

  return (
    <div>
      <SectionHero
        title="Advertise"
        subtitle="Self-serve ad purchases via Stripe. Assets are uploaded by admin for now."
      />

      <section className="bg-white">
        <div className="container-page py-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="grid gap-3 md:grid-cols-2">
                {products.map((p) => (
                  <button
                    suppressHydrationWarning
                    key={p.sku}
                    onClick={() => setSelectedSku(p.sku)}
                    className={
                      'rounded-2xl border p-4 text-left shadow-sm ' +
                      (p.sku === selectedSku
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-slate-200 bg-white hover:bg-slate-50')
                    }
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{p.category}</div>
                    <div className="mt-2 text-sm font-semibold">{p.title}</div>
                    <div className="mt-1 text-xs text-slate-600">{p.durationLabel} · {p.placement}</div>
                    <p className="mt-3 text-sm text-slate-700">{p.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">Checkout</div>
                <p className="mt-2 text-sm text-slate-600">
                  {selected ? (
                    <>
                      <span className="font-semibold text-slate-900">{selected.title}</span>
                      <span className="text-slate-600"> · {selected.durationLabel}</span>
                    </>
                  ) : (
                    'Select an option.'
                  )}
                </p>

                <div className="mt-6 grid gap-3">
                  <input
                    suppressHydrationWarning
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                  <input
                    suppressHydrationWarning
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="Email"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                  <input
                    suppressHydrationWarning
                    value={form.business}
                    onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
                    placeholder="Business / Brand name"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                  <textarea
                    suppressHydrationWarning
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Notes (what you want to promote, city, dates, links...)"
                    className="min-h-[120px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  suppressHydrationWarning
                  onClick={startCheckout}
                  disabled={loading || !selectedSku}
                  className="mt-6 w-full rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
                >
                  {loading ? 'Starting checkout…' : 'Pay with Stripe'}
                </button>

                <p className="mt-3 text-xs text-slate-500">
                  After payment, we will contact you to collect or confirm creative assets (images, copy, links) and schedule the placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
