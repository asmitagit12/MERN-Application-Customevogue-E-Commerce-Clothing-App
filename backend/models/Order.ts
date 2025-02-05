import mongoose, { Schema, Document } from "mongoose";

// Enum for Order Status
enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to the User model
  items: Array<{
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }>; // Array of products in the order
  totalAmount: number; // Total order value
  status: OrderStatus; // Order status
  createdAt: Date; // Timestamp when the order was created
  updatedAt: Date; // Timestamp when the order was last updated
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to Product model
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
