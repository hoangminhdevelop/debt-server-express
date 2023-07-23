import { History } from '@/entities'
import { HistoryRepository, historyRepository } from '@/repositories/HistoryRepository'
import { UserRepository, userRepository } from '@/repositories'
import { HistoryFilter } from '@/types/history'

export class HistoryService {
  historyRepo: HistoryRepository
  userRepo: UserRepository

  constructor(historyRepo: HistoryRepository, userRepo: UserRepository) {
    this.historyRepo = historyRepo
    this.userRepo = userRepo
  }

  createOneHistory(dto: Partial<History>) {
    return this.historyRepo.insertOneHistory(dto)
  }

  getHistoryListByFilter(filter: HistoryFilter) {
    return this.historyRepo.findManyByFilter(filter)
  }
}

export const historyService = new HistoryService(historyRepository, userRepository)
