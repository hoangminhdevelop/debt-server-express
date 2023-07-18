import { Repository } from 'typeorm'
import { AppDataSource } from '@/configs/data-source'
import { User } from '@/entities/User'

class UserRepository {
  dbRepo: Repository<User>

  constructor() {
    this.dbRepo = AppDataSource.getRepository(User)
  }

  findOne() {}

  async findOneById(id: number) {
    const user = await this.dbRepo.findOneBy({
      id: id,
    })
    return user
  }

  findMany() {
    this.insertOne({
      email: 'minhtruonghoang28@gmail.com',
      isActive: true,
      name: 'Trương Hoàng Minh',
      password: '12345',
      username: 'hoangminh28',
    })
  }

  async insertOne(dto: Omit<User, 'id'>) {
    const user = new User()
    user.email = 'minhtruonghoang28@gmail.com'
    user.isActive = true
    user.name = 'Trương Hoàng Minh'
    user.password = '12345'
    user.username = 'hoangminh28'

    await this.dbRepo.save(user)
  }
}

export const userRepository = new UserRepository()
