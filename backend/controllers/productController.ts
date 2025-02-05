import { Request, Response } from 'express'
import Product, { IProduct } from '../models/Product'
import Category, { ICategory } from '../models/Category'
import mongoose from 'mongoose'
import { errorResponse, successResponse } from '../helper/responseHelpers'
import { ISubCategory } from '../models/SubCategory'

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, description, category, subCategory, stock, sizes } =
      req.body

    // Validate required fields
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subCategory ||
      !sizes ||
      stock === undefined
    ) {
      errorResponse(res, 400, 'Missing required fields')
      return
    }

    // Parse `sizes` if it's a string
    const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes)

    // Validate `sizes`
    if (
      !Array.isArray(parsedSizes) ||
      parsedSizes.some(size => !size.size || !size.stock || size.stock < 0)
    ) {
      errorResponse(res, 400, 'Invalid sizes format')
      return
    }

    // Calculate total stock across all sizes
    const totalStock = parsedSizes.reduce((sum, size) => sum + size.stock, 0)

    // Determine `inStock` status
    const inStock = totalStock > 0

    // Create new product
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      subCategory,
      stock: totalStock,
      inStock,
      sizes: parsedSizes,
      images: []
    })

    // Save the product to the database
    const savedProduct = await newProduct.save()

    successResponse(res, 'Product added successfully', savedProduct)
  } catch (error) {
    console.error('Error adding product:', error)
    errorResponse(res, 500, 'Internal server error')
  }
}

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      productId,
      name,
      price,
      description,
      category,
      subCategory,
      stock,
      sizes
    } = req.body

    // Validate the product ID
    if (!productId) {
      errorResponse(res, 400, 'Product ID is required')
      return
    }

    // Validate required fields
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subCategory ||
      !sizes
    ) {
      errorResponse(res, 400, 'Missing required fields')
      return
    }

    // Parse `sizes` and `images` if they are strings
    const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes)

    // Validate `sizes`
    if (
      !Array.isArray(parsedSizes) ||
      parsedSizes.some(size => !size.size || !size.stock || size.stock < 0)
    ) {
      errorResponse(res, 400, 'Invalid sizes format')
      return
    }

    // Prepare the update data
    const updateData: Record<string, any> = {
      name,
      price,
      description,
      category,
      subCategory,
      sizes: parsedSizes
    }

    if (stock) {
      updateData.stock = stock
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    )

    if (!updatedProduct) {
      errorResponse(res, 404, 'Product not found')
      return
    }

    // Return the updated product
    successResponse(res, 'Product updated successfully', updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    errorResponse(res, 500, 'Internal server error')
  }
}



export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Log the request body to confirm it's being passed properly
    const { category, subCategory, minPrice, maxPrice, size, stock, search } =
      req.body
    // Build filter object
    const filter: Record<string, any> = {}
    let hasFilters = false

    if (category) {
      filter.category = category
      hasFilters = true
    }
    if (subCategory) {
      filter.subCategory = subCategory
      hasFilters = true
    }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) {
        filter.price.$gte = Number(minPrice)
        hasFilters = true
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice)
        hasFilters = true
      }
    }

    if (size) {
      filter['sizes.size'] = size
      hasFilters = true
    }
    if (stock !== undefined) {
      filter.stock = stock === 'true' ? { $gt: 0 } : { $gte: 0 }
      hasFilters = true
    }
    if (search && search.trim() !== '') {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
      hasFilters = true
    }

    if (!hasFilters) {
      const products = await Product.find()
        .populate<{ category: ICategory }>('category', 'name')
        .populate<{ subCategory: ISubCategory }>('subCategory', 'name')
        .lean()

      successResponse(res, 'All Products fetched', products)
      return
    }

    const products = await Product.find(filter)
      .populate<{ category: ICategory }>('category', 'name')
      .populate<{ subCategory: ISubCategory }>('subCategory', 'name')
      .lean()

    if (!products.length) {
      errorResponse(res, 404, 'No products found')
      return
    }

    const enrichedProducts = products.map((product: any) => {
      const categoryName = product.category?.name
      const subCategoryName = product.subCategory?.name

      return {
        ...product,
        categoryName,
        subCategoryName
      }
    })

    successResponse(res, 'Filtered Products fetched', enrichedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    errorResponse(res, 500, 'Error fetching products')
  }
}



// Delete a product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.body

    if (!productId) {
      errorResponse(res, 400, 'Product ID is required')
      return
    }

    const deletedProduct = await Product.findByIdAndDelete(productId)

    if (!deletedProduct) {
      errorResponse(res, 404, 'Product not found')
      return
    }

    successResponse(res, 'Product deleted successfully', deletedProduct)
  } catch (error) {
    console.error('Error deleting product:', error)
    errorResponse(res, 500, 'Error deleting product')
  }
}

// Get product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      errorResponse(res, 400, 'Invalid product ID format')
      return
    }

    const product = await Product.findById(productId).populate(
      'category',
      'name',
      
    ).populate(
      'subCategory',
      'name',
      
    )

    if (!product) {
      errorResponse(res, 404, 'Product not found')
      return
    }

    successResponse(res, 'Product fetched successfully', product)
  } catch (error) {
    console.error('Error fetching product:', error)
    errorResponse(res, 500, 'Error fetching product')
  }
}
