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
const getMyCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await CartService.getMyCart(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve cart",
      data: null,
    });
  }
};

const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mealId, quantity } = req.body;

    const result = await CartService.addToCart(userId, mealId, quantity);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Item added to cart successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to add item to cart",
      data: null,
    });
  }
};

const updateQuantity = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { cartItemId, quantity } = req.body;

    const result = await CartService.updateQuantity(
      userId,
      cartItemId,
      quantity
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quantity updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to update quantity",
      data: null,
    });
  }
};
const removeItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { cartItemId } = req.params;

    const result = await CartService.removeItem(userId, cartItemId as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Item removed from cart successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to remove item",
      data: null,
    });
  }
};

const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await CartService.clearCart(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart cleared successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to clear cart",
      data: null,
    });
  }
};

export const CartController = {
  createCart,
  getMyCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart
};
