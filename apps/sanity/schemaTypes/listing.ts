import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: 'listingType',
      type: 'string',
      options: { list: [
        { title: 'Food', value: 'food' },
        { title: 'Dispensary', value: 'dispensary' },
        { title: 'Nightlife', value: 'nightlife' }
      ], layout: 'radio' },
      validation: (r) => r.required()
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({
      name: 'website',
      type: 'url',
      validation: (r) =>
        r.custom((value, ctx) => {
          const listingType = (ctx.document as any)?.listingType
          if (listingType === 'dispensary' && !value) return 'Website is required for dispensaries'
          return true
        })
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      description: 'Used for “Near me” sorting on the Cannabis hub.'
    }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'text', rows: 4 }),
    defineField({ name: 'hours', type: 'object', fields: [
      defineField({ name: 'monday', type: 'string' }),
      defineField({ name: 'tuesday', type: 'string' }),
      defineField({ name: 'wednesday', type: 'string' }),
      defineField({ name: 'thursday', type: 'string' }),
      defineField({ name: 'friday', type: 'string' }),
      defineField({ name: 'saturday', type: 'string' }),
      defineField({ name: 'sunday', type: 'string' })
    ]}),
    defineField({ name: 'amenities', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'socials',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', type: 'url' }),
        defineField({ name: 'tiktok', type: 'url' }),
        defineField({ name: 'twitter', type: 'url' }),
        defineField({ name: 'youtube', type: 'url' })
      ]
    })
  ]
})
