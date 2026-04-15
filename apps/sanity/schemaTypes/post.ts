import { defineArrayMember, defineField, defineType } from 'sanity'
import { editorialCategoryTagOptions } from './lib/editorialCategoryTags'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'isFeatured', type: 'boolean', title: 'Featured', initialValue: false }),
    defineField({ name: 'featuredAt', type: 'datetime', title: 'Featured at' }),
    defineField({ name: 'readTime', type: 'number', description: 'Estimated minutes' }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Category tags',
      description: 'Section tags (use Health & wellness instead of legacy mushroom/wellness)',
      of: [{ type: 'string', options: { list: [...editorialCategoryTagOptions] } }],
      options: { layout: 'tags' }
    }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main image (legacy)',
      description: 'Optional. The site prefers heroImage, then mainImage if hero is empty.',
      options: { hotspot: true }
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional images',
      type: 'array',
      description: 'Extra images with alt text (galleries, inline sets, etc.)',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Describe the image for screen readers and SEO'
            })
          ]
        })
      ],
      options: { layout: 'grid' }
    }),
    defineField({
      name: 'video',
      type: 'file',
      title: 'Video',
      description: 'Optional video file stored as a Sanity asset',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'featuredVideo',
      type: 'file',
      title: 'Featured video',
      description: 'Primary featured video file (Sanity asset)',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'section',
      type: 'string',
      title: 'Section',
      description: 'Editorial section label (e.g. News, Features)'
    }),
    defineField({
      name: 'visualStyle',
      type: 'string',
      title: 'Visual style',
      description: 'Layout or presentation hint for the front end'
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] })
                  }
                ]
              },
              {
                name: 'affiliateLink',
                type: 'object',
                title: 'Affiliate / partner link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (r) => r.uri({ scheme: ['http', 'https'] })
                  })
                ]
              }
            ]
          }
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alternative text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' })
          ]
        })
      ]
    }),
    defineField({
      name: 'contentSource',
      type: 'string',
      title: 'Content Source',
      options: {
        list: [{ title: 'Manual', value: 'manual' }],
        layout: 'radio'
      },
      initialValue: 'manual'
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Scheduled', value: 'scheduled' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft'
    }),
    defineField({ name: 'scheduledPublishDate', type: 'datetime', title: 'Scheduled Publish Date' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' }),
    // SEO fields
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, title: 'SEO Description' }),
    defineField({ name: 'seoKeywords', type: 'array', of: [{ type: 'string' }], title: 'SEO Keywords' }),
    // Content flags
    defineField({ name: 'needsFactCheck', type: 'boolean', title: 'Needs Fact-Check', initialValue: false }),
    defineField({ name: 'needsLocalInfo', type: 'boolean', title: 'Needs Local Info', initialValue: false }),
    defineField({ name: 'author', type: 'string', title: 'Author' })
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      contentSource: 'contentSource',
      category: 'category.title'
    },
    prepare({ title, status, contentSource, category }) {
      return {
        title,
        subtitle: `${status || 'draft'} • ${contentSource || 'manual'} • ${category || 'uncategorized'}`
      }
    }
  }
})
