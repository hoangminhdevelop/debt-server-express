import { authService } from '@/services'
import { Response, Request, NextFunction } from 'express'

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization?.trim()
  // Check incorrect authHeader
  if (!authHeader || authHeader === '' || !authHeader.startsWith('Bearer')) {
    throw new Error('Please login first')
  }

  const token = authHeader.split(' ')[1]

  const userInfo = authService.verifyJWT(token)
  req.user = userInfo
  next()
}
