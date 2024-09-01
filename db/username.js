'use server';
import mongoose from 'mongoose';
import User from '@/models/User';
import connectDB from './ConnectDB';

export const findUser = async (username) => {
  await connectDB();
  let user = await User.findOne({ username }).lean();
    
  if (user) {
    return user
  }

  return null;
};

export default findUser;
