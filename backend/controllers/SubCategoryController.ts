import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'
import SubCategory, { ISubCategory } from '../models/SubCategory'
import Category from '../models/Category'
import { errorResponse, successResponse } from '../helper/responseHelpers'

/**
 * Get all subcategories
 */
export const getAllSubCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subCategories = await SubCategory.find().lean() // Use lean for better performance if only reading
    successResponse(res, 'Subcategories fetched successfully', subCategories)
  } catch (error) {
    console.error('Error fetching subcategories:', error)
    errorResponse(res, 500, 'Error fetching subcategories')
  }
}

/**
 * Get all subcategories by categoryId
 */
export const getSubCategoriesByCategoryId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.params

    if (!categoryId) {
      errorResponse(res, 400, 'Category ID is required')
    }

    // Check if the category exists and populate subcategories
    const category = await Category.findById(categoryId)
      .populate('subCategories')
      .lean()

    if (!category) {
      errorResponse(res, 400, 'Category not found')
      return
    }

    const subCategories = category.subCategories // Already populated subcategories

    successResponse(res, 'Subcategories fetched successfully', subCategories)
  } catch (error) {
    console.error('Error fetching subcategories by categoryId:', error)
    errorResponse(res, 500, 'Error fetching subcategories')
  }
}

/**
 * Add a new subcategory to a category
 */
export const addSubCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId, subCategories } = req.body

    if (
      !categoryId ||
      !Array.isArray(subCategories) ||
      subCategories.length === 0
    ) {
      errorResponse(
        res,
        400,
        'Category ID and a list of SubCategories are required'
      )
      return
    }

    if (!mongoose.isValidObjectId(categoryId)) {
      errorResponse(res, 400, 'Invalid Category ID')
      return
    }

    // Validate each subcategory name
    if (
      subCategories.some(
        (subCategory: string) =>
          typeof subCategory !== 'string' || subCategory.trim() === ''
      )
    ) {
      errorResponse(
        res,
        400,
        'SubCategories must be an array of non-empty strings'
      )
      return
    }

    // Create subcategories and save them
    const subCategoryDocs: ISubCategory[] = subCategories.map(
      (name: string) => new SubCategory({ name })
    )
    const savedSubCategories = await SubCategory.insertMany(subCategoryDocs)

    // Extract ObjectIds of saved subcategories
    const subCategoryIds = savedSubCategories.map(
      subCategory => subCategory._id
    )

    // Find the associated category
    const category = await Category.findById(categoryId)
    if (!category) {
      errorResponse(res, 404, 'Category not found')
      return
    }

    // Update the category's subCategories field
    category.subCategories.push(...subCategoryIds)
    await category.save()

    successResponse(res, 'Subcategories added successfully', savedSubCategories)
  } catch (error) {
    console.error('Error adding subcategories:', error)
    errorResponse(res, 500, 'Error adding subcategories')
  }
}

/**
 * Update a subcategory
 */
export const updateSubCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subCategoryId, name } = req.body

    if (!subCategoryId) {
      errorResponse(res, 400, 'SubCategory ID is required')
      return
    }

    if (!mongoose.isValidObjectId(subCategoryId)) {
      errorResponse(res, 400, 'Invalid SubCategory ID')
      return
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { name },
      { new: true }
    )

    if (!updatedSubCategory) {
      errorResponse(res, 404, 'Subcategory not found')
      return
    }

    successResponse(res, 'Subcategory updated successfully', updatedSubCategory)
  } catch (error) {
    console.error('Error updating subcategory:', error)
    errorResponse(res, 500, 'Error updating subcategory')
  }
}

/**
 * Delete a subcategory
 */
export const deleteSubCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId, subCategoryId } = req.body

    if (!categoryId || !subCategoryId) {
      errorResponse(res, 400, 'Category ID and SubCategory ID are required')
      return
    }

    if (
      !mongoose.isValidObjectId(categoryId) ||
      !mongoose.isValidObjectId(subCategoryId)
    ) {
      errorResponse(res, 400, 'Invalid Category ID or SubCategory ID')
      return
    }

    // Find the category
    const category = await Category.findById(categoryId)
    if (!category) {
      errorResponse(res, 404, 'Category not found')
      return
    }

    // Check if the subcategory exists in the category's subCategories array
    if (!category.subCategories.includes(subCategoryId)) {
      errorResponse(res, 404, 'Subcategory not found in this category')
      return
    }

    // Remove subcategory from the category
    category.subCategories = category.subCategories.filter(
      id => id.toString() !== subCategoryId
    )
    await category.save()

    // Delete the subcategory document from the database
    const deletedSubCategory = await SubCategory.findByIdAndDelete(subCategoryId)
    if (!deletedSubCategory) {
      errorResponse(res, 404, 'Subcategory not found')
      return
    }

    successResponse(res, 'Subcategory deleted successfully', deletedSubCategory)
  } catch (error: any) {
    console.error('Error deleting subcategory:', error)
    errorResponse(res, 500, 'Error deleting subcategory')
  }
}
