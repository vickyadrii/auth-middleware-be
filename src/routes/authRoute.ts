import { authMiddleware } from "../middleware/authMiddleware";
import { createUser, getUsers, loginUser, verifyEmailToken } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmailToken);

router.get("/users", authMiddleware, getUsers);

export default router;
