import express from 'express'
import httpStatus from 'http-status-codes'

import { authController } from '@/controllers/AuthController'

const authRouter = express.Router()

authRouter.post('/register', authController.register.bind(authController))

authRouter.post('/login', authController.login.bind(authController))

authRouter.get('/refreshToken', authController.refreshToken.bind(authController))

authRouter.get('/profile', (req, res) => {
  res.send('profile')
})

export default authRouter
