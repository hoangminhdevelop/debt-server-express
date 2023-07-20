import { User } from '@/entities/User'
import { UserRepository, userRepository } from '@/repositories'

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  public async register(dto: Omit<User, 'id'>) {
    return await this.userRepo.insertOne(dto)
  }
}

export const authService = new AuthService(userRepository)
