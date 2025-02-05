import { apiRequest } from '../../http-common/apiRequest'

export const loginUser = async (data: { email: string; password: string }) => {
  return apiRequest({ route: '/auth/signin', method: 'POST', data })
}

export const registerUser = async (data: {
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
}) => {
  return apiRequest({ route: '/auth/signup', method: 'POST', data })
}
