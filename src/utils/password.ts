import argon2 from 'argon2'

export const hashPassword = async (raw: string) => {
  return await argon2.hash(raw, {
    hashLength: 5,
  })
}

export const verifyPassword = async (hashed: string, raw: string) => {
  return await argon2.verify(hashed, raw)
}
