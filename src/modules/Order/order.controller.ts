import { Request, Response } from "express";
import { OrderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";

const checkout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { deliveryAddress } = req.body;

    if (!deliveryAddress) {
      throw new Error("Delivery address is required");
    }

    const result = await OrderService.checkout(
      userId,
      deliveryAddress
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Checkout failed",
      data: null,
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await OrderService.getMyOrders(userId);

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

export const OrderController = {
  checkout,
    getMyOrders,
};