import { Router } from "express";

import homeRoute from './homeRoute'
import authRoute from './authRoute'
import userRoute from './userRoute'

const router = Router();

router.use("/", homeRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);

export default router;
