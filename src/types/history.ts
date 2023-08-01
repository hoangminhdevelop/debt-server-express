import { HistoryAction } from '@/entities'

export enum Order {
  Desc = 'DESC',
  Asc = 'ASC',
}

export interface HistoryFilter {
  start?: Date
  end?: Date
  debtId?: number
  userId: number
  type?: HistoryAction
  order?: Order
}
