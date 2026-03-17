import type React from 'react'
import { AdSlot } from '@/components/AdSlot'

interface BillboardProps {
  children?: React.ReactNode
  adSlot?: {
    size: string
    position: string
    label: string
    section: string
    mobileSize?: string
  }
}

export function Billboard({ children, adSlot }: BillboardProps) {
  if (!children && !adSlot) return null

  return (
    <section className="border-b border-brand-light bg-white">
      <div className="container-page py-6">
        {children || (adSlot && (
          <AdSlot
            size={adSlot.size}
            position={adSlot.position}
            label={adSlot.label}
            section={adSlot.section}
            mobileSize={adSlot.mobileSize}
          />
        ))}
      </div>
    </section>
  )
}

