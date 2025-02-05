// import { Router } from 'express'
// import multer from 'multer'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import { dirname } from 'path'
// import fs from 'fs'
// import mongoose from 'mongoose'
// import orderModel from '../models/orderModel.js'
// import { errorResponse, successResponse } from '../helpers/serverResponse.js'


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../uploads')
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath)
//     }
//     cb(null, uploadPath)
//   },
//   filename: async (req, file, cb) => {
//     try {
//       const oid = req.params.id
//       const order = await orderModel.findById(oid)

//       if (!order) {
//         throw new Error(`Order with ID ${oid} not found`)
//       }
//       const id = Math.floor(Math.random() * 900000) + 1000
//       const ext = path.extname(file.originalname)
//       const filename = `${order.OrderNumber}__${id}${ext}`
//       cb(null, filename)
//     } catch (error) {
//       cb(error)
//     }
//   }
// })

// const fileFilter = (req, file, cb) => {
//   const allowedExtensions = ['.png', '.jpeg', '.jpg']
//   const ext = path.extname(file.originalname).toLowerCase()
//   if (allowedExtensions.includes(ext)) {
//     cb(null, true)
//   } else {
//     cb(new Error(`File ${file.originalname} has an invalid extension.`), false) // Reject file
//   }
// }

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// }).array('images', 5)

// const uploadRouter = Router()

// uploadRouter.post('/:id', (req, res) => {
//   upload(req, res, async err => {
//     try {
//       if (err) {
//         return errorResponse(res, 400, err.message || 'Upload error')
//       }

//       // if (!req.files || req.files.length === 0) {
//       //   return errorResponse(res, 400, 'No files were uploaded.')
//       // }

//       const orderId = req.params.id.trim()

//       if (!mongoose.Types.ObjectId.isValid(orderId)) {
//         return errorResponse(res, 400, 'Invalid order ID')
//       }

//       const allowedExtensions = ['.png', '.jpeg', '.jpg']

//       const images = []
//       const errors = []

//       req.files.forEach(file => {
//         const ext = path.extname(file.originalname).toLowerCase()

//         if (allowedExtensions.includes(ext)) {
//           images.push(file.filename)
//         } else {
//           errors.push(`File ${file.originalname} has an invalid extension.`)
//         }
//       })

//       if (errors.length > 0) {
//         errors.forEach(error => {
//           errorResponse(res, 400, error)
//         })
//         return
//       }

//       const product = await orderModel.findByIdAndUpdate(
//         orderId,
//         { $push: { images: { $each: images } } },
//         { new: true }
//       )

//       if (!product) {
//         return errorResponse(res, 404, `Order with ID ${orderId} not found`)
//       }

//       successResponse(res, 'Images successfully uploaded', product)
//     } catch (error) {
//       console.error('Error:', error)

//       if (error.message && error.message.includes('server is disconnect')) {
//         return errorResponse(res, 503, 'Server disconnected during operation')
//       }

//       return errorResponse(res, 500, 'Internal server error')
//     }
//   })
// })
// export default uploadRouter




// const cartItems={[
//     {
//       productId: {
//         _id: '67610bf78f616d5f4361f199',
//         name: 'Sample Product',
//         price: 19.99,
//         description: 'A sample product description.A sample product description.',
//         category: 'Electronics',
//         images: ['https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', 'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120'],
//         stock: 10
//       },
//       quantity: 2
//     },
//     {
//       productId: {
//         _id: '67610bf78f616d5f4361f199',
//         name: 'Sample Product',
//         price: 19.99,
//         description: 'A sample product description.',
//         category: 'Electronics',
//         images: ['https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', 'image2.jpg'],
//         stock: 10
//       },
//       quantity: 2
//     },
//     {
//       productId: {
//         _id: '67610bf78f616d5f4361f199',
//         name: 'Sample Product',
//         price: 19.99,
//         description: 'A sample product description.',
//         category: 'Electronics',
//         images: ['https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', 'image2.jpg'],
//         stock: 10
//       },
//       quantity: 2
//     },
//     {
//       productId: {
//         _id: '67610bf78f616d5f4361f199',
//         name: 'Sample Product',
//         price: 19.99,
//         description: 'A sample product description.',
//         category: 'Electronics',
//         images: ['https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', 'image2.jpg'],
//         stock: 10
//       },
//       quantity: 2
//     },
//   ]}