import { defineField, defineType } from 'sanity'
import { editorialCategoryTagOptions } from './lib/editorialCategoryTags'

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
      of: [{ type: 'string', options: { list: [...editorialCategoryTagOptions] } }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description'
    }),
    defineField({
      name: 'placement',
      type: 'string',
      title: 'Placement',
      options: {
        list: [
          { title: 'Top Banner', value: 'top-banner' },
          { title: 'In-Feed', value: 'in-feed' },
          { title: 'Sidebar', value: 'sidebar' },
          { title: 'Bottom Banner', value: 'bottom-banner' }
        ],
        layout: 'dropdown'
      },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'pageType',
      type: 'string',
      title: 'Page Type',
      options: {
        list: [
          { title: 'All Pages', value: 'all-pages' },
          { title: 'All Main Pages', value: 'all-main-pages' },
          { title: 'Homepage', value: 'homepage' },
          { title: 'Category Pages', value: 'category-pages' },
          { title: 'Article Pages', value: 'article-pages' },
          { title: 'Dispensary Pages', value: 'dispensary-pages' }
        ],
        layout: 'dropdown'
      },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'targetCategory',
      type: 'string',
      title: 'Target Category',
      description: 'Which category pages this ad should appear on',
      options: {
        list: [
          { title: 'All Categories', value: 'all-categories' },
          { title: 'Food', value: 'food' },
          { title: 'News', value: 'news' },
          { title: 'Cannabis', value: 'cannabis' },
          { title: 'Nightlife', value: 'nightlife' },
          { title: 'Health & Wellness', value: 'health-wellness' },
          { title: 'Events', value: 'events' },
          { title: 'Sports', value: 'sports' },
          { title: 'Classes', value: 'classes' }
        ],
        layout: 'dropdown'
      },
      hidden: ({ parent }) => parent?.pageType !== 'category-pages' && parent?.pageType !== 'article-pages'
    }),
    defineField({
      name: 'deviceTarget',
      type: 'string',
      title: 'Device Target',
      options: {
        list: [
          { title: 'Both', value: 'both' },
          { title: 'Desktop', value: 'desktop' },
          { title: 'Mobile', value: 'mobile' }
        ],
        layout: 'radio'
      },
      initialValue: 'both',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'priority',
      type: 'number',
      title: 'Priority',
      initialValue: 5,
      validation: (r) => r.min(1).max(10)
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Date'
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Date'
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      initialValue: true
    })
  ]
})
