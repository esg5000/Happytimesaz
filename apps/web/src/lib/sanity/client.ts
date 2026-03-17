import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

if (!projectId || !dataset) {
  // Don't throw at build time for scaffolds; pages will render fallback states.
}

export const sanityClient = createClient({
  projectId: projectId || 'missing',
  dataset: dataset || 'missing',
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN
})
