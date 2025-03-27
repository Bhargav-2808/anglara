import { NextFunction, Response } from 'express';
import { jwtSignPayLoad } from '../types/common';
import { jwtVerify } from '../utils/jwt';
import ResponseHandler from '../utils/responseHandler';
import { AuthenticatedRequest } from '../types/request';
import { findUserById } from '../services/auth.service';

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return ResponseHandler.unAuthorized(res, 'Unauthorized - Missing token');
  }

  const tokenPayload = token?.replace('Bearer ', '');

  const decodedToken = jwtVerify(tokenPayload) as unknown as jwtSignPayLoad;

  const userId = decodedToken?.sub?.id as string;

  if (!userId) {
    return ResponseHandler.unAuthorized(res, 'Unauthorized - User not found');
  }

  const user = await findUserById(userId);

  if (!user) {
    return ResponseHandler.unAuthorized(res, 'Unauthorized - User not found');
  }

  req.userData = user;

  next();
};
