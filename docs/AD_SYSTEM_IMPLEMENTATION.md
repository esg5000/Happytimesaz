# Advertising System Implementation

## Overview

A comprehensive advertising placement system has been implemented across all major sections of the website. The system includes reusable components, configuration management, and responsive ad placements.

## Components Created

### 1. Enhanced AdSlot Component (`apps/web/src/components/AdSlot.tsx`)

**Features:**
- Accepts props for size, position, label, and section
- Responsive design with mobile size fallbacks
- Sticky positioning support for sidebar ads
- Clear placeholder styling with dashed borders and dimension labels
- Easy to swap with actual ad code (Google AdSense, direct ads, etc.)

**Props:**
- `size`: AdSize (e.g., '970x90', '300x250', '300x600')
- `position`: AdPosition (e.g., 'top-leaderboard', 'sidebar-sticky')
- `label`: Custom label for the ad slot
- `section`: Section identifier (e.g., 'news', 'food', 'cannabis')
- `sticky`: Boolean for sticky positioning
- `mobileSize`: Optional mobile-specific size
- `className`: Additional CSS classes

### 2. Ad Configuration (`apps/web/src/lib/ads/config.ts`)

**Features:**
- Centralized ad configuration per section
- Enable/disable ads easily
- Type-safe ad size and position definitions
- Helper functions to get ads for sections

**Usage:**
```typescript
import { getAdsForSection, getAdConfig } from '@/lib/ads/config'

// Get all ads for a section
const newsAds = getAdsForSection('news')

// Get specific ad config
const heroAd = getAdConfig('food', 'hero-banner')
```

## Ad Placements by Section

### News Section
- ✅ Top leaderboard: 970x90 (Major sponsors, rotating)
- ✅ In-feed after 3rd article: 300x250 (Local businesses)
- ✅ Sidebar sticky: 300x600 (Premium sponsor)
- ✅ In-feed after 8th article: 728x90 (Regional advertisers)

### Food Section
- ✅ Hero banner: 970x250 (Featured restaurant/delivery service)
- ✅ In-content top: 300x250 (Best Pizza/Delivery)
- ✅ Sidebar: 300x250 (Happy hour specials, rotating)
- ✅ In-content mid: 728x90 (Food delivery apps)
- ✅ In-content lower: 300x250 (Restaurant week promos)
- ✅ Bottom sticky mobile: 320x50 (Food deals)

### Cannabis Section
- ✅ Top banner: 970x90 (Dispensary network sponsor)
- ✅ Sidebar top: 300x250 (Featured dispensary #1)
- ✅ In-feed after 2nd item: 728x90 (Product spotlight)
- ✅ Sidebar mid: 300x250 (Featured dispensary #2)
- ✅ In-feed after 5th item: 300x250 (Brand partnership)
- ✅ Sidebar bottom: 300x250 (Featured dispensary #3)
- ✅ Footer banner: 970x90 (Accessories/services)

### Nightlife Section
- ✅ Hero takeover: 1920x400 (Featured venue, weekly rotation)
- ✅ Sidebar sticky: 300x600 (Happy hour specials)
- ✅ In-content top: 728x90 (Drink specials)
- ✅ Grid tile: 300x250 (Best bars, native ad style)
- ✅ In-content mid: 300x250 (Event promoter)
- ✅ Bottom banner: 970x90 (Rideshare partners)

### Mushroom Guide Section
- ✅ Top banner: 970x90 (Premium mushroom brand)
- ✅ Sidebar top: 300x250 (Vendor spotlight #1)
- ✅ Sidebar mid: 300x250 (Vendor spotlight #2)
- ✅ In-guide after intro: 728x90 (Educational sponsor)
- ✅ Sidebar bottom: 300x250 (Vendor spotlight #3)
- ✅ In-guide mid: 300x250 (Product category feature)
- ✅ In-guide lower: 728x90 (Testing/safety services)
- ✅ Footer: 970x90 (Community resources)

### Events Section
- ✅ Above calendar: 970x250 (Featured event sponsor)
- ✅ Calendar sidebar: 300x250 (Ticket platform partner)
- ✅ Between listings: 728x90 (Venue promotion, rotating)
- ✅ Article sidebar: 300x600 (Upcoming highlights, sticky)

## Responsive Behavior

- **Leaderboards (970x, 728x)**: Automatically switch to 320x50 on mobile
- **Large banners (970x250, 1920x400)**: Collapse to 320x50 on mobile
- **Sidebar ads**: Stack below content on mobile
- **Sticky ads**: Only sticky on desktop/tablet, normal flow on mobile

## Styling

All ad placeholders feature:
- Dashed orange borders (`border-brand-orange/30`)
- Light background (`bg-brand-light/50`)
- Clear dimension labels
- "Advertisement" label in top-left
- Responsive sizing

## Next Steps: Integrating Real Ads

### Option 1: Google AdSense
```tsx
<AdSlot size="970x90" position="top-leaderboard" section="news">
  <div id="ad-slot-news-top">
    {/* Google AdSense code */}
  </div>
</AdSlot>
```

### Option 2: Direct Ad Code
```tsx
<AdSlot size="300x250" position="sidebar-top" section="cannabis">
  <script async src="ad-provider.js"></script>
  <div data-ad-id="cannabis-sidebar-1"></div>
</AdSlot>
```

### Option 3: Sanity CMS Integration
Store ad content in Sanity and fetch dynamically:
```tsx
const ad = await getAdForSlot('cannabis', 'sidebar-top')
<AdSlot {...ad}>
  {ad.content}
</AdSlot>
```

## Configuration Management

To enable/disable ads, edit `apps/web/src/lib/ads/config.ts`:

```typescript
export const adConfigs: Record<string, AdConfig[]> = {
  news: [
    { 
      section: 'news', 
      position: 'top-leaderboard', 
      size: '970x90', 
      enabled: true  // Set to false to disable
    },
    // ...
  ],
}
```

## Notes

- All ad slots are clearly labeled with "Advertisement"
- Mobile responsive behavior is built-in
- Sticky sidebar ads stay visible during scroll (desktop only)
- Easy to swap placeholders with actual ad code
- Configuration system allows easy management of ad inventory

