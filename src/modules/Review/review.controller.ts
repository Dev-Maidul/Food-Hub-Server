import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../utils/sendResponse";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mealId, rating, comment } = req.body;

    const result = await ReviewService.createReview(
      userId,
      mealId,
      rating,
      comment
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to create review",
      data: null,
    });
  }
};
const getMealReviews = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    const result = await ReviewService.getMealReviews(mealId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meal reviews retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to retrieve reviews",
      data: null,
    });
  }
};

export const ReviewController = {
  createReview,
  getMealReviews,
};
