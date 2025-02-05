import express from 'express'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../../../controllers/productController'

const router = express.Router()

router.post('/', getAllProducts)
router.post('/add', addProduct) // Add a new product
router.post('/update', updateProduct) // Add a new product
router.post('/delete', deleteProduct)
router.get('/:id', getProductById)

export default router
