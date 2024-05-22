import { User } from "@/types/auth";
import { ResponseJSON } from "@/types/response";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createUserService = async (payload: User, response: ResponseJSON) => {
  const { name, email, password } = payload;

  if (!name || !email || !password) {
    response({
      message: "Name, email, and password are required!",
      code: 400,
      data: null,
    });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });
      
      const { password, ...userData } = user;
      
      response({
        message: "Register successfully!",
        data: userData,
        code: 201,
      });
      
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        response({
          message: "Email already exists!",
          code: 409,
          data: null,
        });
      }
    }

    response({
      message: "Failed to create user!",
      code: 500,
      data: null,
    });
  }
};
