import { Response, Request } from 'express'
import { User } from '@/entities/User'
import { AuthService, authService } from '@/services'

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

  async login(req: Request<Omit<User, 'id'>>, res: Response) {
    try {
      const user = await this.authSer.login(req.body)
      res.sendResult(200, true, user, undefined)
    } catch (error: any) {
      res.sendResult(401, false, undefined, error.message)
    }
  }

  async refreshToken(req: Request, res: Response) {
    const token = req.body.refreshToken

    try {
      const result = await this.authSer.refreshToken(token)
      res.sendResult(200, true, result)
    } catch (error: any) {
      res.sendResult(401, false, undefined, error.message)
    }
  }
}
export const authController = new AuthController(authService)
