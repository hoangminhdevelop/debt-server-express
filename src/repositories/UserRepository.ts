import { AppDataSource } from '@/configs/data-source'
import { User, UserInfo } from '@/entities/User'
import { hashPassword } from '@/utils/password'

type OmitPassword<T extends boolean> = T extends true ? User : UserInfo
export class UserRepository {
  queryBuilder
  repository

  constructor() {
    this.repository = AppDataSource.getRepository(User)
    this.queryBuilder = AppDataSource.createQueryBuilder()
  }

  async existedUser<TBoolean extends boolean = false>(
    dto: Partial<User>,
    isShowPassword: TBoolean
  ): Promise<OmitPassword<TBoolean> | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect(isShowPassword ? 'user.password' : '')
      .where('user.username = :username OR user.email = :email', { username: dto.username, email: dto.email })
      .getOne()

    return user
  }

  async insertOne(dto: Omit<User, 'id'>) {
    const existed = await this.existedUser(dto, false)
    if (existed) {
      throw new Error('User existed')
    }

    dto.isActive = true
    dto.password = await hashPassword(dto.password)
    await this.queryBuilder.insert().into(User).values(dto).execute()

    return dto
  }

  async findOneById(id: number) {
    return await this.repository.findOneBy({ id })
  }
}

export const userRepository = new UserRepository()
