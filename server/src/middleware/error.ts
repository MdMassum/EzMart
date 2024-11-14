import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // wrong MongoDB ID error (e.g., if a wrong ID is passed)
    if (err.name === "CastError") {
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // MongoDB duplicate key error (e.g., if someone registers using an email that already exists)
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`;
        err = new ErrorHandler(message, 400);
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token is expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export default errorMiddleware;
