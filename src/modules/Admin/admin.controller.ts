import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllOrders();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve orders",
      data: null,
    });
  }
};

export const AdminController = {
  getAllOrders,
};