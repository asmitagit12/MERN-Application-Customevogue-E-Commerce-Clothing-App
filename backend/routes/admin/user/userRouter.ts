import express from 'express'
import { authenticate, authorizeRole } from '../../../middleware/authMiddleware'
import { getAllUsers, getUserById } from '../../../controllers/userController'

const router = express.Router()

// Route to get all users (Admins only)
router.get('/', getAllUsers)

// Route to get a specific user by ID (Open to authenticated users)
router.get('/:id', getUserById)

export default router
