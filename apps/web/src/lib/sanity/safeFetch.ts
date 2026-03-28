import { sanityClient } from './client'

export async function safeFetch<T>(query: string, params?: Record<string, any>, fallback: T = [] as any): Promise<T> {
  try {
    const res = await sanityClient.fetch<T>(query, params ?? ({} as Record<string, unknown>))
    return (res ?? fallback) as T
  } catch {
    return fallback
  }
}
