import { apiRequest } from "../../http-common/apiRequest"

export const getAllUsers = async () => {
  return apiRequest({ route: '/users/', method: 'GET', })
}