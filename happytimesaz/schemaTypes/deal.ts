import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'deal',
  title: 'Deal (Cannabis)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'featured', type: 'boolean', initialValue: true }),
    defineField({ name: 'priority', type: 'number', initialValue: 0, description: 'Higher shows first' }),
    defineField({ name: 'brandName', type: 'string' }),
    defineField({ name: 'dispensaryName', type: 'string' }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'startDate', type: 'date' }),
    defineField({ name: 'endDate', type: 'date' }),
    defineField({ name: 'terms', type: 'text', rows: 3 }),
    defineField({ name: 'link', type: 'url' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } })
  ]
})
