import { Router } from 'express';
import { createCategory, getCategoryTree, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.controller';
import { authenticateUser } from '../middleware/authMiddleWare';

export const categoryRouter = Router();

categoryRouter.get('/', authenticateUser, getCategoryTree);
categoryRouter.get('/:id', authenticateUser, getCategoryById);
categoryRouter.post('/', authenticateUser, createCategory);
categoryRouter.put('/:id', authenticateUser, updateCategory);
categoryRouter.delete('/:id', authenticateUser, deleteCategory);
