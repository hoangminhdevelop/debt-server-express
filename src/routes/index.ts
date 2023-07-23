import express from 'express'

import { checkLogin } from '@/middlewares/checkAuth'

import authRouter from './authRouter'
import debtRouter from './debtRouter'
import historyRouter from './historyRouter'

const mainRouter = express.Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/debt', checkLogin, debtRouter)
mainRouter.use('/history', checkLogin, historyRouter)

export default mainRouter
