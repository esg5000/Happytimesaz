import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

/**
 * Converts a Sanity image reference to a URL
 * @param source - Sanity image reference (can be the full image object or just the asset reference)
 * @returns Image URL builder instance
 */
export function urlFor(source: any) {
  if (!source) return builder.image('')
  
  // Handle different Sanity image reference formats
  // Format 1: { asset: { _ref: '...' } } or { asset: { _type: 'reference', _ref: '...' } } - unexpanded reference
  // Format 2: { asset: { _id: '...', url: '...' } } - expanded asset with URL
  // Format 3: { asset: { _id: '...' } } - expanded asset without URL (need to use _id)
  // Format 4: Direct asset reference { _ref: '...' } or { _id: '...' }
  // Format 5: Already a string URL (for backwards compatibility)
  
  // If it's already a string URL, use it directly
  if (typeof source === 'string' && source.startsWith('http')) {
    return builder.image(source)
  }
  
  // If source has an asset property
  if (source.asset) {
    // If asset has a URL (expanded), we can use it directly or use the _id
    if (source.asset.url) {
      // Use the URL directly if available
      return builder.image(source.asset.url)
    }
    // Otherwise use the asset reference (_id or _ref)
    return builder.image(source.asset)
  }
  
  // If source is a direct asset reference
  if (source._id || source._ref) {
    return builder.image(source)
  }
  
  // Default: try to use the source directly
  return builder.image(source)
}

/**
 * Gets a URL string from a Sanity image reference
 * @param source - Sanity image reference
 * @param options - Optional image transformation options
 * @returns URL string or null if invalid
 */
export function getImageUrl(source: any, options?: { width?: number; height?: number; quality?: number }) {
  if (!source) return null
  
  // Quick check: if it's already a URL string, return it (with optional transformations)
  if (typeof source === 'string' && source.startsWith('http')) {
    // If it's already a URL and we have transformations, we'd need to use urlFor
    // But for now, if it's already a URL, return it as-is
    if (!options || (!options.width && !options.height && !options.quality)) {
      return source
    }
  }
  
  // If source has an expanded asset with URL, we can use it directly
  if (source?.asset?.url) {
    let url = source.asset.url
    
    // Apply basic transformations if needed (for Sanity CDN URLs)
    if (options) {
      const params = new URLSearchParams()
      if (options.width) params.set('w', options.width.toString())
      if (options.height) params.set('h', options.height.toString())
      if (options.quality) params.set('q', options.quality.toString())
      
      if (params.toString()) {
        const separator = url.includes('?') ? '&' : '?'
        url = `${url}${separator}${params.toString()}`
      }
    }
    
    return url
  }
  
  try {
    let imageBuilder = urlFor(source)
    
    if (options?.width) {
      imageBuilder = imageBuilder.width(options.width)
    }
    if (options?.height) {
      imageBuilder = imageBuilder.height(options.height)
    }
    if (options?.quality) {
      imageBuilder = imageBuilder.quality(options.quality)
    }
    
    const url = imageBuilder.url()
    return url && url !== '' ? url : null
  } catch (error) {
    console.error('Error building image URL:', error, source)
    return null
  }
}

