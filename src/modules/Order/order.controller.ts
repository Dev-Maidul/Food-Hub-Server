import { Request, Response } from "express";
import { OrderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { OrderStatus } from "../../../generated/prisma/client";

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

const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const result = await OrderService.getOrderById(userId, id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order details retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve order",
      data: null,
    });
  }
};
const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await OrderService.getProviderOrders(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Incoming orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve provider orders",
      data: null,
    });
  }
};



const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { orderId } = req.params;
    const { status } = req.body;

    const result = await OrderService.updateOrderStatus(
      userId,
      orderId as string,
      status as OrderStatus
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to update order status",
      data: null,
    });
  }
};


const cancelOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const { orderId } = req.params;

    const result = await OrderService.cancelOrder(
      userId,
      orderId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order cancelled successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to cancel order",
      data: null,
    });
  }
};

export const OrderController = {
  checkout,
    getMyOrders,
    getOrderById,
    getProviderOrders,
    updateOrderStatus,
    cancelOrder
};