import mongoose, { Schema, Document } from 'mongoose'

// Interface for the Product Document
export interface IProduct extends Document {
  name: string
  price: number
  description: string
  category: mongoose.Types.ObjectId // Reference to Category ID
  subCategory: mongoose.Types.ObjectId // Reference to SubCategory ID
  images: [String], // Array of images (binary data and file type)
  inStock: boolean
  stock: number // Total stock across all sizes and colors
  sizes: {
    size: string // Size (e.g., S, M, L, XL)
    stock: number // Stock available for this size
  }[] // Array of sizes with corresponding stock
}

// Define the Product Schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true }, // Product name
    price: { type: Number, required: true, min: 0 }, // Price of the product
    description: { type: String, required: true, trim: true }, // Product description
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true
    }, // Foreign key reference to Category
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: 'SubCategory',
      required: true
    }, // Foreign key reference to SubCategory
    inStock: { type: Boolean, default: true }, // Whether the product is in stock
    stock: { type: Number, default: 0, min: 0 }, // Total stock for the product
    sizes: [
      {
        size: { type: String, required: true, trim: true }, // Size (e.g., S, M, L, XL)
        stock: { type: Number, default: 0, min: 0 } // Stock available for this size
      }
    ], // Array of sizes with stock
    images: [
      {
        type: String, required: true, // MIME type of the image (e.g., image/jpeg)
      }
    ] // Array of image files (binary data)
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
)

// Export the Product model
export default mongoose.model<IProduct>('Product', ProductSchema)
