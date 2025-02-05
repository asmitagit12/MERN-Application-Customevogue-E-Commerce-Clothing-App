import { Router } from 'express'
import { authenticate } from '../../../middleware/authMiddleware'
import { getAllUserCategories } from '../../../controllers/user/UserCategoryController'


const router = Router()

// Protect the routes with authentication middleware
router.get('/', getAllUserCategories) // Get cart for the user


export default router
