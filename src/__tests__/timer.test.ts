/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { timeout, interval } from '../helpers/timer'

describe('timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('timeout', () => {
    it('calls function after delay', () => {
      const fn = vi.fn()
      timeout(fn, 1000)

      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1000)
      expect(fn).toHaveBeenCalledOnce()
    })

    it('can be cleared before firing', () => {
      const fn = vi.fn()
      const handle = timeout(fn, 1000)

      handle.clear()
      vi.advanceTimersByTime(2000)
      expect(fn).not.toHaveBeenCalled()
    })
  })

  describe('interval', () => {
    it('calls function repeatedly', () => {
      const fn = vi.fn()
      interval(fn, 500)

      vi.advanceTimersByTime(2500)
      expect(fn).toHaveBeenCalledTimes(5)
    })

    it('can be cleared', () => {
      const fn = vi.fn()
      const handle = interval(fn, 500)

      vi.advanceTimersByTime(1500)
      handle.clear()
      vi.advanceTimersByTime(2000)
      expect(fn).toHaveBeenCalledTimes(3)
    })
  })
})
