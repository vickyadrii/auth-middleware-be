import { User } from "@/types/auth";
import { ResponseJSON } from "@/types/response";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import CryptoJS from "crypto-js";
import { sendConfirmationEmail } from "../lib/node-mailer/nodeMailer";

const prisma = new PrismaClient();

export const createUserService = async (payload: User, response: ResponseJSON) => {
  const { name, email, password } = payload;

  const emailToken = CryptoJS.AES.encrypt(name || "", "HERE IS A SECRET KEY").toString();

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
        email_token: emailToken,
      },
    });

    const { password, ...userData } = user;

    await sendConfirmationEmail({ ...user, email_token: emailToken });

    response({
      code: 201,
      data: userData,
      message: "Register successful! Confirmation email has been sent.",
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

// Login User
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
      console.log({ user });
      response({
        code: 400,
        data: null,
        message: "User not found!",
      });

      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log({ passwordMatch });
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

export const verifyEmailTokenService = async (payload: User, response: ResponseJSON) => {
  const { email_token } = payload;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email_token: email_token,
      },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email_token: null,
          is_verified: true,
        },
      });
  

      response({
        code: 200,
        data: user.email,
        message: "Login successful!",
      });
      return;
    } else {
      console.log({ user });
      response({
        code: 400,
        data: null,
        message: "Invalid Token!",
      });
    }
  } catch (error) {
    console.log({ error });
  }
};
