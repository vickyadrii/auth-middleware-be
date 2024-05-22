import { User } from "@/types/auth";
import { ResponseJSON } from "@/types/response";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createUserService = async (payload: User, response: ResponseJSON) => {
  const { name, email, password } = payload;

  if (!name || !email || !password) {
    response({
      code: 400,
      data: null,
      message: "Name, email, and password are required!",
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
      code: 201,
      data: userData,
      message: "Register successful!",
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
      code: 500,
      data: null,
      message: "Failed to create user!",
    });
  }
};

export const loginService = async (payload: User, response: ResponseJSON) => {
  const { email, password } = payload;

  if (!email || !password) {
    response({
      code: 400,
      data: null,
      message: "Email and Password are required!",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log({user});
      response({
        code: 400,
        data: null,
        message: "User not found!",
      });

      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        console.log({passwordMatch});
      response({
        code: 400,
        data: null,
        message: "Invalid password!",
      });

      return;
    }

    response({
      code: 200,
      data: user?.email,
      message: "Login successful!",
    });
  } catch (error) {
    console.log("err", error);
    response({
      code: 500,
      data: null,
      message: "Oops! Something went wrong!",
    });
  }
};
