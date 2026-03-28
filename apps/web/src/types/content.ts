export type Slug = { current: string }

export type CategoryRef = { title?: string; slug?: Slug }

export type Post = {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  publishedAt?: string
  readTime?: number
  category?: CategoryRef
  heroImage?: any
  body?: any
}

export type Listing = {
  _id: string
  name: string
  slug: Slug
  listingType: 'food' | 'dispensary' | 'nightlife'
  city?: string
  address?: string
  location?: { lat?: number; lng?: number }
  website?: string
  phone?: string
  description?: string
  hours?: any
  amenities?: string[]
  featured?: boolean
  heroImage?: any
}

export type Deal = {
  _id: string
  title: string
  slug: Slug
  brandName?: string
  dispensaryName?: string
  city?: string
  startDate?: string
  endDate?: string
  terms?: string
  link?: string
  heroImage?: any
}

export type Event = {
  _id: string
  title: string
  slug: Slug
  dateTime: string
  venueName?: string
  city?: string
  link?: string
  heroImage?: any
}

export type Ad = {
  _id: string
  title: string
  advertiser: string
  placement: string
  adType: 'image' | 'html'
  image?: any
  html?: string
  headline?: string
  cta?: string
  url?: string
  priority?: number
}

export type HomepageHeroTile = {
  title?: string
  categoryTag?: string
  linkUrl?: string
  image?: unknown
}

export type HomepageSettings = {
  featuredThemeLabel?: string
  featuredHeadline?: string
  featuredSubheadline?: string
  featuredCtaLabel?: string
  featuredCtaUrl?: string
  featuredImage?: unknown
  tileTop?: HomepageHeroTile
  tileBottom?: HomepageHeroTile
}

export type RadioStation = {
  id: number
  name: string
  url: string
  source: 'fallback' | 'sanity'
  sanityId?: string
  genre?: string
}
