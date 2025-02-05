import mongoose, { Schema, Document } from 'mongoose'

interface ICartItem {
  productId: mongoose.Types.ObjectId
  quantity: number
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId
  items: ICartItem[]
}

const CartItemSchema: Schema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
)


const CartSchema: Schema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      items: [CartItemSchema],
    },
    { timestamps: true }
  );

  export default mongoose.model<ICart>('Cart', CartSchema);