import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE_IN, JWT_SECRET } from "../config/env.js";
export const signUp=async(req,res,next)=>{
const session =await mongoose.startSession();
session.startTransaction();
try{
    const{name,email,password}=req.body;
    const exist=await User.findOne({email})
    if(exist){
        const error=new Error("User Alreadt");
        error.statusCode=409;
        throw error;
    }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const newuser=await User.create([{name,email,password:hashedpassword}],{session});
    const token=jwt.sign({userId:newuser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRE_IN})

await session.commitTransaction();
session.endSession();
res.status(201).json({
    success:true,
    message:'user created',
    data:{
        token,
        user:newuser[0]
    }
})
}catch(error){
    await session.abortTransaction();
    session.endSession()
    next(error)
}
 }
export const signIn=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            const error=new Error('User Not Found');
            error.statusCode=404;
            throw error;
        }
        const isPass=await bcrypt.compare(password,user.password);
        if(!isPass){
             const error=new Error('Password is invaid');
            error.statusCode=401;
            throw error;
        }
        const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRE_IN});
        res.status(200).json({
            success:true,
            message:"signed in successfully",
            data:{
                token,
                user
            }
        });
    }catch(eroor){
        next(eroor);
    }
}
export const signOut=async(req,res,next)=>{
    
}