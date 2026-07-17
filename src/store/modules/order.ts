import { defineStore } from 'pinia'

interface OrderState {
  phone: string
  mail: string
  size: string
  price: number
  cell: number | null
  time: number
  priceTotal: number
  code: string
  timeout: boolean
  action: string
  hours: number
}

const initialState = (): OrderState => ({
  phone: '',
  mail: '',
  size: '',
  price: 0,
  cell: null,
  time: 1,
  priceTotal: 0,
  code: '',
  timeout: false,
  action: '',
  hours: 1
})

export const useOrderStore = defineStore('order', {
  state: initialState,

  getters: {
    formattedPrice: (state): string => '$' + state.priceTotal
  },

  actions: {
    reset(): void {
      const fresh = initialState()
      for (const key in fresh) {
        (this as Record<string, unknown>)[key] = fresh[key as keyof OrderState]
      }
    },

    setPhone(phone: string): void {
      this.phone = phone
    },

    setMail(mail: string): void {
      this.mail = mail
    },

    setCell(cell: number): void {
      this.cell = cell
    },

    setCode(code: string): void {
      this.code = code
    },

    setSize(size: string, price: number): void {
      this.size = size
      this.price = price
    },

    setTime(time: number): void {
      this.time = time
      this.priceTotal = time * this.price
    },

    setHours(hours: number, priceTotal: number): void {
      this.hours = hours
      this.priceTotal = priceTotal
    },

    setHasTimeout(hasTimeout: boolean): void {
      this.timeout = hasTimeout
    },

    setAction(action: string): void {
      this.action = action
    }
  }
})
