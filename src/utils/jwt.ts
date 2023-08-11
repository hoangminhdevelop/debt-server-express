import jwt from 'jsonwebtoken'
import { User } from '@/entities'
import { JWT_EXPIRED_TIME, JWT_SECRET_KEY, JWT_EXPIRED_TIME_REFRESH, JWT_REFRESH_SECRET_KEY } from '@/constants/common'

interface JWTPayload {
  payload: User
}

type JWTVerify = jwt.JwtPayload & JWTPayload

export const generateAccessToken = (user: Partial<User>) => {
  try {
    user.password = undefined
    return jwt.sign({ payload: user }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRED_TIME })
  } catch (error) {
    throw new Error('Has something wrong. Please refresh your page or re-login')
  }
}

export const generateRefreshToken = (user: Partial<User>) => {
  try {
    user.password = undefined

    return jwt.sign({ payload: user }, JWT_REFRESH_SECRET_KEY, { expiresIn: JWT_EXPIRED_TIME_REFRESH })
  } catch (error) {
    throw new Error('Has something wrong. Please refresh your page or re-login')
  }
}

export const verifyAccessToken = (accessToken: string) => {
  try {
    return jwt.verify(accessToken, JWT_SECRET_KEY) as JWTVerify
  } catch (error) {
    throw new Error('Has something wrong. Please refresh your page or re-login')
  }
}

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY) as JWTVerify
    return decoded
  } catch (error) {
    throw new Error('Has something wrong. Please refresh your page or re-login')
  }
}
