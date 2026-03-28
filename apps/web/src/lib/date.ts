const DEFAULT_LOCALE = 'en-US'

/**
 * Stable date formatter for SSR output.
 * Uses a fixed UTC timezone to avoid locale/runtime drift between
 * server environments and hydrated client checks.
 */
export function formatDateUtc(
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = DEFAULT_LOCALE
): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...options }).format(date)
}
