import { createUser } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", createUser);

export default router;