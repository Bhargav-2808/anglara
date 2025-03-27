import { Router } from 'express';

export const categoryRouter = Router();

import express from 'express';
import { createCategory, getCategoryTree, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.controller';
import { authenticateUser } from '../middleware/authMiddleWare';

const router = express.Router();

router.post('/', authenticateUser, createCategory);
router.get('/tree', authenticateUser, getCategoryTree);
router.get('/:id', authenticateUser, getCategoryById);
router.put('/:id', authenticateUser, updateCategory);
router.delete('/:id', authenticateUser, deleteCategory);

export default router;
