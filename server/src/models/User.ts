import mongoose from "mongoose";
import validator from 'validator'

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength:[4,"Name should be atleast 4 characters"],
        maxLength:[30,"Name should not exceed 30 characters"],
    },
    email : {
        type : String,
        unique : true,
        required : true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Password should be atleast 6 characters"],
        select:false
    },
    role:{
        type:String,
        default : 'user'
    }

},{timestamps : true})

const User = mongoose.model('User',UserSchema);

export default User;