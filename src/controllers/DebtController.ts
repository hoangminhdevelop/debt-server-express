import httpStatus from 'http-status-codes'
import { Request, Response } from 'express'

import { Debt } from '@/entities'
import { DebtService, debtService } from '@/services'

export class DebtController {
  debtSer: DebtService

  constructor(debtSer: DebtService) {
    this.debtSer = debtSer
  }

  async createDebt(req: Request<Pick<Debt, 'icon' | 'debtName'>>, res: Response) {
    const dto = req.body
    const user = req.user

    try {
      const input = {
        debtName: dto.debtName,
        icon: dto.icon ?? 'default',
        amount: 0,
      }

      const debt = await this.debtSer.createNewDebt(input, user?.id)
      res.sendResult(httpStatus.OK, debt)
    } catch (error: any) {
      res.sendError(httpStatus.BAD_REQUEST, error.message)
    }
  }

  async getDebtById(req: Request<{ id: string }>, res: Response) {
    const params = req.params
    const userInfo = req.user

    try {
      const id = +params.id
      if (isNaN(id)) {
        res.sendError(httpStatus.BAD_REQUEST, 'Please enter correct debt id')
      }
      const debt = await this.debtSer.getDebtById(id, userInfo?.id)

      res.sendResult(httpStatus.OK, debt)
    } catch (error: any) {
      res.sendError(httpStatus.BAD_REQUEST, error.message)
    }
  }

  async getDebtListByUserId(req: Request, res: Response) {
    try {
      const debtList = await this.debtSer.getDebtListByUserId(req.user?.id)
      res.sendResult(httpStatus.OK, debtList)
    } catch (error: any) {
      res.sendError(httpStatus.BAD_REQUEST, error.message)
    }
  }
}

export const debtController = new DebtController(debtService)
