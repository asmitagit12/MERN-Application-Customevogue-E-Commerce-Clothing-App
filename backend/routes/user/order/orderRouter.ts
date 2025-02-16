import express from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrderStatus } from "../../../controllers/orderController";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
