import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  streetAddress: string;
  name: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  addressType: "HOME" | "WORK" | "OTHER"; // Address category
}

const AddressSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
    addressType: {
      type: String,
      enum: ["HOME", "WORK", "OTHER"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAddress>("Address", AddressSchema);
