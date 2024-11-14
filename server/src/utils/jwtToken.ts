// creating token and storing in cookies (not in local storage -->because that can be accessed)
import jwt from "jsonwebtoken";
import { Response } from "express";


const sendToken = (user: any, statusCode: number, res: Response) => {

    const token = jwt.sign({ id: user._id, email:user.email, role:user.role }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
        expires: new Date(
            Date.now() + parseInt(process.env.COOKIE_EXPIRE as string) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user:{
            id:user._id,
            email:user.email,
            role:user.role
        }
    });
};
export default sendToken;