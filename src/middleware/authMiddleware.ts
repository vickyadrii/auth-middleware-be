import dotenv from 'dotenv';

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config(); 

const jwtSecretKey = process.env.JWT_SECREY_KEY || "";

type CustomRequest = Request & {
  token: String | JwtPayload
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader?.includes('Bearer')) {
    return res.status(401).json({
      message: "Authorization token not found!",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
