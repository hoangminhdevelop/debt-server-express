import { Response, Request, NextFunction } from 'express'

export const responseHelper = (req: Request, res: Response, next: NextFunction) => {
  res.sendResult = function <TData>(code: number, success: boolean, data?: TData, message?: string) {
    res.status(code).json({
      data: data,
      success: success,
      message: message,
    })
  }
  next()
}
