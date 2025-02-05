import express from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  addOrUpdateSubCategory,
  deleteSubCategory,
} from '../../controllers/categoryController';

const router = express.Router();

// Routes for categories
router.get('/', getAllCategories);
router.post('/add', addCategory);
router.post('/update', updateCategory);
router.post('/delete', deleteCategory);
// Routes for subcategories
router.post('/subcategory/add-or-update', addOrUpdateSubCategory);
router.post('/subcategory/delete', deleteSubCategory);

export default router;
