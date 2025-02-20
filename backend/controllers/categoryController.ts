import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category';
import { errorResponse, successResponse } from '../helper/responseHelpers';

/**
 * Get all categories
 */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().populate('subCategories');
    successResponse(res, 'Categories fetched successfully', categories);
  } catch (error) {
    errorResponse(res, 500, 'Error fetching categories');
  }
};


export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.isValidObjectId(id)) {
      errorResponse(res, 400, 'Invalid category ID');
      return;
    }

    // Find the category by ID and populate subcategories
    const category = await Category.findById(id).populate('subCategories');

    if (!category) {
      errorResponse(res, 404, 'Category not found');
      return;
    }

    successResponse(res, 'Category fetched successfully', category);
  } catch (error) {
    errorResponse(res, 500, 'Error fetching category');
  }
};

/**
 * Add a new category
 */
export const addCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      errorResponse(res, 400, 'Category name is required');
      return;
    }

    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    successResponse(res, 'Category added successfully', savedCategory);
  } catch (error) {
    errorResponse(res, 500, 'Error adding category');
  }
};

/**
 * Update a category
 */
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, name } = req.body; // Expect categoryId and name in the body

    if (!categoryId) {
      errorResponse(res, 400, 'Category ID is required');
      return;
    }

    if (!name) {
      errorResponse(res, 400, 'Category name is required');
      return;
    }

    // Find and update the category by ID
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name }, // Update the category name
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      errorResponse(res, 404, 'Category not found');
      return;
    }

    successResponse(res, 'Category updated successfully', updatedCategory);
  } catch (error) {
    errorResponse(res, 500, 'Error updating category');
  }
};

/**
 * Delete a category
 */
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.body; // Expect categoryId in the body

    if (!categoryId) {
      errorResponse(res, 400, 'Category ID is required');
      return;
    }

    // Find and delete the category by ID
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      errorResponse(res, 404, 'Category not found');
      return;
    }

    successResponse(res, 'Category deleted successfully', deletedCategory);
  } catch (error) {
    errorResponse(res, 500, 'Error deleting category');
  }
};
