'use server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToDB(): Promise<void> {
  try {
    if (!process.env.MONGOURL) {
      throw new Error('MONGOURL is not defined');
    }

    await mongoose.connect(process.env.MONGOURL as string);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(
      'Error Connecting to DB: ',
      err instanceof Error ? err.message : err
    );
  }
}
