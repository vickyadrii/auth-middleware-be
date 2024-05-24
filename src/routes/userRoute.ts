import { authMiddleware } from "../middleware/authMiddleware";
import { updateUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.put("/update", authMiddleware, updateUser);

export default router;
