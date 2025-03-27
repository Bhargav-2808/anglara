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
  const categories = await Category.aggregate([
    {
      $graphLookup: {
        from: "categories", 
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parent",
        as: "children",
      },
    },
    { $match: { parent: null } }, 
  ]);

  return categories.map((category) => ({
    _id: category._id.toString(),
    name: category.name,
    parent: category.parent ? category.parent.toString() : null,
    status: category.status,
    created_at: category.created_at,
    updated_at: category.updated_at,
    children: category.children.map((child: any) => ({
      _id: child._id.toString(),
      name: child.name,
      parent: child.parent ? child.parent.toString() : null,
      status: child.status,
      created_at: child.created_at,
      updated_at: child.updated_at,
    })),
  }));
};


export const getCategoryById = async (id: string): Promise<CategoryTree | null> => {
  const categories = await Category.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }, // Match the category by ID
    },
    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parent",
        as: "children",
      },
    },
  ]);

  if (!categories.length) return null; 

  const category = categories[0];     
  return {
    _id: category._id.toString(),
    name: category.name,
    parent: category.parent ? category.parent.toString() : null,
    status: category.status,
    created_at: category.created_at,
    updated_at: category.updated_at,
    children: category.children.map((child: any) => ({
      _id: child._id.toString(),
      name: child.name,
      parent: child.parent ? child.parent.toString() : null,
      status: child.status,
      created_at: child.created_at,
      updated_at: child.updated_at,
    })),
  };
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
