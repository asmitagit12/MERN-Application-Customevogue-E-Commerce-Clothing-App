import express from 'express'
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategoryId,
  updateSubCategory
} from '../../../controllers/SubCategoryController'

const router = express.Router()

// SubCategory routes
router.get('/', getAllSubCategories)
router.post('/add', addSubCategory)
router.post('/update', updateSubCategory)
router.post('/delete', deleteSubCategory)
router.get('/:categoryId', getSubCategoriesByCategoryId);

export default router
