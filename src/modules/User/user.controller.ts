import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await UserService.getMyProfile(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve profile",
      data: null,
    });
  }
};

const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const result = await UserService.updateMyProfile(
      userId,
      req.body
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to update profile",
      data: null,
    });
  }
};

export const UserController = {
  getMyProfile,
  updateMyProfile,
};