import mongoose from 'mongoose';
import { config } from '../config';

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.app.dbURL, { retryWrites: true, w: 'majority' });
    console.log('🚀 Connected to Database');
  } catch (error) {
    console.error('Unable to connect to MongoDB.');
    console.error(error);
  }
}

connectToDatabase();
