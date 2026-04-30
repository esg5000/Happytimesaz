import { defineField, defineType } from 'sanity'

const categoryOptions = [
  { title: 'Medical', value: 'medical' },
  { title: 'Recreational', value: 'recreational' },
  { title: 'Delivery', value: 'delivery' }
]

function imageWithAlt(name: string, title: string) {
  return defineField({
    name,
    type: 'image',
    title,
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
        description: 'Describe the image for accessibility and SEO.'
      })
    ]
  })
}

export default defineType({
  name: 'dispensary',
  title: 'Dispensary',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      city: 'city',
      logo: 'logo',
      storefront: 'storefront',
      scrapedImage: 'scrapedImage',
      active: 'isActive'
    },
    prepare({ title, city, logo, storefront, scrapedImage, active }) {
      const media = logo || storefront || scrapedImage
      return {
        title: title || 'Untitled',
        subtitle: [city, active === false ? 'Inactive' : null].filter(Boolean).join(' · '),
        media
      }
    }
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required()
    }),
    defineField({ name: 'address', type: 'string', title: 'Address' }),
    defineField({ name: 'city', type: 'string', title: 'City' }),
    defineField({ name: 'phone', type: 'string', title: 'Phone' }),
    defineField({
      name: 'website',
      type: 'url',
      title: 'Website',
      validation: (r) => r.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'dealsUrl',
      type: 'url',
      title: 'Deals Page URL',
      description: "Direct link to this dispensary's deals / specials page.",
      validation: (r) => r.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 5
    }),
    defineField({
      name: 'hours',
      type: 'text',
      title: 'Hours',
      rows: 4
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string', options: { list: categoryOptions } }],
      options: { layout: 'tags' }
    }),
    imageWithAlt('logo', 'Brand Logo'),
    imageWithAlt('storefront', 'Storefront Photo'),
    imageWithAlt('scrapedImage', 'Scraped Image'),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      initialValue: true
    }),
    defineField({
      name: 'scrapedDealsText',
      type: 'text',
      title: 'Scraped Deals Text',
      rows: 8
    }),
    defineField({
      name: 'dealsScrapedAt',
      type: 'datetime',
      title: 'Deals Scraped At'
    })
  ]
})
