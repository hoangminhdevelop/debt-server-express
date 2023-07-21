import express from 'express'
import { debtController } from '@/controllers/DebtController'

const debtRouter = express.Router()

debtRouter.post('/', debtController.createDebt.bind(debtController))
debtRouter.get('/', debtController.getDebtListByUserId.bind(debtController))
debtRouter.get('/:id', debtController.getDebtById.bind(debtController))

export default debtRouter
