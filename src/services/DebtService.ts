import { Debt, DebtBase } from '@/entities'
import { DebtRepository, UserRepository, debtRepository, userRepository } from '@/repositories'

export class DebtService {
  private debtRepo: DebtRepository
  private userRepo: UserRepository

  constructor(debtRepo: DebtRepository, userRepo: UserRepository) {
    this.debtRepo = debtRepo
    this.userRepo = userRepo
  }

  async createNewDebt(dto: Omit<DebtBase, 'id'>) {
    try {
      const debt = await this.debtRepo.insertOne(dto)
      return debt
    } catch (error: any) {
      throw new Error('Create the new debt failed')
    }
  }

  async getDebtById(id: number, userId?: number) {
    if (!userId) {
      throw new Error('Cannot found this debt')
    }
    try {
      const debt = await this.debtRepo.findOneById(id, userId)
      if (!debt) {
        throw new Error('Cannot found this debt')
      }
      return debt
    } catch (error) {
      throw new Error('Cannot found this debt')
    }
  }

  async getDebtListByUserId(userId?: number) {
    if (!userId) {
      throw new Error('Cannot found debt list')
    }
    try {
      const debts = await this.debtRepo.findManyByFilter(userId)
      if (!debts) {
        throw new Error('Cannot found debt list')
      }
      return debts
    } catch (error) {
      throw new Error('Cannot found debt list')
    }
  }

  async updateOneDebt(dto: Pick<DebtBase, 'amount' | 'id' | 'userId'>) {
    try {
      const res = await this.debtRepo.updateOne(dto)
      return res
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteDebtById(dto: Partial<DebtBase>) {
    return this.debtRepo.deleteOne(dto)
  }
}

export const debtService = new DebtService(debtRepository, userRepository)
