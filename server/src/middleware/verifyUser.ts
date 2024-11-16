import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import asyncHandler from "./catchAsyncError";
import User from "../models/User";



const verifyAuth = asyncHandler(async(req:any, res:Response, next:NextFunction) =>{

    const token = req.cookies.access_token;
    if (!token) {
        return next(new ErrorHandler("Unauthorized Access", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Check if decodedData has the 'id' property
    if (decodedData && typeof decodedData === "object" && "id" in decodedData) {
        req.user = await User.findById(decodedData.id);
    } else {
        return next(new ErrorHandler("Invalid token", 401));
    }

    next();
})

export default verifyAuth