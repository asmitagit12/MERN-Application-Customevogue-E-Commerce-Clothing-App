import mongoose, { Document, Schema } from 'mongoose';
import { ISubCategory } from './SubCategory';

// Define the Category interface
export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id as ObjectId
  name: string; // Top-level category name
  subCategories: mongoose.Types.ObjectId[]; // Array of SubCategory references
}

// Define the Category schema
const CategorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true, unique: true }, // Top-level category name
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }], // References to SubCategory documents
});

// Export the Category model
export default mongoose.model<ICategory>('Category', CategorySchema);
