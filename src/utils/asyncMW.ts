import type { Handler, Request, Response, NextFunction } from 'express'

export function asyncMW(fn: Handler): Handler | NextFunction {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction> {
    // catch both synchronous exceptions and asynchronous rejections
    try {
      await fn(req, res, next)
    } catch (e) {
      next(e)
    }
  }
}
