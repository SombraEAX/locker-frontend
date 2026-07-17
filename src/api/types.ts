export interface Cell {
  id: number
  status: string
  type: string
  available: boolean
  blocked: boolean
  height: number
  width?: number
}

export interface LockerGroup {
  width: number
  height?: number
  childs: Cell[]
}

export interface Locker {
  childs: LockerGroup[]
}

export interface Size {
  id: string
  size: string
  price: number
  available: boolean
}

export interface LogEntry {
  datetime: number
  cell: number
  action: string
  mail: string
  phone: string
  id: number
}

export interface CellInfo {
  phone: string
  mail: string
}

export interface Times {
  start: number
  end: number
}

export interface PenaltyInfo {
  timeout: string
  penalty: number
}

export interface DateRange {
  year: number
  month: number
  day: number
}

export type CheckCodeStatus = 'ok' | 'timeout' | 'block' | 'error' | 'not found'

export interface LockerNode {
  id?: number
  type?: string
  available?: boolean
  status?: string
  blocked?: boolean
  width?: number
  height?: number
  childs?: LockerNode[]
}
