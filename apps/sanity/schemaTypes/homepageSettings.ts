import { defineField, defineType } from 'sanity'

const heroTileFields = [
  defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
  defineField({ name: 'categoryTag', type: 'string', title: 'Category tag', description: 'e.g. Food, Nightlife' }),
  defineField({
    name: 'image',
    type: 'image',
    title: 'Image',
    options: { hotspot: true },
    validation: (r) => r.required()
  }),
  defineField({
    name: 'linkUrl',
    type: 'url',
    title: 'Link URL',
    validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto'] })
  })
]

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage (mosaic hero)',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredThemeLabel',
      type: 'string',
      title: 'Monthly / theme label',
      description: "e.g. March: St. Patrick's Day Nightlife",
      validation: (r) => r.required()
    }),
    defineField({
      name: 'featuredHeadline',
      type: 'string',
      title: 'Large tile headline',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'featuredSubheadline',
      type: 'text',
      title: 'Large tile subhead',
      rows: 3
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Large tile mood image',
      options: { hotspot: true },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'featuredCtaLabel',
      type: 'string',
      title: 'CTA button label',
      initialValue: 'Read more'
    }),
    defineField({
      name: 'featuredCtaUrl',
      type: 'url',
      title: 'CTA link',
      validation: (r) => r.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'tileTop',
      type: 'object',
      title: 'Right — top small tile',
      fields: heroTileFields
    }),
    defineField({
      name: 'tileBottom',
      type: 'object',
      title: 'Right — bottom small tile',
      fields: heroTileFields
    })
  ],
  preview: {
    prepare() {
      return { title: 'Homepage mosaic' }
    }
  }
})
