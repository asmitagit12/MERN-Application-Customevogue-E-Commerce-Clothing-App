import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  orderId: mongoose.Schema.Types.ObjectId;
  paymentId: string;
  signature: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "PENDING", enum: ["PENDING", "SUCCESS", "FAILED"] },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
