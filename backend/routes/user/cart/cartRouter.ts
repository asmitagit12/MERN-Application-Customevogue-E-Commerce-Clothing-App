import { Router } from 'express'
import { authenticate } from '../../../middleware/authMiddleware'
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart
} from '../../../controllers/cartController'

const router = Router()

// Protect the routes with authentication middleware
router.get('/', authenticate, getCart) // Get cart for the user
router.post('/add', authenticate, addToCart) // Add product to cart
router.post('/remove', authenticate, removeFromCart) // Remove product from cart
router.post('/update', authenticate, updateCart) // Update quantity of a product in cart

export default router
