import { Response, Request, NextFunction } from 'express'

export const responseHelper = (req: Request, res: Response, next: NextFunction) => {
  res.sendResult = function <TData>(code: number, data?: TData, message?: string) {
    res.status(code).json({
      data: data,
      success: true,
      message: message,
    })
  }

  res.sendError = function (code: number, message: string) {
    res.status(code).json({
      success: false,
      message: message,
    })
  }
  next()
}
