import { getAdByPlacement } from '@/lib/sanity/ads'
import { AdRenderer } from '@/components/ads/AdRenderer'

/** Mid-article partner / affiliate native card from Sanity `article_partner_mid`. */
export async function PartnerCallout() {
  const ad = await getAdByPlacement('article_partner_mid')
  if (!ad) return null
  return (
    <div className="my-10">
      <AdRenderer ad={ad} size="native-card" variant="affiliate" />
    </div>
  )
}
