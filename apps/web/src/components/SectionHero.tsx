import type React from "react"
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function SectionHero({
  title,
  subtitle,
  right,
  heroImage
}: {
  title: string
  subtitle?: string
  right?: React.ReactNode
  heroImage?: string
}) {
  return (
    <section className={cn(
      "relative border-b border-brand-orange/20 overflow-hidden",
      heroImage ? "min-h-[250px] md:min-h-[300px]" : "bg-gradient-to-br from-brand-orange/10 via-brand-orange/5 to-white"
    )}>
      {/* Hero Image Background */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/20"></div>
        </div>
      )}

      <div className="container-page relative z-10 flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className={cn(
            "text-3xl font-black tracking-tight md:text-4xl",
            heroImage ? "text-white drop-shadow-lg" : "text-brand-dark"
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn(
              "mt-2 max-w-2xl",
              heroImage ? "text-white/90 drop-shadow-md" : "text-brand-dark/70"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {right ? <div className={cn('flex items-center gap-2')}>{right}</div> : null}
      </div>
    </section>
  )
}
