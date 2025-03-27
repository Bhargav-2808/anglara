import mongoose, { Document, Schema, Model } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  parent?: mongoose.Types.ObjectId | null;
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
}

export type CategoryModel = Model<CategoryDocument>;

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<CategoryDocument, CategoryModel>('Category', CategorySchema);
