import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ad',
  title: 'Advertisement',
  type: 'document',
  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      advertiser: 'advertiser',
      placement: 'placement',
      active: 'active',
      image: 'image'
    },
    prepare({ title, advertiser, placement, active, image }) {
      return {
        title: title || 'Untitled Ad',
        subtitle: `${advertiser || 'No Advertiser'} • ${placement || 'No Placement'}${active === false ? ' • Inactive' : ''}`,
        media: image
      }
    }
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Internal reference name for this ad',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'advertiser',
      type: 'string',
      title: 'Advertiser',
      description: 'Name of the advertiser or sponsor',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'placement',
      type: 'string',
      title: 'Placement',
      description: 'Where this ad will be displayed',
      options: {
        list: [
          { title: 'Homepage Major', value: 'homepage_major' },
          { title: 'Homepage Sidebar', value: 'homepage_sidebar' },
          { title: 'Section Header', value: 'section_header' },
          { title: 'Inline Banner', value: 'inline_banner' },
          { title: 'Footer Banner', value: 'footer_banner' }
        ],
        layout: 'radio'
      },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'adType',
      type: 'string',
      title: 'Ad Type',
      description: 'Type of advertisement content',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'HTML', value: 'html' }
        ],
        layout: 'radio'
      },
      initialValue: 'image',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Ad image (only used if Ad Type is Image)',
      options: {
        hotspot: true
      },
      hidden: ({ parent }) => parent?.adType !== 'image'
    }),
    defineField({
      name: 'html',
      type: 'text',
      title: 'HTML Code',
      description: 'HTML/script code for the ad (only used if Ad Type is HTML)',
      hidden: ({ parent }) => parent?.adType !== 'html'
    }),
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      description: 'Optional headline text to display with the ad'
    }),
    defineField({
      name: 'cta',
      type: 'string',
      title: 'Call to Action',
      description: 'Button or link text',
      initialValue: 'Learn More'
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Destination URL when ad is clicked',
      validation: (r) => r.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'startDate',
      type: 'datetime',
      title: 'Start Date',
      description: 'Optional: When this ad should start showing'
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End Date',
      description: 'Optional: When this ad should stop showing'
    }),
    defineField({
      name: 'priority',
      type: 'number',
      title: 'Priority',
      description: 'Higher numbers show first when multiple ads exist for the same placement',
      initialValue: 1,
      validation: (r) => r.min(0).max(100)
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active',
      description: 'Whether this ad is currently active',
      initialValue: true
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      description: 'Optional: Limit this ad to specific content categories',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    })
  ]
})

