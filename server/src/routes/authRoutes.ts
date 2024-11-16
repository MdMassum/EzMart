import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController";

const router = express.Router();

router.post('/signUp', registerUser);
router.post('/signIn', loginUser);
router.post('/logout', logoutUser);
// router.get('/check-auth', verifyAuth, getAuthUser);

export default router