import { Response, Request } from 'express'
import { User } from '@/entities/User'
import { AuthService, authService } from '@/services'
import { UserRepository, userRepository } from '@/repositories'

export class AuthController {
  private authSer: AuthService

  constructor(authSer: AuthService) {
    this.authSer = authSer
  }

  async register(req: Request<Omit<User, 'id'>>, res: Response) {
    try {
      const user = await this.authSer.register(req.body)
      res.sendResult(200, true, user, undefined)
    } catch (error: any) {
      res.sendResult(401, false, undefined, error.message)
    }
  }
}
export const authController = new AuthController(authService)
