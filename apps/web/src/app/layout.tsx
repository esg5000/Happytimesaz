import type React from 'react'

import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import { RadioPlayer } from '@/components/RadioPlayer'

const fontSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

const fontDisplay = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'HappytimesAZ',
    template: '%s · HappytimesAZ'
  },
  description:
    'Arizona lifestyle: food, cannabis, nightlife, mushrooms, events, classes, and GTA Radio.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body suppressHydrationWarning data-radio-bar="true" className="min-h-screen">
        {children}
        <RadioPlayer />
      </body>
    </html>
  )
}
