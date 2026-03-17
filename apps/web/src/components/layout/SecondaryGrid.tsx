import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types/content'
import { getImageUrl } from '@/lib/sanity/image'

interface SecondaryGridProps {
  items: Array<{
    _id?: string
    title: string
    excerpt?: string
    category?: string | { title?: string }
    heroImage?: any
    slug?: { current: string }
    publishedAt?: string
    readTime?: number
  }>
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export function SecondaryGrid({ items, columns = { mobile: 2, tablet: 3, desktop: 3 } }: SecondaryGridProps) {
  if (!items || items.length === 0) return null

  // Build grid classes using explicit Tailwind classes
  // Using conditional logic to ensure Tailwind JIT picks up the classes
  const mobile = columns.mobile || 2
  const tablet = columns.tablet || 3
  const desktop = columns.desktop || 3

  const gridClass = [
    'grid',
    'gap-4',
    mobile === 1 ? 'grid-cols-1' : mobile === 2 ? 'grid-cols-2' : mobile === 3 ? 'grid-cols-3' : 'grid-cols-4',
    tablet === 1 ? 'md:grid-cols-1' : tablet === 2 ? 'md:grid-cols-2' : tablet === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4',
    desktop === 1 ? 'lg:grid-cols-1' : desktop === 2 ? 'lg:grid-cols-2' : desktop === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
  ].join(' ')

  return (
    <div className={gridClass}>
      {items.map((item, idx) => {
        const categoryTitle = typeof item.category === 'string' 
          ? item.category 
          : item.category?.title || 'News'
        
        // Use urlFor helper to get proper Sanity image URL
        const src = getImageUrl(item?.heroImage ?? item?.image ?? item?.mainImage ?? null, {
          width: 800,
          quality: 80
        })

        // Safe alt text - never undefined
        const altText = item?.title ? `${item.title} featured image` : 'Featured image'

        return (
          <article key={item._id || `item-${idx}`} className="group">
            <Link 
              href={item.slug?.current ? `/article/${item.slug.current}` : '#'}
              className="block rounded-2xl border border-brand-light bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image */}
              {src ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-brand-light mb-3">
                  <Image
                    src={src}
                    alt={altText}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-brand-light/60 mb-3">
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-xs text-brand-dark/30">No image</span>
                  </div>
                </div>
              )}

              {/* Category */}
              {categoryTitle && (
                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-orange/70">
                    {categoryTitle}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="text-base font-bold leading-tight text-brand-dark line-clamp-2">
                {item.title}
              </h2>

              {/* Excerpt */}
              {item.excerpt && (
                <p className="mt-2 text-sm text-brand-dark/70 line-clamp-2">
                  {item.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-brand-orange">
                  Read →
                </span>
                {item.readTime && (
                  <span className="text-xs text-brand-dark/40">{item.readTime} min</span>
                )}
              </div>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

