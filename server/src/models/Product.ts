 import mongoose, { Schema,Document } from "mongoose";

 export interface IProduct extends Document{
    images: string[],
    title: string,
    description: string,
    category: string,
    price: number,
    salePrice: number,
    totalStock: number,
    averageReview: number,
  }
 const productSchema : Schema = new mongoose.Schema<IProduct>({
    title : {
        type : String,
        required : true,
        minLength:[4,"Name should be atleast 4 characters"],
        maxLength:[30,"Name should not exceed 30 characters"],
    },
    description : {
        type : String,
        required : true
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    salePrice:{
        type:Number,
        required:true,
    },
    totalStock:{
        type:Number,
        required:true,
        minLength:[1,"Name should be atleast 4 characters"],
    },
    averageReview:{
        type:Number,
        default:0
    },
    images:[
        {
            type:String,
            required:true,
        }
    ]
 },{timestamps:true})

 const Product = mongoose.model<IProduct>('Product', productSchema);

 export default Product;