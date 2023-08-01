import { AppDataSource } from '@/configs/data-source'
import { Repository } from 'typeorm'
import { History } from '@/entities'
import { HistoryFilter, Order } from '@/types/history'

export class HistoryRepository {
  repo: Repository<History>
  constructor() {
    this.repo = AppDataSource.getRepository(History)
  }

  findManyByFilter(filter: HistoryFilter) {
    const queryBuilder = this.repo
      .createQueryBuilder('history')
      .where('history.userId = :userId', { userId: filter.userId })
      .withDeleted() // Still get debt and history deleted
      .leftJoinAndSelect('history.debt', 'debt')

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
      queryBuilder
        .andWhere('history.createdAt > :start', {
          start: new Date(filter.start).toUTCString(),
        })
        .andWhere('history.createdAt < :end', {
          end: new Date(filter.end).toUTCString(),
        })
    }

    if (filter.order) {
      queryBuilder.orderBy('history.createdAt', filter.order)
    } else {
      queryBuilder.orderBy('history.createdAt', Order.Desc)
    }

    return queryBuilder.getMany()
  }

  insertOneHistory(dto: Partial<History>) {
    const history = this.repo.create(dto)
    return this.repo.save(history)
  }
}

export const historyRepository = new HistoryRepository()
