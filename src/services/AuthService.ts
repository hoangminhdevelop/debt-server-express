import { User } from '@/entities/User'
import { UserRepository, userRepository } from '@/repositories'
import { verifyPassword } from '@/utils/password'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/utils/jwt'

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async checkTokenVersion(userId: number, tokenVersion: number) {
    const user = await this.userRepo.findOneById(userId)

    if (!user) return false
    if (user.tokenVersion !== tokenVersion) return false

    return true
  }

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
    const token = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return { user, token, refreshToken }
  }

  async refreshToken(token: string) {
    const decoded = verifyRefreshToken(token)
    const validatedToken = await this.checkTokenVersion(decoded.payload.id, decoded.payload.tokenVersion)
    if (validatedToken) {
      const newToken = generateAccessToken(decoded.payload)
      const newRefreshToken = generateRefreshToken(decoded.payload)
      return { token: newToken, refreshToken: newRefreshToken }
    } else {
      throw new Error('Please login')
    }
  }

  async logout(userId: number, currentTokenVersion: number) {
    try {
      await this.userRepo.updateOne({ id: userId, tokenVersion: currentTokenVersion + 1 })
    } catch (error) {
      throw new Error('Logout failed')
    }
  }
}
export const authService = new AuthService(userRepository)
