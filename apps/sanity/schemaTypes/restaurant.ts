import { defineField, defineType, type SlugValidationContext, type ValidationContext } from 'sanity'

const RESTAURANT_TYPE = 'restaurant'
const API_VERSION = '2024-01-01'

const CITY_OPTIONS = [
  { title: 'Phoenix', value: 'Phoenix' },
  { title: 'Scottsdale', value: 'Scottsdale' },
  { title: 'Tempe', value: 'Tempe' },
  { title: 'Mesa', value: 'Mesa' },
  { title: 'Glendale', value: 'Glendale' },
  { title: 'Chandler', value: 'Chandler' },
  { title: 'Surprise', value: 'Surprise' },
] as const

const ALLOWED_CITIES = new Set(CITY_OPTIONS.map((c) => c.value))

function documentIdVariants(id: string | undefined): string[] {
  if (!id) return []
  const base = id.replace(/^drafts\./, '')
  return [`drafts.${base}`, base]
}

/** Slug must be unique among all `restaurant` documents (draft + published pair excluded). */
async function isRestaurantSlugUnique(slug: string, context: SlugValidationContext): Promise<boolean> {
  const client = context.getClient({ apiVersion: API_VERSION })
  const exclude = documentIdVariants(context.document?._id)
  const query =
    exclude.length > 0
      ? `count(*[_type == "${RESTAURANT_TYPE}" && slug.current == $slug && !(_id in $exclude)]) == 0`
      : `count(*[_type == "${RESTAURANT_TYPE}" && slug.current == $slug]) == 0`
  const params = exclude.length > 0 ? { slug, exclude } : { slug }
  return client.fetch(query, params)
}

function normalizePart(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

/** Same name + city + address cannot exist twice (case-insensitive, trimmed). */
async function assertUniqueRestaurantIdentity(context: ValidationContext): Promise<true | string> {
  const doc = context.document
  if (!doc) return true
  const name = normalizePart(doc.name)
  const city = normalizePart(doc.city)
  const address = normalizePart(doc.address)
  if (!name || !city || !address) return true

  const client = context.getClient({ apiVersion: API_VERSION })
  const exclude = documentIdVariants(doc._id)
  const query =
    exclude.length > 0
      ? `count(*[_type == "${RESTAURANT_TYPE}" && lower(name) == $name && lower(city) == $city && lower(address) == $address && !(_id in $exclude)]) == 0`
      : `count(*[_type == "${RESTAURANT_TYPE}" && lower(name) == $name && lower(city) == $city && lower(address) == $address]) == 0`
  const params =
    exclude.length > 0 ? { name, city, address, exclude } : { name, city, address }
  const unique = await client.fetch<boolean>(query, params)
  return unique || 'A restaurant with this name, address, and city already exists'
}

export default defineType({
  name: RESTAURANT_TYPE,
  title: 'Restaurant',
  type: 'document',
  validation: (Rule) =>
    Rule.custom(async (_, context) => {
      return assertUniqueRestaurantIdentity(context)
    }),
  preview: {
    select: {
      title: 'name',
      city: 'city',
      cuisine: 'cuisine',
      featured: 'isFeatured',
    },
    prepare({ title, city, cuisine, featured }) {
      return {
        title: title || 'Untitled',
        subtitle: [city, cuisine, featured ? 'Featured' : null].filter(Boolean).join(' · '),
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique URL key. Prevents duplicate restaurant documents when combined with identity checks.',
      options: {
        source: (doc) => [doc?.name, doc?.city].filter(Boolean).join(' '),
        maxLength: 96,
        isUnique: isRestaurantSlugUnique,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      options: { list: [...CITY_OPTIONS], layout: 'dropdown' },
      validation: (Rule) =>
        Rule.required().custom((city) =>
          typeof city === 'string' && ALLOWED_CITIES.has(city)
            ? true
            : 'City must be Phoenix, Scottsdale, Tempe, Mesa, Glendale, Chandler, or Surprise'
        ),
    }),
    defineField({ name: 'cuisine', title: 'Cuisine', type: 'string' }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5).precision(1),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review count',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({ name: 'priceLevel', title: 'Price level', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'string',
      description: 'Image URL for listings and cards',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'datetime',
    }),
  ],
})
