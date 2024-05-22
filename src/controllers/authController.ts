import { Request, Response } from "express";

import { createUserService, loginService, verifyEmailTokenService } from "../services/authService";

export const createUser = (req: Request, res: Response) => {
  createUserService(req.body, ({ code = 500, data, message }) => {
    res.status(code).json({
      code,
      data,
      message,
    });
  });
};

export const loginUser = (req: Request, res: Response) => {
  loginService(req.body, ({ code = 500, data, message }) => {
    res.status(code).json({
      code,
      data,
      message,
    });
  });
};

export const verifyEmailToken = (req: Request, res: Response) => {
  verifyEmailTokenService(req.body, ({ code = 500, data, message }) => {
    res.status(code).json({
      code,
      data,
      message,
    });
  });
};
