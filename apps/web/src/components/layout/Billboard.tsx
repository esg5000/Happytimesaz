import type React from 'react'
import { AdSlot } from '@/components/AdSlot'

interface BillboardProps {
  children?: React.ReactNode
  /** Fetch ad from Sanity by placement (leaderboard / display). */
  placement?: string
  label?: string
}

export function Billboard({ children, placement, label }: BillboardProps) {
  if (!children && !placement) return null

  return (
    <section className="border-b border-az-sand/80 bg-white/90">
      <div className="container-page py-6 md:py-8">
        {children ?? (
          <AdSlot
            placement={placement!}
            size="leaderboard"
            variant="display"
            label={label ?? 'Advertisement'}
          />
        )}
      </div>
    </section>
  )
}
