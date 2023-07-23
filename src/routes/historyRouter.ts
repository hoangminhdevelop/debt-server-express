import express from 'express'
import { historyController } from '@/controllers/HistoryController'

const historyRouter = express.Router()

historyRouter.post('/', historyController.createHistory.bind(historyController))
historyRouter.get('/', historyController.getHistoryListByMonth.bind(historyController))

export default historyRouter
