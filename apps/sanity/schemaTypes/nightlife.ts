import { defineField, defineType } from 'sanity'

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
  name: 'nightlife',
  title: 'Nightlife',
  type: 'document',
  preview: {
    select: { title: 'name', city: 'city', media: 'image', active: 'isActive' },
    prepare({ title, city, media, active }) {
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
      name: 'rating',
      type: 'number',
      title: 'Rating'
    }),
    defineField({
      name: 'priceLevel',
      type: 'number',
      title: 'Price level'
    }),
    defineField({
      name: 'googlePlaceId',
      type: 'string',
      title: 'Google Place ID'
    }),
    imageWithAlt('image', 'Image'),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      initialValue: true
    })
  ]
})
