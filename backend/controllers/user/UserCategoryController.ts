import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../helper/responseHelpers";
import Category from "../../models/Category";

export const getAllUserCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().populate('subCategories');
    successResponse(res, 'Categories fetched successfully', categories);
  } catch (error) {
    errorResponse(res, 500, 'Error fetching categories');
  }
};
