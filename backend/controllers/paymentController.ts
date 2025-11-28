import { Request, Response } from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/Order";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    if (!amount) {
      res.status(400).json({ success: false, message: "Amount is required" });
      return;
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

export const verifyRazorpayPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId, items, totalAmount } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      res.status(400).json({ success: false, message: "Missing payment fields" });
      return;
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      res.status(400).json({ success: false, message: "Invalid signature" });
      return;
    }

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      paymentStatus: "PAID",
      paymentMethod: "RAZORPAY",
    });

    res.status(200).json({ success: true, message: "Payment verified", order });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
