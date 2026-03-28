'use client'

import { PortableText as SanityPortableText } from '@portabletext/react'
import Image from 'next/image'
import { getImageUrl, isSanityCdnUrl } from '@/lib/sanity/image'

interface PortableTextProps {
  content: any
}

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      const imageUrl = getImageUrl(value, {
        width: 1200,
        quality: 85
      })

      if (!imageUrl) {
        return null
      }

      return (
        <div className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              unoptimized={isSanityCdnUrl(imageUrl)}
            />
          </div>
          {value.caption ? (
            <p className="mt-2 text-center font-sans text-sm text-az-ink-muted">{value.caption}</p>
          ) : null}
        </div>
      )
    }
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="font-display mt-8 mb-4 text-4xl font-bold tracking-tight text-az-ink">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="font-display mt-10 mb-3 text-3xl font-bold tracking-tight text-az-ink">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="font-display mt-8 mb-2 text-2xl font-bold text-az-ink">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="font-display mt-6 mb-2 text-xl font-bold text-az-ink">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-az-terracotta pl-4 font-sans italic text-az-ink-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 font-sans leading-relaxed text-az-ink">{children}</p>
    )
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-az-ink">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => {
      const target = value.href?.startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="font-semibold text-az-terracotta underline decoration-az-terracotta/40 underline-offset-2 hover:text-az-terracotta-deep"
        >
          {children}
        </a>
      )
    },
    affiliateLink: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-baseline gap-1 rounded-md border border-az-gold/60 bg-az-gold/20 px-1.5 py-0.5 font-sans text-sm font-semibold text-az-ink underline decoration-az-terracotta decoration-2 underline-offset-2 transition hover:bg-az-gold/35"
      >
        <span>{children}</span>
        <span className="whitespace-nowrap font-sans text-[10px] font-bold uppercase tracking-wider text-az-terracotta-deep">
          Partner
        </span>
      </a>
    )
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 font-sans text-az-ink">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 font-sans text-az-ink">{children}</ol>
    )
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    )
  }
}

export function PortableText({ content }: PortableTextProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return (
      <div className="rounded-2xl border border-az-sand bg-az-cream-dark/40 p-6">
        <p className="font-sans text-sm text-az-ink-muted">No content available for this article.</p>
      </div>
    )
  }

  return (
    <div className="prose prose-slate max-w-none">
      <SanityPortableText value={content} components={components as any} />
    </div>
  )
}
