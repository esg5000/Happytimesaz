import { safeFetch } from './safeFetch'
import { q } from './queries'

/**
 * Sanity radio station type (matches the radioStation schema)
 */
export type SanityRadioStation = {
  _id: string
  title: string
  streamUrl: string
  active: boolean
  order?: number
  coverImage?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
      }
    }
  }
  genre?: string
}

/**
 * Unified station type used by the RadioPlayer component
 */
export type RadioStation = {
  id: number
  name: string
  url: string
  source: 'fallback' | 'sanity'
  sanityId?: string
  genre?: string
}

/**
 * Fetches active radio stations from Sanity CMS.
 * Returns empty array if Sanity is unavailable or returns no stations.
 * 
 * This function is designed to fail gracefully - if Sanity is down or
 * returns no stations, the fallback station will still work.
 */
export async function fetchSanityStations(): Promise<SanityRadioStation[]> {
  try {
    const stations = await safeFetch<SanityRadioStation[]>(
      q.activeRadioStations,
      {},
      []
    )
    return stations || []
  } catch (error) {
    console.warn('Failed to fetch radio stations from Sanity:', error)
    return []
  }
}

/**
 * Gets the fallback station from environment variables.
 * This is Station 1, which MUST always exist even if Sanity is empty or offline.
 * 
 * This ensures the radio player always has at least one station available.
 */
function getFallbackStation(): RadioStation | null {
  const name = process.env.NEXT_PUBLIC_RADIO_STATION_1_NAME || ''
  const url = process.env.NEXT_PUBLIC_RADIO_STATION_1_URL || ''
  
  if (!name || !url) {
    return null
  }
  
  return {
    id: 1,
    name,
    url,
    source: 'fallback'
  }
}

/**
 * Merges the fallback station with Sanity stations.
 * 
 * Merge order:
 * 1. Fallback station FIRST (id: 1)
 * 2. Then Sanity stations (id: 2, 3, 4, ...)
 * 
 * Deduplication: If a Sanity station has the same streamUrl as the fallback,
 * it will be skipped to prevent duplicates.
 * 
 * @returns Array of merged stations, with fallback always first (if available)
 */
export async function getMergedStations(): Promise<RadioStation[]> {
  // Get the fallback station (Station 1 from .env.local)
  // This MUST always exist if configured, even if Sanity fails
  const fallback = getFallbackStation()
  
  // Fetch stations from Sanity
  // This will return empty array if Sanity is unavailable
  const sanityStations = await fetchSanityStations()
  
  // Build the merged station list
  const merged: RadioStation[] = []
  const seenUrls = new Set<string>()
  
  // Add fallback station FIRST (if available)
  if (fallback) {
    merged.push(fallback)
    seenUrls.add(fallback.url.toLowerCase())
  }
  
  // Add Sanity stations after the fallback
  // Start ID at 2 (since fallback is 1)
  let nextId = 2
  
  for (const sanityStation of sanityStations) {
    // Skip if streamUrl is missing or duplicate
    if (!sanityStation.streamUrl) continue
    
    const urlLower = sanityStation.streamUrl.toLowerCase()
    if (seenUrls.has(urlLower)) continue
    
    seenUrls.add(urlLower)
    
    merged.push({
      id: nextId++,
      name: sanityStation.title,
      url: sanityStation.streamUrl,
      source: 'sanity',
      sanityId: sanityStation._id,
      genre: sanityStation.genre
    })
  }
  
  return merged
}

