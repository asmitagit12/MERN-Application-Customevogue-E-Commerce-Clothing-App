import { Response } from 'express'
import Cart from '../models/Cart'
import Product from '../models/Product'
import { CustomRequest } from '../middleware/authMiddleware' // Ensure this is the correct path
import { errorResponse, successResponse } from '../helper/responseHelpers'

// Get cart for a user
export const getCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId // Access user from req.user

    if (!userId) {
      errorResponse(res, 400, 'User ID is required')
      return
    }

    // Fetch the cart for the user
    const cart = await Cart.findOne({ userId }).populate('items.productId')
    if (!cart) {
      errorResponse(res, 400, 'Cart not found')
      return
    }

    successResponse(res, 'Cart data fetched', { cart })
  } catch (error) {
    errorResponse(res, 500, 'Error fetching cart')
  }
}
// Add product to cart
export const addToCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user?.userId

    if (!userId || !productId || !quantity) {
      errorResponse(res, 400, 'User ID, Product ID, and quantity are required')

      return
    }

    // Check if the product exists
    const product = await Product.findById(productId)
    if (!product) {
      errorResponse(res, 404, 'Product not found')
      return
    }

    // Check if there's enough stock
    if (product.stock < quantity) {
      errorResponse(res, 400, 'Not enough stock available')
      return
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      })
    } else {
      const existingItem = cart.items.find(
        item => item.productId.toString() === productId
      )

      if (existingItem) {
        if (product.stock < quantity + existingItem.quantity) {
          errorResponse(res, 400, 'Not enough stock available')
          return
        }
        existingItem.quantity += quantity
      } else {
        cart.items.push({ productId, quantity })
      }
    }

    // Update the product stock
    product.stock -= quantity
    await product.save()

    // Save the cart
    await cart.save()

    successResponse(res, 'Product added to cart', { cart })
  } catch (error) {
    errorResponse(res, 500, 'Error adding product to cart')
  }
}

// Update the quantity of a product in the cart
export const updateCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user?.userId

    if (!userId || !productId || !quantity) {
      errorResponse(res, 400, 'User ID, Product ID, and quantity are required')
      return
    }

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      errorResponse(res, 404, 'Cart not found')
      return
    }

    const item = cart.items.find(
      item => item.productId.toString() === productId
    )

    if (!item) {
      errorResponse(res, 404, 'Product not found in cart')
      return
    }

    const product = await Product.findById(productId)

    if (!product) {
      errorResponse(res, 404, 'Product not found')
      return
    }

    const stockAdjustment = item.quantity - quantity

    if (product.stock < -stockAdjustment) {
      errorResponse(res, 400, 'Not enough stock available')
      return
    }

    product.stock += stockAdjustment
    await product.save()

    item.quantity = quantity
    await cart.save()

    successResponse(res, 'Cart updated', { cart })
  } catch (error) {
    errorResponse(res, 500, 'Error updating cart')
  }
}

// Remove product from cart
export const removeFromCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.body
    const userId = req.user?.userId

    if (!userId || !productId) {
      errorResponse(res, 400, 'User ID and Product ID are required')
      return
    }

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      errorResponse(res, 404, 'Cart not found')
      return
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    )

    if (itemIndex === -1) {
      errorResponse(res, 404, 'Product not found in cart')
      return
    }

    const item = cart.items[itemIndex]
    const product = await Product.findById(productId)
    if (!product) {
      errorResponse(res, 404, 'Product not found')
      return
    }

    // Restore stock
    product.stock += item.quantity
    await product.save()

    // Remove item from cart
    cart.items.splice(itemIndex, 1)
    await cart.save()

    successResponse(res, 'Product removed from cart', { cart })
  } catch (error) {
    errorResponse(res, 500, 'Error removing product from cart')
  }
}
