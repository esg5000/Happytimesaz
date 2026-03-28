import { getAdByPlacement } from '@/lib/sanity/ads'
import {
  AdRenderer,
  type AdSlotSize,
  type AdSlotVariant
} from '@/components/ads/AdRenderer'

export type { AdSlotSize, AdSlotVariant }

/**
 * Server component — fetches active Sanity ad for `placement` and renders a labeled slot.
 * Use `size` + `variant` for consistent layout and disclosure copy sitewide.
 */
export async function AdSlot({
  placement,
  size,
  variant = 'display',
  className,
  sticky,
  label,
  /** `omit` hides the slot when Sanity has no active ad (no placeholder). */
  empty = 'placeholder'
}: {
  placement: string
  size: AdSlotSize
  variant?: AdSlotVariant
  className?: string
  sticky?: boolean
  label?: string
  empty?: 'placeholder' | 'omit'
}) {
  const ad = await getAdByPlacement(placement)
  if (!ad && empty === 'omit') return null
  return (
    <AdRenderer
      ad={ad}
      size={size}
      variant={variant}
      className={className}
      sticky={sticky}
      labelOverride={label}
    />
  )
}
