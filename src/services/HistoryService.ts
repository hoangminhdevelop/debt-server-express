import { DebtBase, History, HistoryAction } from '@/entities'
import { UserRepository, userRepository, HistoryRepository, historyRepository } from '@/repositories'
import { HistoryFilter } from '@/types/history'
import { DebtService, debtService } from './DebtService'

export class HistoryService {
  historyRepo: HistoryRepository
  userRepo: UserRepository
  debtSer: DebtService

  constructor(historyRepo: HistoryRepository, userRepo: UserRepository, debtSer: DebtService) {
    this.historyRepo = historyRepo
    this.userRepo = userRepo
    this.debtSer = debtSer
  }

  async createOneHistory(dto: Partial<History>) {
    if (!dto.userId || !dto.debtId || !dto.amount) {
      throw new Error('Create history failed')
    }
    try {
      const debt = await this.debtSer.getDebtById(dto.debtId, dto.userId)

      // Calculation debt amount
      if (dto.amount && dto.type === HistoryAction.Increment) {
        debt.amount += dto.amount
      }
      if (dto.amount && dto.type === HistoryAction.Decrement) {
        debt.amount -= dto.amount
      }

      const res = await this.debtSer.updateOneDebt(debt)
      return this.historyRepo.insertOneHistory(dto)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  getHistoryListByFilter(filter: HistoryFilter) {
    return this.historyRepo.findManyByFilter(filter)
  }
}

export const historyService = new HistoryService(historyRepository, userRepository, debtService)
