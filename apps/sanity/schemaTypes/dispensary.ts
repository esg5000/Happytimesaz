import { defineField, defineType } from 'sanity'

const categoryOptions = [
  { title: 'Medical', value: 'medical' },
  { title: 'Recreational', value: 'recreational' },
  { title: 'Delivery', value: 'delivery' }
]

export default defineType({
  name: 'dispensary',
  title: 'Dispensary',
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
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true }
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
    })
  ]
})
