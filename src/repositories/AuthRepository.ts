import { Repository } from 'typeorm'
import { User } from '@/entities/User'
import { AppDataSource } from '@/configs/data-source'

export class AuthRepository {
  dbRepo: Repository<User>

  constructor() {
    this.dbRepo = AppDataSource.getRepository(User)
  }

  register() {}
  login() {}
  refreshToken() {}
}

export const authRepository = new AuthRepository()
