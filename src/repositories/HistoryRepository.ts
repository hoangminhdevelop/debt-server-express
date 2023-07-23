import { AppDataSource } from '@/configs/data-source'
import { Repository } from 'typeorm'
import { History } from '@/entities'
import { HistoryFilter } from '@/types/history'

export class HistoryRepository {
  repo: Repository<History>
  constructor() {
    this.repo = AppDataSource.getRepository(History)
  }

  findManyByFilter(filter: HistoryFilter) {
    const queryBuilder = this.repo.createQueryBuilder('history').where('history.userId = :userId', { userId: filter.userId })

    if (filter.debtId) {
      queryBuilder.andWhere('history.debtId = :debtId', {
        debtId: filter.debtId,
      })
    }

    if (filter.type) {
      queryBuilder.andWhere('history.type = :type', {
        type: filter.type,
      })
    }

    if (filter.start && filter.end) {
      queryBuilder.andWhere('history.createdAt BETWEEN :start AND :end', {
        start: filter.start,
        end: filter.end,
      })
    }

    return queryBuilder.getMany()
  }

  insertOneHistory(dto: Partial<History>) {
    const history = this.repo.create(dto)
    return this.repo.save(history)
  }
}

export const historyRepository = new HistoryRepository()
