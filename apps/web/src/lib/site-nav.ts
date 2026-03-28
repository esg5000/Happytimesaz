export type SiteNavItem = {
  href: string
  label: string
  isRadio?: boolean
  tagline: string
  /** Key for mapping icons in client components */
  iconKey:
    | 'food'
    | 'cannabis'
    | 'nightlife'
    | 'mushrooms'
    | 'events'
    | 'classes'
    | 'radio'
}

export const SITE_NAV: SiteNavItem[] = [
  { href: '/food', label: 'Food', iconKey: 'food', tagline: 'Dining & drinks' },
  { href: '/cannabis', label: 'Cannabis', iconKey: 'cannabis', tagline: 'Deals & dispensaries' },
  { href: '/nightlife', label: 'Nightlife', iconKey: 'nightlife', tagline: 'After dark' },
  { href: '/mushroom-guide', label: 'Mushrooms', iconKey: 'mushrooms', tagline: 'Guides & culture' },
  { href: '/events', label: 'Events', iconKey: 'events', tagline: "What's on" },
  { href: '/classes', label: 'Classes', iconKey: 'classes', tagline: 'Learn & grow' },
  { href: '/gta-radio', label: 'GTA Radio', iconKey: 'radio', tagline: 'Live local', isRadio: true }
]

export const EDITORIAL_NAV = SITE_NAV.filter((i) => !i.isRadio)
export const RADIO_NAV_ITEM = SITE_NAV.find((i) => i.isRadio)!
