import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'
import { AD_PRODUCTS } from '@/lib/ads/catalog'

const stripeSecret = process.env.STRIPE_SECRET_KEY

const BodySchema = z.object({
  sku: z.string(),
  advertiser: z
    .object({
      name: z.string().optional().default(''),
      email: z.string().email().optional().default(''),
      business: z.string().optional().default(''),
      notes: z.string().optional().default('')
    })
    .optional()
    .default({ name: '', email: '', business: '', notes: '' })
})

function requireEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export async function POST(req: Request) {
  try {
    if (!stripeSecret) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }
    const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })

    const body = BodySchema.parse(await req.json())
    const product = AD_PRODUCTS.find((p) => p.sku === body.sku)
    if (!product) return NextResponse.json({ error: 'Invalid SKU' }, { status: 400 })

    const priceId = requireEnv(product.stripePriceEnvKey)
    const successUrl = requireEnv('STRIPE_SUCCESS_URL')
    const cancelUrl = requireEnv('STRIPE_CANCEL_URL')

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: body.advertiser.email || undefined,
      metadata: {
        sku: String(product.sku),
        title: String(product.title),
        advertiser_name: String(body.advertiser.name || ''),
        advertiser_email: String(body.advertiser.email || ''),
        advertiser_business: String(body.advertiser.business || ''),
        advertiser_notes: String(body.advertiser.notes || '')
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Checkout error' }, { status: 500 })
  }
}
