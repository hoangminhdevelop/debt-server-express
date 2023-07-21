import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import httpStatus from 'http-status-codes'

import { authController } from '@/controllers/AuthController'

const authRouter = express.Router()

authRouter.post('/register', authController.register.bind(authController))

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (error: any, user: any) => {
    if (error) {
      res.sendError(httpStatus.UNAUTHORIZED, error.message)
    } else {
      res.sendResult(httpStatus.OK, user)
    }
  })(req, res, next)
})

authRouter.post('/refreshToken', authController.refreshToken.bind(authController))

authRouter.get('/profile', (req, res) => {
  res.send('profile')
})

export default authRouter
