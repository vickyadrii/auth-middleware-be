import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

import { User } from "@/types/auth";
import { ResponseJSON } from "@/types/response";
import { PrismaClient, Prisma } from "@prisma/client";

import { generateToken } from "../lib/authentication/jwt";
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
    return; 
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      response({
        code: 404,
        data: null,
        message: "User not found!",
      });
      return;
    }

    if (!user.is_verified) {
      response({
        code: 400,
        data: null,
        message: "Your account is not yet verified!",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      response({
        code: 400,
        data: null,
        message: "Invalid password!",
      });
      return;
    }

    const token = generateToken(user.id);
    const { password: _, email_token, ...userData } = user;

    response({
      code: 200,
      data: {...userData, token},
      message: "Login successful!",
    });
  } catch (error) {
    response({
      code: 500,
      data: null,
      message: "Oops! Something went wrong!",
    });
  }
};

// Verify Email Token
export const verifyEmailTokenService = async (payload: User, response: ResponseJSON) => {
  const { email_token } = payload;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email_token: email_token,
      },
    });

    const token = generateToken(user?.id);

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email_token: null,
          is_verified: true,
        },
      });

      await prisma.userProfile.create({
        data: {
          user_id: user.id,
        },
      });

      response({
        code: 200,
        data: { ...user, token },
        message: "Login successful!",
      });
      return;
    } else {
      response({
        code: 400,
        data: null,
        message: "Invalid Token!",
      });
    }
  } catch (error) {
    response({
      code: 500,
      data: null,
      message: "Oops! Something went wrong!",
    });
  }
};

export const getUsersService = async (response: ResponseJSON) => {
  try {
    const users = await prisma.user.findMany();
    response({
      code: 200,
      data: users,
      message: "Get data users successful!",
    });
    return;
  } catch (error) {
    response({
      code: 500,
      data: null,
      message: "Oops! Something went wrong!",
    });
  }
};
