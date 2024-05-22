import { Router } from "express";
import homeRoute from "@/routes/homeRoute";

const router = Router();

router.use("/", homeRoute);
