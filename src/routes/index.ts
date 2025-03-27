import { Router } from 'express';
import { authRouter } from './auth.router';
import { categoryRouter } from './cateogry.router';
import { authenticateUser } from '../middleware/authMiddleWare';

export const router = Router();

router.use('/auth', authRouter);
router.use('/category', authenticateUser, categoryRouter);
