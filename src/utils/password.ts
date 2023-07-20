import { PASSWORD_SECRET_KEY } from '@/constants/common'
import argon2 from 'argon2'

export const hashPassword = async (raw: string) => {
  return await argon2.hash(raw, {
    hashLength: 5,
  })
}

export const verifyPassword = async (raw: string, hashed: string) => {
  return await argon2.verify(hashed, raw)
}
