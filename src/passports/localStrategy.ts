import { authService } from '@/services'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

passport.use(
  new LocalStrategy(async function (username: string, password: string, cb: any) {
    try {
      const user = await authService.login({ username, password })
      if (!user) {
        return cb({ message: 'User not found' })
      } else {
        return cb(null, user)
      }
    } catch (error: any) {
      return cb(error)
    }
  })
)
