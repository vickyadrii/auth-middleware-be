import { Request, Response } from "express";

import { createUserService } from "../services/authService";

export const createUser = (req: Request, res: Response) => {
  createUserService(req.body, ({ code = 500, data, message }) => {
    res.status(code).json({
      code,
      data,
      message,
    });
  });
};
