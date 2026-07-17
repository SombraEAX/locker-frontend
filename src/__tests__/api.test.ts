/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import * as api from '../api/index'

describe('API (mock mode)', () => {
  describe('isPaid', () => {
    it('returns "wait" for first 5 calls, then "success"', async () => {
      const results: string[] = []
      for (let i = 0; i < 7; i++) {
        results.push(await api.isPaid() as string)
      }
      expect(results.slice(0, 5)).toEqual(['wait', 'wait', 'wait', 'wait', 'wait'])
      expect(results[5]).toBe('success')
      expect(results[6]).toBe('wait')
    })
  })

  describe('isOpen', () => {
    it('returns true for first 5 calls, then false', async () => {
      const results: boolean[] = []
      for (let i = 0; i < 7; i++) {
        results.push(await api.isOpen(1) as boolean)
      }
      expect(results.slice(0, 5)).toEqual([true, true, true, true, true])
      expect(results[5]).toBe(false)
      expect(results[6]).toBe(true)
    })
  })

  describe('scan', () => {
    it('returns null for first 5 calls, then "2022"', async () => {
      const results: (string | null)[] = []
      for (let i = 0; i < 7; i++) {
        results.push(await api.scan() as string | null)
      }
      expect(results.slice(0, 5)).toEqual([null, null, null, null, null])
      expect(results[5]).toBe('2022')
      expect(results[6]).toBeNull()
    })
  })

  describe('checkCode', () => {
    it('returns block for code "0000"', async () => {
      const result = await api.checkCode('0000')
      expect(result.status).toBe('block')
      expect(result.cell).toBe(1)
    })
  })

  describe('getLocker', () => {
    it('returns locker data', async () => {
      const locker = await api.getLocker()
      expect(locker).toHaveProperty('childs')
      expect(Array.isArray((locker as any).childs)).toBe(true)
    })
  })

  describe('getSizes', () => {
    it('returns sizes array with id and price', async () => {
      const { sizes } = await api.getSizes()
      expect(Array.isArray(sizes)).toBe(true)
      expect(sizes.length).toBeGreaterThan(0)
      expect(sizes[0]).toHaveProperty('id')
      expect(sizes[0]).toHaveProperty('price')
    })
  })

  describe('cellsBusy', () => {
    it('returns { busy: false }', async () => {
      expect(await api.cellsBusy()).toEqual({ busy: false })
    })
  })

  describe('getTimeout', () => {
    it('returns a number', async () => {
      expect(typeof await api.getTimeout()).toBe('number')
    })
  })

  describe('getPenaltyInfo', () => {
    it('returns timeout and penalty', async () => {
      const info = await api.getPenaltyInfo(1)
      expect(info).toHaveProperty('timeout')
      expect(info).toHaveProperty('penalty')
    })
  })

  describe('getPrice', () => {
    it('returns a number', async () => {
      expect(typeof await api.getPrice(1)).toBe('number')
    })
  })

  describe('getTime', () => {
    it('returns a number', async () => {
      expect(typeof await api.getTime(1)).toBe('number')
    })
  })

  describe('getHardwareInfo', () => {
    it('returns temp and online', async () => {
      const info = await api.getHardwareInfo()
      expect(info).toHaveProperty('temp')
      expect(info).toHaveProperty('online')
    })
  })

  describe('getCellInfo', () => {
    it('returns phone and mail', async () => {
      const info = await api.getCellInfo('1234')
      expect(info).toHaveProperty('phone')
      expect(info).toHaveProperty('mail')
    })
  })

  describe('getLog', () => {
    it('returns 30 log entries', async () => {
      const start = { year: 2024, month: 1, day: 1 }
      const end = { year: 2024, month: 12, day: 31 }
      const logs = await api.getLog(start, end, 0)
      expect(Array.isArray(logs)).toBe(true)
      expect(logs.length).toBe(30)
      expect(logs[0]).toHaveProperty('datetime')
      expect(logs[0]).toHaveProperty('cell')
      expect(logs[0]).toHaveProperty('action')
    })
  })

  describe('getTimes', () => {
    it('returns start and end', async () => {
      const times = await api.getTimes(1)
      expect(times).toHaveProperty('start')
      expect(times).toHaveProperty('end')
    })
  })

  describe('simple mock returns', () => {
    it('extend returns true', async () => {
      expect(await api.extend(1, 24)).toBe(true)
    })

    it('close returns true', async () => {
      expect(await api.close()).toBe(true)
    })

    it('invoice returns true', async () => {
      expect(await api.invoice(100)).toBe(true)
    })

    it('openCell returns true', async () => {
      expect(await api.openCell({ cell: 1, phone: '123', mail: 'a@b.com' })).toBe(true)
    })

    it('storageBegin returns true', async () => {
      expect(await api.storageBegin({ cell: 1 })).toBe(true)
    })
  })
})
