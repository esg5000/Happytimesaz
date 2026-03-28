import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

/** Sanity image CDN — use with next/image `unoptimized` to avoid optimizer fetch issues */
export function isSanityCdnUrl(url: string | null | undefined): boolean {
  return typeof url === 'string' && url.includes('cdn.sanity.io')
}

/** `//cdn...` or stray whitespace from CMS */
function normalizeHttpUrl(url: string): string {
  const u = url.trim()
  if (u.startsWith('//')) return `https:${u}`
  return u
}

/**
 * Infer project + dataset from an inlined Sanity CDN image URL so @sanity/image-url
 * still works when NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET are wrong or unset.
 */
export function parseSanityImagesProjectDataset(url: string): { projectId: string; dataset: string } | null {
  const u = normalizeHttpUrl(url)
  if (!u.startsWith('http')) return null
  const m = u.match(/https?:\/\/cdn\.sanity\.io\/images\/([^/]+)\/([^/]+)\//i)
  if (!m) return null
  return { projectId: m[1], dataset: m[2] }
}

function builderForSanityImageUrl(url: string | undefined) {
  if (url && typeof url === 'string') {
    const cfg = parseSanityImagesProjectDataset(url)
    if (cfg) return imageUrlBuilder({ projectId: cfg.projectId, dataset: cfg.dataset })
  }
  return builder
}

/** Pick image-url builder: prefer project/dataset from expanded asset.url, else env client. */
function builderForImageSource(source: any) {
  const assetUrl = source?.asset?.url
  if (typeof assetUrl === 'string') {
    return builderForSanityImageUrl(assetUrl)
  }
  return builder
}

/**
 * Converts a Sanity image reference to a URL
 * @param source - Sanity image reference (can be the full image object or just the asset reference)
 * @returns Image URL builder instance
 */
export function urlFor(source: any) {
  if (!source) return builder.image('')

  if (typeof source === 'string') {
    const u = normalizeHttpUrl(source)
    if (u.startsWith('http')) {
      return builderForSanityImageUrl(u).image(u)
    }
  }

  if (source.asset) {
    if (source.asset.url) {
      return builderForImageSource(source).image(source)
    }
    return builderForImageSource(source).image(source.asset)
  }

  if (source._id || source._ref) {
    return builderForImageSource(source).image(source)
  }

  return builderForImageSource(source).image(source)
}

function appendSanityImageParams(
  baseUrl: string,
  options?: { width?: number; height?: number; quality?: number }
) {
  if (!options?.width && !options?.height && !options?.quality) return baseUrl
  // File assets use /files/ — don't append image transform query params
  if (baseUrl.includes('/cdn.sanity.io/files/')) return baseUrl
  const params = new URLSearchParams()
  if (options.width) params.set('w', options.width.toString())
  if (options.height) params.set('h', options.height.toString())
  if (options.quality) params.set('q', options.quality.toString())
  const q = params.toString()
  if (!q) return baseUrl
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}${q}`
}

function expandedAssetUrlFromSource(source: any): string | null {
  const raw = source?.asset?.url
  if (typeof raw !== 'string' || !raw.trim()) return null
  const u = normalizeHttpUrl(raw)
  return u.startsWith('http') ? u : null
}

/**
 * Gets a URL string from a Sanity image reference
 * @param source - Sanity image reference
 * @param options - Optional image transformation options
 * @returns URL string or null if invalid
 */
export function getImageUrl(source: any, options?: { width?: number; height?: number; quality?: number }) {
  if (!source) return null

  if (typeof source === 'string') {
    const u = normalizeHttpUrl(source)
    if (u.startsWith('http')) return appendSanityImageParams(u, options)
  }

  const expandedUrl = expandedAssetUrlFromSource(source)
  if (expandedUrl) {
    return appendSanityImageParams(expandedUrl, options)
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

    let url = imageBuilder.url()

    if (!url || url === '' || url.includes('/images/missing/')) {
      const fallback = expandedAssetUrlFromSource(source) ?? ''
      if (fallback.startsWith('http')) {
        url = appendSanityImageParams(fallback, options)
      }
    }

    return url && url !== '' && !url.includes('/images/missing/') ? url : null
  } catch (error) {
    console.error('Error building image URL:', error, source)
    const fallback = expandedAssetUrlFromSource(source)
    if (fallback) return appendSanityImageParams(fallback, options)
    return null
  }
}
