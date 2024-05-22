import { Router } from "express";
import { getDefaultRoute } from "../controllers/homeController";


const router = Router();

router.get("/", getDefaultRoute);

export default router;
