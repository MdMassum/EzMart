import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import verifyAuth from "../middleware/verifyUser";

const router = express.Router();

router.post('/signUp', registerUser);
router.post('/signIn', loginUser);
router.post('/logout', logoutUser);

export default router