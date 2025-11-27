import express from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, getOrdersByUserId, updateOrderStatus } from "../../../controllers/orderController";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../../controllers/paymentController";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:userId", getOrdersByUserId);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
