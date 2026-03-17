import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary brand colors from HappyTimes AZ brand book
          orange: {
            DEFAULT: '#f3b237', // Primary orange/amber
            50: '#fef8f0',
            100: '#fdeee0',
            200: '#fbd9b8',
            300: '#f8be85',
            400: '#f3b237', // Primary
            500: '#e69a4f',
            600: '#cc7a33',
            700: '#b3621f',
            800: '#944f1a',
            900: '#7a4018'
          },
          dark: {
            DEFAULT: '#1b1d1d', // Dark gray/black
            50: '#f5f5f5',
            100: '#e5e5e5',
            200: '#cccccc',
            300: '#b3b3b3',
            400: '#999999',
            500: '#808080',
            600: '#666666',
            700: '#4d4d4d',
            800: '#333333',
            900: '#1b1d1d' // Primary dark
          },
          light: {
            DEFAULT: '#efefef', // Light gray/off-white
            50: '#efefef',
            100: '#f9f9f9',
            200: '#f5f5f5'
        }
        }
      },
      fontFamily: {
        sans: ['Stevie Sans', 'system-ui', 'sans-serif'],
        display: ['Citrus Gothic', 'Stevie Sans', 'system-ui', 'sans-serif']
      },
      fontWeight: {
        book: '400',
        bold: '700',
        black: '900'
      }
    }
  },
  plugins: []
} satisfies Config
