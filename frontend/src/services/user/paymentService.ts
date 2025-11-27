import { apiRequest } from "../../http-common/apiRequest";

export const createRazorpayOrder = async (amount: number) => {
    return apiRequest({
        route: "/payment/razorpay/create-order",
        method: "POST",
        data: { amount }
    });
};

export const verifyRazorpayPayment = async (paymentData: any) => {
    return apiRequest({
        route: "/payment/razorpay/verify",
        method: "POST",
        data: paymentData,
    });
};
