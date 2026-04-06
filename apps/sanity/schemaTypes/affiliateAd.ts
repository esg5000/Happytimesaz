import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'affiliateAd',
  title: 'Affiliate Ad',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      image: 'image'
    },
    prepare({ title, isActive, image }) {
      return {
        title: title || 'Untitled Affiliate Ad',
        subtitle: isActive === false ? 'Inactive' : 'Active',
        media: image
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
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'linkUrl',
      type: 'url',
      title: 'Link URL',
      validation: (r) => r.required().uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description'
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      initialValue: true
    })
  ]
})

