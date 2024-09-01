'use server';
import mongoose from 'mongoose';
import User from '@/models/User';
import connectDB from './ConnectDB';
import Payment from '@/models/Payment';
import Project from '@/models/Project';

export const fetchUser = async ( name , email , username , pp , cp , previous_username) => {
  await connectDB();
  let user = await User.findOneAndUpdate({ email : email },{ $set: {
    name : name ,
    email: email,
    username : username,
    profile_picture: pp,
    cover_picture: cp,
    updatedAt : Date.now()
  } }).lean();
  let a= await Payment.findOneAndUpdate({ from_user: email},{ $set: {
    name: username
  } }).lean();
  return a
};
export const ShowUser = async ( email ) => {
    await connectDB();
    let user = await User.findOne({ email : email }).lean();
    
    if (user) {
      return user
    }
  
    return null;
  };

  export const createPayment = async ( from_user , name , to_user , oid , message , amount , done ) => {
    await connectDB();
    let user = await Payment.create({
      from_user,
      name,
      to_user,
      oid,
      message,
      amount,
      done,
     });
  };
  export const updatePayment = async (from_user , name , to_user , oid , message , amount , done ) => {
    await connectDB();
    let user = await Payment.findOneAndUpdate({ from_user , done: false },{ $set: {
      from_user,
      name,
      oid,
      to_user,
      message,
      amount,
      done,
    } }).lean();
  };

  export const showPayment = async ( from_user) => {
    await connectDB();
    let payment = await Payment.find({ from_user }).lean();
  
    if (payment) {
      return payment
    }
  
    return null;
  };
  
  export const showMessages = async (to_user , done) => {
    await connectDB();
    let payment = await Payment.find({ to_user, done }).lean();
  
    if (payment) {
      return payment
    }
  
    return null;
  };

  export const updatePaymentSucess = async (oid) => {
    await connectDB();
    let user = await Payment.findOneAndUpdate({oid},{ $set: {
      done:true
    } }).lean();
  };

  export const ShowtoUser = async ( email ) => {
    await connectDB();
    let user = await User.findOne({ email }).lean();
    
    if (user) {
      return user
    }
  
    return null;
  };

  export const profilePhoto = async (email , profile_picture) => {
    await connectDB();
    let user = await User.findOneAndUpdate({ email },{ $set: {
      profile_picture,
    } }).lean();
    return user
  };
  
  export const coverPhoto = async (email , cover_picture) => {
    await connectDB();
    let user = await User.findOneAndUpdate({ email },{ $set: {
      cover_picture,
    } }).lean();
    return user
  };
  

  
  


