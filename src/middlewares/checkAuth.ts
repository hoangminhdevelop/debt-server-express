import { Response, Request, NextFunction } from 'express'
import { verifyAccessToken } from '@/utils/jwt'
import httpStatus from 'http-status-codes'

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization?.trim()
  // Check incorrect authHeader
  if (!authHeader || authHeader === '' || !authHeader.startsWith('Bearer')) {
    res.sendError(httpStatus.UNAUTHORIZED, 'Please login first')
    return
  }

  const token = authHeader.split(' ')[1]
  try {
    const data = verifyAccessToken(token)
    req.user = data.payload
    next()
  } catch (error: any) {
    res.sendError(httpStatus.UNAUTHORIZED, 'Please login first')
  }
}
