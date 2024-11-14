import { Request } from "express";
import IUser from "../models/User"; // Make sure this path points to your User model's interface

declare module "express-serve-static-core" {
  interface Request {
    user?: typeof IUser | null; // Assuming you have a IUser interface, otherwise use 'any' or the correct type
  }

  interface JWTClaims {
    sub: string;           // Subject (user ID)
    email: string;         // User email
    username: string;      // Username
    iat: number;           // Issued at (timestamp)
    exp: number;           // Expiration time (timestamp)
    jti: string;           // JWT ID for token identification
  }
}