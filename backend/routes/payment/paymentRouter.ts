// paymentRouter.ts
import { Router } from "express";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../controllers/paymentController";

const router = Router();

router.post("/razorpay/create-order", createRazorpayOrder);
router.post("/razorpay/verify", verifyRazorpayPayment);

export default router;
