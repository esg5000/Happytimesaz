import type React from "react"

import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { RadioPlayer } from '@/components/RadioPlayer'

export const metadata: Metadata = {
  title: {
    default: 'HappytimesAZ',
    template: '%s · HappytimesAZ'
  },
  description: 'Arizona discovery: cannabis, food, nightlife, events, and more.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Note: Replace with actual font URLs when available, or use @font-face for local fonts */}
      </head>
      <body>
        {children}
        <RadioPlayer />
      </body>
    </html>
  )
}
