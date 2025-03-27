import { UpdateQuery } from 'mongoose';
import userSchema, { UserDocument } from '../models/schemas/user.schema';

export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  return await userSchema.findOne({ email });
};

export const findUserById = async (_id: string): Promise<UserDocument | null> => {
  return await userSchema.findById(_id);
};

export const createUser = async (body: unknown): Promise<UserDocument> => {
  const user = await userSchema.create(body);
  return user.toObject({ 
    versionKey: false, 
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    } 
  });
};

export const updateUserData = async (body: UpdateQuery<UserDocument>, id: string): Promise<UserDocument | null> => {
  return await userSchema.findOneAndUpdate({ _id: id }, body, { new: true }).populate('tasks').exec();
};