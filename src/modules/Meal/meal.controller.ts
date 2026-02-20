import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { MealService } from "./meal.service";
import sendResponse from "../../utils/sendResponse";

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const result = await MealService.getAllMeals(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meals retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("GET ALL MEALS ERROR:", error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to retrieve meals",
    });
  }
};
const getMealBySlug = async (req: Request, res: Response) => {
  try {
    const result = await MealService.getMealBySlug(
      req.params.slug as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meal retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("GET MEAL BY SLUG ERROR:", error);

    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error?.message || "Failed to retrieve meal",
    });
  }
};

const createMeal = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;

    // 1️⃣ Get provider profile
    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!providerProfile) {
      throw new Error("Provider profile not found");
    }

    if (!providerProfile.isApproved) {
      throw new Error("Provider is not approved by admin");
    }

    // 2️⃣ Create meal
    const result = await MealService.createMeal(
      providerProfile.id,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (error) {
    console.error("CREATE MEAL ERROR:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to create meal",
      data: error,
    });
  }
};


const updateMeal = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;

    // 1️⃣ Get provider profile
    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!providerProfile) {
      throw new Error("Provider profile not found");
    }

    // 2️⃣ Call service
    const result = await MealService.updateMeal(
      providerProfile.id,
      req.params.id as string,
      req.body
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("UPDATE MEAL ERROR:", error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to update meal",
    });
  }
};



export const MealController = {
  createMeal,
  updateMeal,
  getAllMeals,
  getMealBySlug
};