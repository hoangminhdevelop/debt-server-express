import { authController } from '@/controllers/AuthController'
import { userRepository } from '@/repositories'
import express from 'express'

const authRouter = express.Router()

authRouter.post('/register', authController.register.bind(authController))
authRouter.get('/login', (req, res) => {
  res.send('login')
})
authRouter.get('/profile', (req, res) => {
  res.send('profile')
})

export default authRouter
