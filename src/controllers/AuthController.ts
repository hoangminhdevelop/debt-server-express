import { Response, Request } from 'express'
import httpStatus from 'http-status-codes'
import { User } from '@/entities/User'
import { AuthService, authService } from '@/services'

export class AuthController {
  private authSer: AuthService

  constructor(authSer: AuthService) {
    this.authSer = authSer
  }

  async register(req: Request<any, any, Omit<User, 'id'>>, res: Response) {
    try {
      const user = await this.authSer.register(req.body)
      res.sendResult(httpStatus.CREATED, user)
    } catch (error: any) {
      res.sendError(httpStatus.BAD_REQUEST, error.message)
    }
  }

  async login(req: Request<any, any, Omit<User, 'id'>>, res: Response) {
    try {
      const user = await this.authSer.login(req.body)
      res.sendResult(httpStatus.OK, user, undefined)
    } catch (error: any) {
      res.sendError(httpStatus.UNAUTHORIZED, error.message)
    }
  }

  async refreshToken(req: Request, res: Response) {
    const token = req.body.refreshToken

    try {
      const result = await this.authSer.refreshToken(token)
      res.sendResult(httpStatus.OK, result)
    } catch (error: any) {
      res.sendError(httpStatus.UNAUTHORIZED, error.message)
    }
  }
}
export const authController = new AuthController(authService)
