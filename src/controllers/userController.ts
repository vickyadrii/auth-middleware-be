import { getDataUserService, updateUserService } from "../services/userService";
import { Request, Response } from "express";
import uploadFile from "../configs/multerConfig";

export const updateUser = (req: Request, res: Response) => {
  uploadFile(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          code: 400,
          data: null,
          message: "Maximum limit is 1MB.",
        });
      } else if (err.message === "Images only!") {
        return res.status(400).json({
          code: 400,
          data: null,
          message: "Images only!",
        });
      } else {
        return res.status(500).json({
          code: 500,
          data: null,
          message: "File upload failed.",
        });
      }
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    updateUserService(req.body, file, ({ code = 500, data, message }) => {
      res.status(code).json({
        code,
        data,
        message,
      });
    });
  });
};

export const getDataUser = (req: Request, res: Response) => {
  const id = req.params.id;

  getDataUserService(parseInt(id), ({ code = 500, data, message }) => {
    res.status(code).json({
      code,
      data,
      message,
    });
  });
};
