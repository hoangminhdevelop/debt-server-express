import express from 'express'
import authRouter from './authRouter'

const mainRouter = express.Router()

mainRouter.use('/auth', authRouter)

export default mainRouter
