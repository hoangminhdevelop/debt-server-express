import { Response, Request, NextFunction } from 'express'
import httpStatus from 'http-status-codes'
import { User } from '@/entities/User'
import { AuthService, authService } from '@/services'
import { JWT_REFRESH_COOKIE_NAME } from '@/constants/common'
import passport from 'passport'
import { refreshJWTCookieOptions } from '@/constants/cookie'

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

  async login(req: Request, res: Response) {
    passport.authenticate('local', (error: any, data: any) => {
      if (error) {
        res.sendError(httpStatus.UNAUTHORIZED, error.message)
      } else {
        const { user, token, refreshToken } = data
        res.cookie(JWT_REFRESH_COOKIE_NAME, refreshToken).sendResult(httpStatus.OK, { user, token })
      }
    })(req, req, res)
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies[JWT_REFRESH_COOKIE_NAME]
    try {
      const data = await this.authSer.refreshToken(refreshToken)

      res
        .cookie(JWT_REFRESH_COOKIE_NAME, data.refreshToken, refreshJWTCookieOptions)
        .sendResult(httpStatus.OK, { token: data.token })
    } catch (error: any) {
      res.sendError(httpStatus.UNAUTHORIZED, error.message)
    }
  }
}
export const authController = new AuthController(authService)
