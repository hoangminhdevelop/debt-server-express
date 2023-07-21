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
    /**
     * Generic for Request
     * < P = core.ParamsDictionary,ResBody = any,ReqBody = any,ReqQuery = core.Query>
     */

    export interface Request {
      user: UserInfo
    }

    export interface User extends UserInfo {}
  }
}
