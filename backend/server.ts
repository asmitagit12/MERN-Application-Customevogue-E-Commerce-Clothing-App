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
//MONGO_URI="mongodb://localhost:27017/online-shop"
// MONGO_URI="mongodb+srv://asmita:1234@clothing-app.fi3cy.mongodb.net/clothing-app?retryWrites=true&w=majority&appName=clothing-app"
// PORT=5000
// JWT_SECRET="jwt"
// Allow frontend origin
const allowedOrigins = [
  'https://ap-customevogue-mern.vercel.app',
  'https://ap-customevogue.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Handle preflight requests
app.options('*', cors());

// Ensure every response contains CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ap-customevogue-mern.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}); // Handle preflight

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

//QK8WHAM3876YMQVA9N5V32R2  sendgrid verify code
