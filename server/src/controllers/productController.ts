import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Product from "../models/Product";


export const CreateProduct = asyncHandler(async(req:any, res:Response, next:NextFunction) =>{
    
    if(req?.user?.role !== 'admin'){
        return next(new ErrorHandler("Unauthorized Access", 402));
    }
    const data = req.body;

    const newProduct = await Product.create(data);
    res.status(201).json({
        success:true,
        newProduct
    })
})

export const getAllProducts = asyncHandler(async(req:Request, res:Response, next:NextFunction) =>{
    
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

export const getSingleProduct = asyncHandler(async(req:Request, res:Response, next:NextFunction) =>{
    
    const id = req.params.id;
    const product = await Product.findById(id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        product
    })
})

export const deleteProduct = asyncHandler(async(req:Request, res:Response, next:NextFunction) =>{
    
    const id = req.params.id;
    const product = await Product.findById(id);
    console.log(product)

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
})