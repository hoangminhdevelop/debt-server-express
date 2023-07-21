import express from 'express'
import { debtController } from '@/controllers/DebtController'

const debtRouter = express.Router()

debtRouter.post('/', debtController.createDebt.bind(debtController))

export default debtRouter
