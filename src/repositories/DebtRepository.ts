import { Repository, SelectQueryBuilder } from 'typeorm'
import { AppDataSource } from '@/configs/data-source'
import { Debt, DebtBase } from '@/entities'

export class DebtRepository {
  repo: Repository<Debt>
  queryBuilder: SelectQueryBuilder<Debt>

  constructor() {
    this.repo = AppDataSource.getRepository(Debt)
    this.queryBuilder = AppDataSource.createQueryBuilder()
  }

  async insertOne(dto: Omit<DebtBase, 'id'>) {
    const debt = this.repo.create(dto)
    const newDebt = await this.repo.save(debt)
    return { ...newDebt, user: undefined }
  }

  async findOneById(id: number, userId: number) {
    return await this.repo.createQueryBuilder('debt').where('debt.id = :id AND debt.userId = :userId', { id, userId }).getOne()
  }

  async findManyByFilter(userId: number) {
    return await this.repo.createQueryBuilder('debt').where('debt.userId = :userId', { userId }).getMany()
  }
}

export const debtRepository = new DebtRepository()
