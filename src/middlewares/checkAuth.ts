import { Response, Request, NextFunction } from 'express'
import { verifyAccessToken } from '@/utils/jwt'
import httpStatus from 'http-status-codes'
import { authService } from '@/services'

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization?.trim()
  // Check incorrect authHeader
  if (!authHeader || authHeader === '' || !authHeader.startsWith('Bearer')) {
    res.sendError(httpStatus.UNAUTHORIZED, 'Please login first')
    return
  }

  const token = authHeader.split(' ')[1]
  try {
    const data = verifyAccessToken(token)
    const validatedTokenVersion = await authService.checkTokenVersion(data.payload.id, data.payload.tokenVersion)
    if (validatedTokenVersion) {
      req.user = data.payload
      next()
    } else {
      res.sendError(httpStatus.UNAUTHORIZED, 'Please login first')
    }
  } catch (error: any) {
    res.sendError(httpStatus.UNAUTHORIZED, 'Please login first')
  }
}
