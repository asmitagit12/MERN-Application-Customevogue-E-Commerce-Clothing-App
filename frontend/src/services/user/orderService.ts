import { apiRequest } from "../../http-common/apiRequest";

export const placeOrder = async (orderData: {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
}) => {
  return apiRequest({ route: '/orders', method: 'POST', data: orderData });
};

export const getOrderByUserId = async (userId: string) => {
  return apiRequest({
    route: `/orders/user/${userId}`,
    method: 'GET'
  })
}
