import { Request, Response } from "express";
import Order, { IOrder } from "../models/Order";

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, items, totalAmount, paymentMethod } = req.body;

        const order = new Order({
            userId,
            items,
            totalAmount,
            status: "PENDING",
            paymentMethod,
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().populate("userId").populate("items.productId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id).populate("userId").populate("items.productId");
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return
        }
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
    }
};

// Get all orders for a specific user
export const getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId })
            .populate("userId")
            .populate("items.productId");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user's orders" });
    }
};
