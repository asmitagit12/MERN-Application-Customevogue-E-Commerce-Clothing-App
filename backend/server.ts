import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import productRoutes from './routes/admin/product/productRouter'
import categoryRoutes from './routes/admin/category/categoryRouter'
import subCategoryRoutes from './routes/admin/subCategory/subCategoryRouter'
import authRoutes from './routes/auth/authRouter'
import userRoutes from './routes/admin/user/userRouter'
import cartRoutes from './routes/user/cart/cartRouter'
import userCategoryRoutes from './routes/user/category/userCategoryRouter'
import { authenticate, isAdmin } from './middleware/authMiddleware'
import mediaRouter from './controllers/mediaUploaders'
import userProfileRouter from './routes/user/userProfileRouter'
import orderRouter from './routes/user/order/orderRouter'
import paymentRouter from './routes/payment/paymentRouter'
import addressRouter from './routes/address/addressRouter'
import path from 'path'
dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000


app.use(cors())


app.use(express.json())

// Serve static files from the 'uploads' directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....')
})

// admin routes
app.use('/api/auth', authRoutes) // API for products
app.use('/api/products', productRoutes) // API for products
app.use('/api/subcategories', subCategoryRoutes) // API for products
app.use('/api/category', authenticate, isAdmin, categoryRoutes) // API for products
app.use('/api/users', authenticate, isAdmin, userRoutes)
app.use('/api/profile', userProfileRouter)
app.use('/api/addresses', addressRouter)
// user routes
app.use('/api/user/cart', cartRoutes)
app.use('/api/user/category', userCategoryRoutes)

//media upload router
app.use('/api', mediaRouter);

app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


