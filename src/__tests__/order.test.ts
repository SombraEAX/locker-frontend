import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOrderStore } from '../store/modules/order'

describe('Order Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default values', () => {
    const store = useOrderStore()
    expect(store.phone).toBe('')
    expect(store.mail).toBe('')
    expect(store.size).toBe('')
    expect(store.price).toBe(0)
    expect(store.cell).toBeNull()
    expect(store.time).toBe(1)
    expect(store.priceTotal).toBe(0)
    expect(store.code).toBe('')
    expect(store.timeout).toBe(false)
    expect(store.action).toBe('')
    expect(store.hours).toBe(1)
  })

  it('formattedPrice getter returns $ + priceTotal', () => {
    const store = useOrderStore()
    store.priceTotal = 150
    expect(store.formattedPrice).toBe('$150')
  })

  it('setPhone updates phone', () => {
    const store = useOrderStore()
    store.setPhone('6667771111')
    expect(store.phone).toBe('6667771111')
  })

  it('setMail updates mail', () => {
    const store = useOrderStore()
    store.setMail('test@example.com')
    expect(store.mail).toBe('test@example.com')
  })

  it('setCell updates cell', () => {
    const store = useOrderStore()
    store.setCell(5)
    expect(store.cell).toBe(5)
  })

  it('setCode updates code', () => {
    const store = useOrderStore()
    store.setCode('1234')
    expect(store.code).toBe('1234')
  })

  it('setSize updates size and price', () => {
    const store = useOrderStore()
    store.setSize('L', 100)
    expect(store.size).toBe('L')
    expect(store.price).toBe(100)
  })

  it('setTime updates time and recalculates priceTotal', () => {
    const store = useOrderStore()
    store.setSize('L', 100)
    store.setTime(3)
    expect(store.time).toBe(3)
    expect(store.priceTotal).toBe(300)
  })

  it('setHours updates hours and priceTotal', () => {
    const store = useOrderStore()
    store.setHours(5, 500)
    expect(store.hours).toBe(5)
    expect(store.priceTotal).toBe(500)
  })

  it('setHasTimeout updates timeout', () => {
    const store = useOrderStore()
    store.setHasTimeout(true)
    expect(store.timeout).toBe(true)
  })

  it('setAction updates action', () => {
    const store = useOrderStore()
    store.setAction('extend')
    expect(store.action).toBe('extend')
  })

  it('reset returns all fields to initial values', () => {
    const store = useOrderStore()
    store.setPhone('6667771111')
    store.setMail('test@example.com')
    store.setCell(5)
    store.setSize('L', 100)
    store.setTime(3)
    store.setCode('1234')
    store.setAction('extend')
    store.setHasTimeout(true)

    store.reset()

    expect(store.phone).toBe('')
    expect(store.mail).toBe('')
    expect(store.size).toBe('')
    expect(store.price).toBe(0)
    expect(store.cell).toBeNull()
    expect(store.time).toBe(1)
    expect(store.priceTotal).toBe(0)
    expect(store.code).toBe('')
    expect(store.timeout).toBe(false)
    expect(store.action).toBe('')
    expect(store.hours).toBe(1)
  })
})
