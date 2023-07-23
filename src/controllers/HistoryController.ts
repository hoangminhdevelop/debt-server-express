import { Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import { HistoryService, historyService } from '@/services/HistoryService'
import { History } from '@/entities'
import { HistoryFilter } from '@/types/history'

export class HistoryController {
  historySer: HistoryService

  constructor(historySer: HistoryService) {
    this.historySer = historySer
  }

  async getHistoryListByMonth(req: Request<any, any, any, Omit<HistoryFilter, 'userId'>>, res: Response) {
    try {
      const { query, user } = req
      if (!user?.id) {
        throw new Error('Login first')
      }

      const filter: HistoryFilter = {
        ...query,
        userId: user?.id,
        start: query.start ? new Date(query.start) : undefined,
        end: query.end ? new Date(query.end) : undefined,
      }

      const histories = await this.historySer.getHistoryListByFilter(filter)

      res.sendResult(httpStatus.OK, histories)
    } catch (error: any) {
      res.sendError(httpStatus.BAD_REQUEST, error.message)
    }
  }

  async createHistory(req: Request<any, any, Partial<History>>, res: Response) {
    try {
      const { body: dto, user } = req

      dto.userId = user?.id
      const history = await this.historySer.createOneHistory(dto)
      res.sendResult(httpStatus.OK, history)
    } catch (error: any) {
      res.sendError(httpStatus.BAD_REQUEST, error.message)
    }
  }
}

export const historyController = new HistoryController(historyService)
