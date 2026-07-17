/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { pad, getHeight, formatTimestamp, formatPhone, formatMail } from '../helpers/format'

describe('pad', () => {
  it('pads single-digit numbers with leading zero', () => {
    expect(pad(0)).toBe('00')
    expect(pad(1)).toBe('01')
    expect(pad(9)).toBe('09')
  })

  it('does not pad double-digit numbers', () => {
    expect(pad(10)).toBe('10')
    expect(pad(99)).toBe('99')
  })
})

describe('formatTimestamp', () => {
  it('formats unix timestamp to YYYY.MM.DD HH:mm', () => {
    // 2024-01-15 10:30:00 UTC
    const timestamp = 1705311000
    const result = formatTimestamp(timestamp)
    expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/)
  })
})

describe('formatPhone', () => {
  it('formats 10-digit string to +1 (XXX) XXX-XXXX', () => {
    expect(formatPhone('6667771111')).toBe('+1 (666) 777-1111')
  })

  it('formats number to phone format', () => {
    expect(formatPhone(6667771111)).toBe('+1 (666) 777-1111')
  })

  it('returns empty string for falsy input', () => {
    expect(formatPhone('')).toBe('')
    expect(formatPhone(null)).toBe('')
    expect(formatPhone(undefined)).toBe('')
  })

  it('strips non-digit characters before formatting', () => {
    expect(formatPhone('666-777-1111')).toBe('+1 (666) 777-1111')
  })
})

describe('formatMail', () => {
  it('returns email as-is if shorter than 25 chars', () => {
    expect(formatMail('test@example.com')).toBe('test@example.com')
  })

  it('truncates long emails to 25 chars with ellipsis', () => {
    const longEmail = 'this-is-a-very-long-email@example.com'
    const result = formatMail(longEmail)
    expect(result.length).toBe(26) // 25 + ellipsis char
    expect(result).toContain('…')
  })

  it('returns empty string for falsy input', () => {
    expect(formatMail('')).toBe('')
    expect(formatMail(null)).toBe('')
  })
})

describe('getHeight', () => {
  it('calculates total height including margins', () => {
    const el = document.createElement('div')
    // Mock offsetHeight and getComputedStyle
    Object.defineProperty(el, 'offsetHeight', { value: 100 })
    vi.stubGlobal('getComputedStyle', () => ({
      getPropertyValue: (prop: string) => {
        if (prop === 'margin-top') return '10'
        if (prop === 'margin-bottom') return '20'
        return '0'
      }
    }))
    expect(getHeight(el)).toBe(130)
  })
})
