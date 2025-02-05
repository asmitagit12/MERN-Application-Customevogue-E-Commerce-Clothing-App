import express from 'express'
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory
} from '../../../controllers/categoryController'

const router = express.Router()

// Category routes
router.get('/', getAllCategories)
router.post('/add', addCategory)
router.post('/update', updateCategory)
router.post('/delete', deleteCategory)
router.get('/:id', getCategoryById);

export default router
