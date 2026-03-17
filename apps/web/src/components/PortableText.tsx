'use client'

import { PortableText as SanityPortableText } from '@portabletext/react'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity/image'

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
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <p className="mt-2 text-center text-sm text-brand-dark/60">{value.caption}</p>
          )}
        </div>
      )
    }
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="mt-8 mb-4 text-4xl font-black text-brand-dark">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="mt-6 mb-3 text-3xl font-black text-brand-dark">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="mt-5 mb-2 text-2xl font-bold text-brand-dark">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="mt-4 mb-2 text-xl font-bold text-brand-dark">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="my-4 border-l-4 border-brand-orange pl-4 italic text-brand-dark/80">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-brand-dark/90">{children}</p>
    )
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-brand-dark">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => {
      const target = value.href?.startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-brand-orange hover:underline"
        >
          {children}
        </a>
      )
    }
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-brand-dark/90">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-brand-dark/90">{children}</ol>
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
      <div className="rounded-2xl border border-brand-light bg-brand-light/30 p-6">
        <p className="text-sm text-brand-dark/70">No content available for this article.</p>
      </div>
    )
  }

  return (
    <div className="prose prose-slate max-w-none">
      <SanityPortableText value={content} components={components} />
    </div>
  )
}

