import { PrismaClient } from "@prisma/client";
import { ResponseJSON } from "@/types/response";
import cloudinary from "../configs/cloudinaryConfig";
import { UserProfile } from "@/types/user";

const prisma = new PrismaClient();

export const updateUserService = async (payload: UserProfile, file: Express.Multer.File, response: ResponseJSON) => {
  let { user_id, ...otherFields } = payload;

  if (typeof user_id === "string") {
    user_id = parseInt(user_id, 10);
  }

  try {
    let photoUrl = "";

    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "user_profiles",
      });
      photoUrl = uploadResult.secure_url;
    }

    const updatedProfile = await prisma.userProfile.update({
      where: {
        user_id: user_id,
      },
      data: {
        photo_url: photoUrl,
        ...otherFields,
      },
    });

    response({
      code: 200,
      data: updatedProfile,
      message: "User profile updated successfully!",
    });
  } catch (error) {
    console.error(error);
    response({
      code: 500,
      data: null,
      message: "An error occurred while updating the user profile.",
    });
  }
};

export const getDataUserService = async (id: number, response: ResponseJSON) => {
  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        user_id: id,
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

    response({
      code: 200,
      data: user,
      message: "Get data user successful!",
    });
  } catch (error) {
    console.error(error);
    response({
      code: 500,
      data: null,
      message: "An error occurred while getting the user profile.",
    });
  }
};
