import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'readTime', type: 'number', description: 'Estimated minutes' }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    // CMS & WriteSonic fields
    defineField({
      name: 'contentSource',
      type: 'string',
      title: 'Content Source',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'WriteSonic', value: 'writesonic' },
          { title: 'Hybrid', value: 'hybrid' }
        ],
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
    // WriteSonic specific fields
    defineField({ name: 'writesonicTopic', type: 'string', title: 'WriteSonic Topic' }),
    defineField({ name: 'writesonicKeywords', type: 'array', of: [{ type: 'string' }], title: 'WriteSonic Keywords' }),
    defineField({ name: 'writesonicArticleType', type: 'string', title: 'Article Type', options: {
      list: [
        { title: 'Educational', value: 'educational' },
        { title: 'Listicle', value: 'listicle' },
        { title: 'How-to Guide', value: 'howto' },
        { title: 'Product Roundup', value: 'roundup' },
        { title: 'Health/Wellness', value: 'wellness' }
      ]
    }}),
    defineField({ name: 'writesonicWordCount', type: 'number', title: 'Word Count' }),
    defineField({ name: 'writesonicTone', type: 'string', title: 'Tone', options: {
      list: [
        { title: 'Professional', value: 'professional' },
        { title: 'Casual', value: 'casual' },
        { title: 'Educational', value: 'educational' },
        { title: 'Promotional', value: 'promotional' }
      ]
    }}),
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
