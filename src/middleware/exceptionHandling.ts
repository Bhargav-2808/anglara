import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../src/utils/errors/AppError';

export const exceptionHandling = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      error: error.error,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
