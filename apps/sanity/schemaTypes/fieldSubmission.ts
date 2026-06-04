import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'fieldSubmission',
  title: 'Field Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'agentName',
      type: 'string',
      title: 'Agent Name',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'agentId',
      type: 'string',
      title: 'Agent ID',
      description: 'Slug-style identifier derived from agent name (e.g. "jane.smith")',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Health', value: 'health' },
          { title: 'Sports', value: 'sports' },
          { title: 'Local', value: 'local' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Events', value: 'events' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'notes',
      type: 'text',
      title: 'Field Notes',
      rows: 5,
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Photos',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
        }),
      ],
    }),
    defineField({
      name: 'videos',
      type: 'array',
      title: 'Videos',
      of: [defineArrayMember({ type: 'file', options: { accept: 'video/*' } })],
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'In Review', value: 'inReview' },
          { title: 'Published', value: 'published' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'adminNote',
      type: 'text',
      title: 'Admin Note',
      description: 'Optional note back to the agent (visible on reject or review)',
      rows: 3,
    }),
    defineField({ name: 'submittedAt', type: 'datetime', title: 'Submitted At' }),
    defineField({ name: 'updatedAt', type: 'datetime', title: 'Updated At' }),
  ],
  preview: {
    select: {
      agentName: 'agentName',
      status: 'status',
      category: 'category',
      submittedAt: 'submittedAt',
      thumb: 'images.0',
    },
    prepare({ agentName, status, category, submittedAt, thumb }) {
      return {
        title: agentName || 'Unknown agent',
        subtitle: [status, category, submittedAt ? new Date(submittedAt).toLocaleDateString() : null]
          .filter(Boolean)
          .join(' • '),
        media: thumb,
      }
    },
  },
})
