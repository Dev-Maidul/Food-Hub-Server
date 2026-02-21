import { Request, Response } from "express";
import { CartService } from "./cart.service";
import sendResponse from "../../utils/sendResponse";

const createCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await CartService.createCart(userId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Cart created successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to create cart",
      data: null,
    });
  }
};

export const CartController = {
  createCart,
};