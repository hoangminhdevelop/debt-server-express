import { authController } from '@/controllers/AuthController'
import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'

const authRouter = express.Router()

authRouter.post('/register', authController.register.bind(authController))

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (error: any, user: any) => {
    if (error) {
      res.sendResult(401, false, undefined, error.message)
    } else {
      res.sendResult(200, true, user)
    }
  })(req, res, next)
})

authRouter.post('/refreshToken', authController.refreshToken.bind(authController))

authRouter.get('/profile', (req, res) => {
  res.send('profile')
})

export default authRouter
