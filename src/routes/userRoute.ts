import { authMiddleware } from "../middleware/authMiddleware";
import { getDataUser, updateUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.put("/", authMiddleware, updateUser);
router.get("/:id", getDataUser);

export default router;
