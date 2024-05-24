import { updateUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.put("/update", updateUser);

export default router;
