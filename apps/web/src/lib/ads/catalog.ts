export type AdSku =
  | 'SPONSORED_LISTING_30D'
  | 'ENDCAP_SPONSOR_30D'
  | 'FEATURED_EVENT'
  | 'CANNABIS_DEAL_7D'
  | 'CANNABIS_DEAL_30D'
  | 'HOMEPAGE_HERO_7D'
  | 'SPONSORED_DISPENSARY_30D'

export type AdProduct = {
  sku: AdSku
  title: string
  description: string
  durationLabel: string
  placement: string
  stripePriceEnvKey: string
  category: 'Local Business' | 'Cannabis & Brand' | 'Premium'
}

export const AD_PRODUCTS: AdProduct[] = [
  {
    sku: 'SPONSORED_LISTING_30D',
    title: 'Sponsored Listing — Directory Boost',
    description: 'Boost your placement in Food, Cannabis, or Nightlife directories with a clearly-labeled Sponsored badge.',
    durationLabel: '30 days',
    placement: 'Directory Index (top + mid-feed rotation)',
    stripePriceEnvKey: 'STRIPE_PRICE_SPONSORED_LISTING_30D',
    category: 'Local Business'
  },
  {
    sku: 'ENDCAP_SPONSOR_30D',
    title: 'End-Cap Sponsor',
    description: 'Premium sponsor placement at the bottom of a section page. High completion-rate inventory.',
    durationLabel: '30 days',
    placement: 'Page Bottom (End-cap)',
    stripePriceEnvKey: 'STRIPE_PRICE_ENDCAP_SPONSOR_30D',
    category: 'Local Business'
  },
  {
    sku: 'FEATURED_EVENT',
    title: 'Featured Event',
    description: 'Promote a single event on Events and related sections. Best for launches and one-off promotions.',
    durationLabel: 'Event range',
    placement: 'Events Index + Nightlife cross-links',
    stripePriceEnvKey: 'STRIPE_PRICE_FEATURED_EVENT',
    category: 'Local Business'
  },
  {
    sku: 'CANNABIS_DEAL_7D',
    title: 'Cannabis Deal — Grid Placement',
    description: 'Featured deal card inside the Cannabis hub deal grid. Contextual, high-intent traffic.',
    durationLabel: '7 days',
    placement: 'Cannabis Hub Deal Grid',
    stripePriceEnvKey: 'STRIPE_PRICE_CANNABIS_DEAL_7D',
    category: 'Cannabis & Brand'
  },
  {
    sku: 'CANNABIS_DEAL_30D',
    title: 'Cannabis Deal — Grid Placement (Monthly)',
    description: 'Best value: keep your deal visible for a full month inside the Cannabis hub deal grid.',
    durationLabel: '30 days',
    placement: 'Cannabis Hub Deal Grid',
    stripePriceEnvKey: 'STRIPE_PRICE_CANNABIS_DEAL_30D',
    category: 'Cannabis & Brand'
  },
  {
    sku: 'SPONSORED_DISPENSARY_30D',
    title: 'Sponsored Dispensary Highlight',
    description: 'Featured dispensary placement within the Cannabis directory + homepage highlight module.',
    durationLabel: '30 days',
    placement: 'Cannabis Directory + Homepage Highlight',
    stripePriceEnvKey: 'STRIPE_PRICE_SPONSORED_DISPENSARY_30D',
    category: 'Cannabis & Brand'
  },
  {
    sku: 'HOMEPAGE_HERO_7D',
    title: 'Homepage Hero Companion',
    description: 'High-visibility premium placement in the homepage hero area. Limited availability.',
    durationLabel: '7 days',
    placement: 'Homepage Hero',
    stripePriceEnvKey: 'STRIPE_PRICE_HOMEPAGE_HERO_7D',
    category: 'Premium'
  }
]
