import express from 'express'

import { authController } from '@/controllers/AuthController'
import { checkLogin } from '@/middlewares/checkAuth'

const authRouter = express.Router()

authRouter.post('/register', authController.register.bind(authController))

authRouter.post('/login', authController.login.bind(authController))

authRouter.post('/logout', checkLogin, authController.logout.bind(authController))

authRouter.get('/refreshToken', authController.refreshToken.bind(authController))

authRouter.get('/profile', (req, res) => {
  res.send('profile')
})

export default authRouter
