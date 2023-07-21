export const PORT = process.env.PORT

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ''
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_SECRET_KEY || ''
export const JWT_EXPIRED_TIME = '10h'
export const JWT_EXPIRED_TIME_REFRESH = '7d'
