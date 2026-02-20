import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";


const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result,
  });
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
};

const updateCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategory(
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
};

const deleteCategory = async (req: Request, res: Response) => {
  await CategoryService.deleteCategory(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully",
  });
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
};