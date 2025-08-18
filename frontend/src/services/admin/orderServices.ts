import { apiRequest } from "../../http-common/apiRequest"

export const getAllUserOrders = async () => {
  return apiRequest({ route: '/orders/', method: 'GET', })
}