/**
 * Ad Configuration
 * 
 * Enable/disable ads per section and manage ad placements
 */

export type AdSize = 
  | '970x90'   // Leaderboard
  | '970x250'  // Billboard
  | '728x90'   // Leaderboard (smaller)
  | '300x250'  // Medium Rectangle
  | '300x600'  // Half Page
  | '320x50'   // Mobile Banner
  | '1920x400' // Hero Takeover

export type AdPosition = 
  | 'top-leaderboard'
  | 'hero-banner'
  | 'hero-takeover'
  | 'sidebar-top'
  | 'sidebar-mid'
  | 'sidebar-bottom'
  | 'sidebar-sticky'
  | 'in-feed'
  | 'in-content-top'
  | 'in-content-mid'
  | 'in-content-lower'
  | 'grid-tile'
  | 'footer-banner'
  | 'bottom-sticky-mobile'

export interface AdConfig {
  section: string
  position: AdPosition
  size: AdSize
  label?: string
  sticky?: boolean
  mobileSize?: AdSize
  enabled?: boolean
}

// Ad configuration per section
export const adConfigs: Record<string, AdConfig[]> = {
  news: [
    { section: 'news', position: 'top-leaderboard', size: '970x90', label: 'Major Sponsors', enabled: true },
    { section: 'news', position: 'in-feed', size: '300x250', label: 'Local Businesses', enabled: true, mobileSize: '320x50' },
    { section: 'news', position: 'sidebar-sticky', size: '300x600', label: 'Premium Sponsor', enabled: true },
    { section: 'news', position: 'in-feed', size: '728x90', label: 'Regional Advertisers', enabled: true, mobileSize: '320x50' },
  ],
  food: [
    { section: 'food', position: 'hero-banner', size: '970x250', label: 'Featured Restaurant', enabled: true, mobileSize: '320x50' },
    { section: 'food', position: 'in-content-top', size: '300x250', label: 'Best Pizza/Delivery', enabled: true },
    { section: 'food', position: 'sidebar-mid', size: '300x250', label: 'Happy Hour Specials', enabled: true },
    { section: 'food', position: 'in-content-mid', size: '728x90', label: 'Food Delivery Apps', enabled: true, mobileSize: '320x50' },
    { section: 'food', position: 'in-content-lower', size: '300x250', label: 'Restaurant Week', enabled: true },
    { section: 'food', position: 'bottom-sticky-mobile', size: '320x50', label: 'Food Deals', enabled: true },
  ],
  cannabis: [
    { section: 'cannabis', position: 'top-leaderboard', size: '970x90', label: 'Dispensary Network', enabled: true },
    { section: 'cannabis', position: 'sidebar-top', size: '300x250', label: 'Featured Dispensary #1', enabled: true },
    { section: 'cannabis', position: 'in-feed', size: '728x90', label: 'Product Spotlight', enabled: true, mobileSize: '320x50' },
    { section: 'cannabis', position: 'sidebar-mid', size: '300x250', label: 'Featured Dispensary #2', enabled: true },
    { section: 'cannabis', position: 'in-feed', size: '300x250', label: 'Brand Partnership', enabled: true },
    { section: 'cannabis', position: 'sidebar-bottom', size: '300x250', label: 'Featured Dispensary #3', enabled: true },
    { section: 'cannabis', position: 'footer-banner', size: '970x90', label: 'Accessories/Services', enabled: true },
  ],
  nightlife: [
    { section: 'nightlife', position: 'hero-takeover', size: '1920x400', label: 'Featured Venue', enabled: true, mobileSize: '320x50' },
    { section: 'nightlife', position: 'sidebar-sticky', size: '300x600', label: 'Happy Hour Specials', enabled: true },
    { section: 'nightlife', position: 'in-content-top', size: '728x90', label: 'Drink Specials', enabled: true, mobileSize: '320x50' },
    { section: 'nightlife', position: 'grid-tile', size: '300x250', label: 'Best Bars', enabled: true },
    { section: 'nightlife', position: 'in-content-mid', size: '300x250', label: 'Event Promoter', enabled: true },
    { section: 'nightlife', position: 'footer-banner', size: '970x90', label: 'Rideshare Partners', enabled: true },
  ],
  'mushroom-guide': [
    { section: 'mushroom-guide', position: 'top-leaderboard', size: '970x90', label: 'Premium Mushroom Brand', enabled: true },
    { section: 'mushroom-guide', position: 'sidebar-top', size: '300x250', label: 'Vendor Spotlight #1', enabled: true },
    { section: 'mushroom-guide', position: 'sidebar-mid', size: '300x250', label: 'Vendor Spotlight #2', enabled: true },
    { section: 'mushroom-guide', position: 'in-content-top', size: '728x90', label: 'Educational Sponsor', enabled: true, mobileSize: '320x50' },
    { section: 'mushroom-guide', position: 'sidebar-bottom', size: '300x250', label: 'Vendor Spotlight #3', enabled: true },
    { section: 'mushroom-guide', position: 'in-content-mid', size: '300x250', label: 'Product Category', enabled: true },
    { section: 'mushroom-guide', position: 'in-content-lower', size: '728x90', label: 'Testing/Safety Services', enabled: true, mobileSize: '320x50' },
    { section: 'mushroom-guide', position: 'footer-banner', size: '970x90', label: 'Community Resources', enabled: true },
  ],
  events: [
    { section: 'events', position: 'hero-banner', size: '970x250', label: 'Featured Event Sponsor', enabled: true, mobileSize: '320x50' },
    { section: 'events', position: 'sidebar-mid', size: '300x250', label: 'Ticket Platform', enabled: true },
    { section: 'events', position: 'in-feed', size: '728x90', label: 'Venue Promotion', enabled: true, mobileSize: '320x50' },
    { section: 'events', position: 'sidebar-sticky', size: '300x600', label: 'Upcoming Highlights', enabled: true },
  ],
}

/**
 * Get ad configs for a specific section
 */
export function getAdsForSection(section: string): AdConfig[] {
  return adConfigs[section]?.filter(ad => ad.enabled !== false) || []
}

/**
 * Get a specific ad config by section and position
 */
export function getAdConfig(section: string, position: AdPosition): AdConfig | undefined {
  return adConfigs[section]?.find(ad => ad.position === position && ad.enabled !== false)
}

