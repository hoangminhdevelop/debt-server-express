import { Repository, SelectQueryBuilder } from 'typeorm'
import { AppDataSource } from '@/configs/data-source'
import { Debt } from '@/entities'

export class DebtRepository {
  repo: Repository<Debt>
  queryBuilder: SelectQueryBuilder<Debt>

  constructor() {
    this.repo = AppDataSource.getRepository(Debt)
    this.queryBuilder = AppDataSource.createQueryBuilder()
  }

  async insertOne(dto: Omit<Debt, 'id'>) {
    const debt = this.repo.create(dto)
    const newDebt = await this.repo.save(debt)
    return { ...newDebt, user: undefined }
  }
}

export const debtRepository = new DebtRepository()
