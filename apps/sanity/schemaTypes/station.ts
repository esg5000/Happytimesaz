import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'radioStation',
  title: 'Radio Station',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      type: 'string', 
      validation: (r) => r.required(),
      description: 'Display name of the radio station'
    }),
    defineField({ 
      name: 'streamUrl', 
      type: 'url', 
      validation: (r) => r.required(),
      description: 'Stream URL for the radio station'
    }),
    defineField({ 
      name: 'active', 
      type: 'boolean', 
      initialValue: true,
      description: 'Only active stations will appear in the player'
    }),
    defineField({ 
      name: 'order', 
      type: 'number', 
      initialValue: 0,
      description: 'Sort order (lower numbers appear first, after the fallback station)'
    }),
    defineField({ 
      name: 'coverImage', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Optional cover image for the station'
    }),
    defineField({ 
      name: 'genre', 
      type: 'string',
      description: 'Optional genre/category (e.g., "Rock", "Jazz", "Electronic")'
    })
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      genre: 'genre'
    },
    prepare({ title, active, genre }) {
      return {
        title: title || 'Untitled Station',
        subtitle: `${active ? 'Active' : 'Inactive'}${genre ? ` • ${genre}` : ''}`
      }
    }
  }
})
