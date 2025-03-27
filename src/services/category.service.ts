import Category, { CategoryDocument } from '../models/schemas/category.schema';
import mongoose from 'mongoose';



export interface CategoryTree {
  _id: string;
  name: string;
  parent?: string | null;
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
  children: CategoryTree[];
}

export const createCategory = async (name: string, parent?: string | null) => {
  return await Category.create({ name, parent: parent ? new mongoose.Types.ObjectId(parent) : null });
};

export const getCategoryTree = async (): Promise<CategoryTree[]> => {
  const categories = await Category.find().lean(); 

  const categoryMap = new Map<string, CategoryTree>(
    categories.map((c) => [
      c._id.toString(),
      {
        _id: c._id.toString(),
        name: c.name,
        parent: c.parent?.toString() || null,
        status: c.status,
        created_at: c.created_at,
        updated_at: c.updated_at,
        children: []
      }
    ])
  );

  const rootCategories: CategoryTree[] = [];

  categoryMap.forEach((category) => {
    if (category.parent) {
      const parentCategory = categoryMap.get(category.parent);
      if (parentCategory) parentCategory.children.push(category);
    } else {
      rootCategories.push(category);
    }
  });

  return rootCategories;
};


export const getCategoryById = async (id: string): Promise<CategoryDocument | null> => {
  return await Category.findById(id);
};

export const updateCategory = async (id: string, updates: Partial<CategoryDocument>): Promise<CategoryDocument | null> => {
  return await Category.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteCategory = async (id: string): Promise<void> => {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');

  await Category.updateMany({ parent: id }, { parent: category.parent });
  await Category.findByIdAndDelete(id);
};
