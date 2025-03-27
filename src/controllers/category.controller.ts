import { Request, Response } from 'express';
import { asyncMW } from '../utils/asyncMW';
import ResponseHandler from '../utils/responseHandler';
import * as categoryService from '../services/category.service';

// ✅ Create Category
export const createCategory = asyncMW(async (req: Request, res: Response) => {
  const { name, parent } = req.body;

  const category = await categoryService.createCategory(name, parent);
  return ResponseHandler.created(res, { category }, 'Category created successfully!');
});

// ✅ Get Category Tree
export const getCategoryTree = asyncMW(async (_: Request, res: Response) => {
  const tree = await categoryService.getCategoryTree();
  return ResponseHandler.success(res, tree, 'Category tree retrieved successfully!');
});

// ✅ Get Category By ID
export const getCategoryById = asyncMW(async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id);

  if (!category) {
    return ResponseHandler.notFound(res, 'Category not found');
  }

  return ResponseHandler.success(res, { category }, 'Category retrieved successfully!');
});

// ✅ Update Category
export const updateCategory = asyncMW(async (req: Request, res: Response) => {
  const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);

  if (!updatedCategory) {
    return ResponseHandler.notFound(res, 'Category not found');
  }

  return ResponseHandler.success(res, { updatedCategory }, 'Category updated successfully!');
});

// ✅ Delete Category
export const deleteCategory = asyncMW(async (req: Request, res: Response) => {
  await categoryService.deleteCategory(req.params.id);
  return ResponseHandler.success(res, null, 'Category deleted successfully!');
});
