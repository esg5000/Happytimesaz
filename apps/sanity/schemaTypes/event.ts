import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'dateTime', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'venueName', type: 'string' }),
    defineField({ name: 'link', type: 'url' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] })
  ]
})
