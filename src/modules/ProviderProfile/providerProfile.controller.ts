import { Request, Response } from "express";

import { ProviderService } from "./providerProfile.service";
import sendResponse from "../../utils/sendResponse";

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;

    const result = await ProviderService.createProviderProfile(
      userId,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Provider profile created successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to create provider profile",
      data: error,
    });
  }
};

const getMyProviderProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;

    const result = await ProviderService.getMyProviderProfile(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Provider profile retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to retrieve provider profile",
      data: error,
    });
  }
};

const getProviderBySlug = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.getProviderBySlug(
      req.params.slug as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Provider retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to retrieve provider",
      data: error,
    });
  }
};

const approveProvider = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.approveProvider(
      req.params.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Provider approved successfully",
      data: result,
    });
  } catch (error) {
    console.error("APPROVE PROVIDER ERROR:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to approve provider",
      data: error,
    });
  }
};

export const ProviderController = {
  createProviderProfile,
  getMyProviderProfile,
  getProviderBySlug,
  approveProvider
};