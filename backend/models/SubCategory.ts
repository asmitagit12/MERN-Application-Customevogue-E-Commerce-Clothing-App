import { Schema, model, Document, Types } from 'mongoose'

export interface ISubCategory extends Document {
  name: string
  _id: Types.ObjectId // Explicitly define _id type as ObjectId
}

const SubCategorySchema = new Schema<ISubCategory>({
  name: { type: String, required: true }
})

export default model<ISubCategory>('SubCategory', SubCategorySchema)
