import { AppDataSource } from '@/configs/data-source'
import { User } from '@/entities/User'
import { hashPassword } from '@/utils/password'

export class UserRepository {
  queryBuilder
  repository

  constructor() {
    this.repository = AppDataSource.getRepository(User)
    this.queryBuilder = AppDataSource.createQueryBuilder()
  }

  async existedUser(dto: Partial<User>) {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.username = :username OR user.email = :email', { username: dto.username, email: dto.email })
      .getOne()

    return user
  }

  async insertOne(dto: Omit<User, 'id'>) {
    const existed = await this.existedUser(dto)
    if (existed) {
      throw new Error('User existed')
    }

    dto.isActive = true
    dto.password = await hashPassword(dto.password)
    await this.queryBuilder.insert().into(User).values(dto).execute()

    return dto
  }
}

export const userRepository = new UserRepository()
