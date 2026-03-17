import { safeFetch } from './safeFetch'
import { q } from './queries'
import type { Ad } from '@/types/content'

/**
 * Fetches the highest-priority active ad for a given placement
 * - Filters by placement and active status
 * - Respects startDate/endDate if defined
 * - Orders by priority descending
 * - Returns a single ad or null
 */
export async function getAdByPlacement(placement: string): Promise<Ad | null> {
  return safeFetch<Ad | null>(
    q.adByPlacement(placement),
    { placement },
    null
  )
}

