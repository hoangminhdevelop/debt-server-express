import express from 'express'

import { checkLogin } from '@/middlewares/checkAuth'

import authRouter from './authRouter'
import debtRouter from './debtRouter'

const mainRouter = express.Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/debt', checkLogin, debtRouter)

export default mainRouter
