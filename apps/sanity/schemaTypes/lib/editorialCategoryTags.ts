/**
 * Shared slug values for post tags, ad targeting, affiliate categories, homepage tiles.
 * `health-wellness` replaces legacy `mushroom` / `wellness` tag values for deduplication in Studio.
 */
export const editorialCategoryTagOptions = [
  { title: 'Food', value: 'food' },
  { title: 'Cannabis', value: 'cannabis' },
  { title: 'Nightlife', value: 'nightlife' },
  { title: 'News', value: 'news' },
  { title: 'Health & wellness', value: 'health-wellness' },
  { title: 'Events', value: 'events' },
  { title: 'Classes', value: 'classes' }
] as const
