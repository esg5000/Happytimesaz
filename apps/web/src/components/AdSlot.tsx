'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getAdByPlacement } from '@/lib/sanity/ads'
import { getImageUrl } from '@/lib/sanity/image'
import type { Ad } from '@/types/content'

export type AdPlacement = 
  | 'homepage_major'
  | 'homepage_sidebar'
  | 'section_header'
  | 'inline_banner'
  | 'footer_banner'

interface AdSlotProps {
  placement: AdPlacement
  className?: string
  sticky?: boolean
  label?: string
}

/**
 * AdSlot component that fetches and displays ads from Sanity CMS
 * - Fetches highest-priority active ad for the specified placement
 * - Supports both image and HTML ad types
 * - Renders nothing if no active ad exists
 * - Structure supports future rotation and analytics integration
 */
export function AdSlot({ placement, className, sticky = false, label = 'Advertisement' }: AdSlotProps) {
  const [ad, setAd] = useState<Ad | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAd() {
      try {
        const fetchedAd = await getAdByPlacement(placement)
        setAd(fetchedAd)
      } catch (error) {
        console.error('Error fetching ad:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAd()
  }, [placement])

  // Don't render anything if no ad or still loading
  if (loading || !ad) {
    return null
  }

  // Render HTML ad type
  if (ad.adType === 'html' && ad.html) {
    return (
      <div
        className={cn(
          'relative',
          sticky && 'sticky top-20 z-10',
          className
        )}
      >
        <div className="relative">
          {/* Advertisement label */}
          <div className="absolute top-2 left-2 z-10">
            <span className="text-xs font-bold uppercase tracking-wide text-brand-orange/70 bg-white/80 px-1.5 py-0.5 rounded">
              {label}
            </span>
          </div>
          {/* Render HTML content */}
          <div
            dangerouslySetInnerHTML={{ __html: ad.html }}
            className="rounded-xl overflow-hidden"
          />
        </div>
      </div>
    )
  }

  // Render image ad type
  if (ad.adType === 'image' && ad.image) {
    const imageUrl = getImageUrl(ad.image, {
      width: 1200,
      quality: 85
    })

    if (!imageUrl) {
      return null
    }

    const AdContent = (
      <div className="relative w-full rounded-xl overflow-hidden bg-brand-light/50">
        <Image
          src={imageUrl}
          alt={ad.headline || ad.title || 'Advertisement'}
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        {(ad.headline || ad.cta) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
            {ad.headline && (
              <h3 className="text-white font-bold text-lg mb-2">{ad.headline}</h3>
            )}
            {ad.cta && ad.url && (
              <span className="inline-block bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-orange/90 transition-colors">
                {ad.cta}
              </span>
            )}
          </div>
        )}
      </div>
    )

    return (
      <div
        className={cn(
          'relative',
          sticky && 'sticky top-20 z-10',
          className
        )}
      >
        {/* Advertisement label */}
        <div className="absolute top-2 left-2 z-10">
          <span className="text-xs font-bold uppercase tracking-wide text-brand-orange/70 bg-white/80 px-1.5 py-0.5 rounded">
            {label}
          </span>
        </div>
        {/* Ad content with optional link */}
        {ad.url ? (
          <Link href={ad.url} target="_blank" rel="noopener noreferrer" className="block">
            {AdContent}
          </Link>
        ) : (
          AdContent
        )}
      </div>
    )
  }

  // No valid ad content
  return null
}
