import { Router } from 'express';
import { authRouter } from './auth.router';
import { categoryRouter } from './category.router';


export const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
