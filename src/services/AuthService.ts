import jwt from 'jsonwebtoken'
import { User } from '@/entities/User'
import { UserRepository, userRepository } from '@/repositories'
import { verifyPassword } from '@/utils/password'
import { JWT_SECRET_KEY, JWT_EXPIRED_TIME, JWT_REFRESH_SECRET_KEY, JWT_EXPIRED_TIME_REFRESH } from '@/constants/common'

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async register(dto: Omit<User, 'id'>) {
    return await this.userRepo.insertOne(dto)
  }

  async login(dto: Pick<User, 'username' | 'password'>) {
    if (!dto.username || !dto.password) {
      throw new Error('Please enter your username and password')
    }

    const input: Partial<User> = {
      username: dto.username,
      email: dto.username,
    }

    const user = await this.userRepo.existedUser(input, true)
    if (!user) {
      throw new Error('Username or Email dose not exist')
    }

    const matchPassword = await verifyPassword(user.password, dto.password)

    if (!matchPassword) {
      throw new Error('Enter wrong password')
    }
    const token = this.initJWT(user)
    const refreshToken = this.initJWTRefresh(user)
    return { user, token, refreshToken }
  }

  async refreshToken(token: string) {
    const userInToken = this.verifyJWTRefresh(token)
    const user = await this.userRepo.existedUser(userInToken, false)

    if (!user) {
      throw new Error('Has something wrong. Please refresh your page or re-login')
    }

    const newToken = this.initJWT(user)
    const newRefreshToken = this.initJWTRefresh(user)
    return { token: newToken, refreshToken: newRefreshToken }
  }

  private initJWT(user: Omit<User, 'password'>) {
    return jwt.sign({ ...user, password: undefined }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRED_TIME })
  }

  verifyJWT(token: string): Omit<User, 'password'> {
    try {
      const user = jwt.verify(token, JWT_SECRET_KEY) as Omit<User, 'password'>
      return user
    } catch (error) {
      throw new Error('Has something wrong. Please refresh your page or re-login')
    }
  }

  private initJWTRefresh(user: Omit<User, 'password'>) {
    return jwt.sign({ ...user, password: undefined }, JWT_REFRESH_SECRET_KEY, { expiresIn: JWT_EXPIRED_TIME_REFRESH })
  }

  private verifyJWTRefresh(token: string): Omit<User, 'password'> {
    try {
      const user = jwt.verify(token, JWT_REFRESH_SECRET_KEY) as Omit<User, 'password'>
      return user
    } catch (error) {
      throw new Error('Has something wrong. Please refresh your page or re-login')
    }
  }
}
export const authService = new AuthService(userRepository)
