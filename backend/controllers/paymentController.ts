import { Request, Response } from "express";
import Stripe from "stripe";
import Payment from "../models/Payment";
import Order, { IOrder } from "../models/Order";  // Import IOrder type
import mongoose from "mongoose";  // Import mongoose

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Create a payment intent
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    // Find the order by orderId
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Type assertion to ensure that `order` is treated as `IOrder`
    const typedOrder = order as IOrder;

    // Ensure that _id is treated as a valid ObjectId and convert to string for Stripe metadata
    const orderIdString = typedOrder._id.toString();  // Explicitly convert _id to string

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: typedOrder.totalAmount * 100,  // Convert to smallest currency unit (e.g., paise for INR)
      currency: "inr",  // Use INR currency
      metadata: { orderId: orderIdString },  // Pass orderId as a string
    });

    // Respond with the client secret to confirm the payment on the frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};

// Confirm payment and save payment status
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { paymentId, paymentIntentId, status } = req.body;

    // Find the order by the associated paymentId
    const order = await Order.findById(paymentId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Create a new payment document
    const payment = new Payment({
      orderId: order._id,  // Ensure _id is treated correctly as an ObjectId
      paymentId,
      signature: paymentIntentId,
      amount: order.totalAmount,
      status: status === "succeeded" ? "SUCCESS" : "FAILED",
      createdAt: new Date(),
    });

    // Save the payment information to the database
    await payment.save();

    // Update the order status based on payment success or failure
    order.status = status === "succeeded" ? "SHIPPED" : "CANCELED";
    await order.save();

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to confirm payment" });
  }
};
