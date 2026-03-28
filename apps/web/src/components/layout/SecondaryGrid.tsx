import { ArticleCard, type ArticleCardModel } from '@/components/cards/ArticleCard'
import { cn } from '@/lib/utils'

interface SecondaryGridProps {
  items: Array<{
    _id?: string
    title: string
    excerpt?: string
    category?: string | { title?: string }
    heroImage?: unknown
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

export function SecondaryGrid({ items, columns = { mobile: 1, tablet: 2, desktop: 3 } }: SecondaryGridProps) {
  if (!items || items.length === 0) return null

  const mobile = columns.mobile ?? 1
  const tablet = columns.tablet ?? 2
  const desktop = columns.desktop ?? 3

  const gridClass = [
    'grid',
    'gap-6',
    mobile === 1 ? 'grid-cols-1' : mobile === 2 ? 'grid-cols-2' : 'grid-cols-3',
    tablet === 1 ? 'md:grid-cols-1' : tablet === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3',
    desktop === 1 ? 'lg:grid-cols-1' : desktop === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  ].join(' ')

  return (
    <div className={cn(gridClass)}>
      {items.map((item, idx) => (
        <ArticleCard key={item._id || `item-${idx}`} item={item as ArticleCardModel} priority={idx < 3} />
      ))}
    </div>
  )
}
