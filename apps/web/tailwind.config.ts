import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        // 8px base grid
        18: '4.5rem',
        22: '5.5rem'
      },
      maxWidth: {
        content: '80rem'
      },
      colors: {
        // Legacy brand.* kept for gradual migration
        brand: {
          orange: {
            DEFAULT: '#e85d2a',
            50: '#fff4ed',
            100: '#ffe6d5',
            200: '#ffc9a8',
            300: '#ffa270',
            400: '#ff7a38',
            500: '#e85d2a',
            600: '#c94a1f',
            700: '#a63c1c',
            800: '#86331d',
            900: '#6e2e1c'
          },
          dark: {
            DEFAULT: '#1a1412',
            50: '#faf6f1',
            100: '#f0ebe4',
            200: '#ddd5cb',
            300: '#c4b9ab',
            400: '#9c8f7e',
            500: '#7a6c5f',
            600: '#5e5248',
            700: '#4a4039',
            800: '#2e2824',
            900: '#1a1412'
          },
          light: {
            DEFAULT: '#e8e0d8',
            50: '#faf6f1',
            100: '#f3ede6',
            200: '#e8e0d8'
          }
        },
        /** Arizona sunset system */
        az: {
          cream: '#faf6f1',
          'cream-dark': '#f3ede6',
          ink: '#1a1412',
          'ink-muted': '#4a4039',
          terracotta: '#e85d2a',
          'terracotta-deep': '#c94a1f',
          gold: '#d4a03c',
          ember: '#b83226',
          sand: '#e8e0d8'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif']
      },
      fontWeight: {
        book: '400',
        bold: '700',
        black: '900'
      },
      boxShadow: {
        card: '0 1px 0 rgba(26, 20, 18, 0.06), 0 8px 24px rgba(26, 20, 18, 0.08)',
        lift: '0 12px 40px rgba(26, 20, 18, 0.12)'
      }
    }
  },
  plugins: []
} satisfies Config
