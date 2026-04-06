import { defineField, defineType } from 'sanity'

const categoryOptions = [
  { title: 'Music', value: 'music' },
  { title: 'Food', value: 'food' },
  { title: 'Cannabis', value: 'cannabis' },
  { title: 'Arts', value: 'arts' },
  { title: 'Nightlife', value: 'nightlife' },
  { title: 'Family', value: 'family' },
  { title: 'Sports', value: 'sports' },
  { title: 'Community', value: 'community' }
]

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      city: 'city',
      when: 'date',
      media: 'image',
      active: 'isActive'
    },
    prepare({ title, city, when, media, active }) {
      return {
        title: title || 'Untitled event',
        subtitle: [when ? new Date(when).toLocaleString() : null, city, active === false ? 'Inactive' : null]
          .filter(Boolean)
          .join(' · '),
        media
      }
    }
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Date',
      description: 'Start date and time',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End date'
    }),
    defineField({ name: 'venue', type: 'string', title: 'Venue' }),
    defineField({ name: 'address', type: 'string', title: 'Address' }),
    defineField({ name: 'city', type: 'string', title: 'City' }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 6
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'ticketUrl',
      type: 'url',
      title: 'Ticket URL',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }).optional()
    }),
    defineField({ name: 'price', type: 'string', title: 'Price' }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string', options: { list: categoryOptions } }],
      options: { layout: 'tags' }
    }),
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
      name: 'source',
      type: 'string',
      title: 'Source',
      description: 'e.g. Eventbrite, manual',
      placeholder: 'manual'
    })
  ]
})
