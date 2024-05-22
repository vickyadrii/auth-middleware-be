import { createUser, loginUser, verifyEmailToken } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmailToken);

export default router;
