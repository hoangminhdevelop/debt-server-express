import { CookieOptions } from 'express'

export const refreshJWTCookieOptions: CookieOptions = {
  // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
  httpOnly: true,
  sameSite: 'none',
  path: '/auth/refreshToken',
  secure: true,
}
