import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import { OrderStatus } from "../../../generated/prisma/enums";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const result = await AdminService.getAllOrders(
      status as OrderStatus | undefined
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Orders retrieved successfully",
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


const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await AdminService.updateUserStatus(id as string, status);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to update user status",
      data: null,
    });
  }
};

const getAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAnalytics();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Analytics retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve analytics",
      data: null,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllUsers(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve users",
      data: null,
    });
  }
};

export const AdminController = {
  getAllOrders,
  updateUserStatus,
  getAnalytics,
  getAllUsers,
};

