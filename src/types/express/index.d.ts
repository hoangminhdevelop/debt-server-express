import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    export interface Response {
      sendResult: <TData>(code: number, success: boolean, data?: TData, message?: string) => void
    }
    export interface Request<TBody = any> {
      body: TBody
    }
  }
}
