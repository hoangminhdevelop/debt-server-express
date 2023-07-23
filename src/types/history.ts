import { HistoryAction } from '@/entities'

export interface HistoryFilter {
  start?: Date
  end?: Date
  debtId?: number
  userId: number
  type?: HistoryAction
}
