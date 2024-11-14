import { Request, Response, NextFunction, response } from "express"
import asyncHandler from "../middleware/catchAsyncError"
import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from 'bcryptjs'
import sendToken from "../utils/jwtToken";


// register
export const registerUser = asyncHandler(async(
    req:Request,
    res:Response,
    next:NextFunction) =>{

    const {name, email, password} = req.body;

    if(!email || !password || !name){
        return next(new ErrorHandler("Please Enter Email or Password",400))
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password:hashedPass})

    sendToken(user,201,res);
})

// login
export const loginUser = asyncHandler(async(
    req:Request,
    res:Response,
    next:NextFunction) =>{

    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email or Password",400))
    }

    const user = await User.findOne({email}).select('+password'); // since we have done select = false in schema;

    if(!user){
        return next(new ErrorHandler("Invalid Email Or Password !!!",401));
    }

    const verifyPass = await bcrypt.compare(password, user.password);
    if(!verifyPass){
        return next(new ErrorHandler("Invalid Email Or Password !!!",401));
    }
    sendToken(user, 200, res);
})

// logout
export const logoutUser = asyncHandler(async(
    req:Request,
    res:Response,
    next:NextFunction) =>{

        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(200).json({
            success:true,
            message:"Logged Out Succeccfully"
        })
})