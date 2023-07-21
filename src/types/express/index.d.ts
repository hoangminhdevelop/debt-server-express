import { Request, Response, NextFunction } from 'express'
import { UserInfo } from '@/entities/User'
import internal from 'stream'
import { User as UserEntity } from '@/entities'

declare global {
  namespace Express {
    export interface Response {
      sendResult: <TData>(code: number, data?: TData, message?: string) => void
      sendError: (code: number, message: string) => void
    }
    export interface Request<TBody = any> {
      body: TBody
      user: UserInfo
    }

    export interface User extends UserInfo {}
  }
}
