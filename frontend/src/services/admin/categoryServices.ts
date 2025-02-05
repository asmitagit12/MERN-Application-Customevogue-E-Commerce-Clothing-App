import { apiRequest } from '../../http-common/apiRequest'

export const getAllCategories = async () => {
  return apiRequest({ route: '/category/', method: 'GET' })
}

export const addCategory = async (data: { name: string }) => {
  return apiRequest({ route: '/category/add', method: 'POST', data })
}

export const updateCategory = async (data: {
  categoryId: string
  name: string
}) => {
  return apiRequest({ route: '/category/update', method: 'POST', data })
}

export const deleteCategory = async (data: { categoryId: string }) => {
  return apiRequest({ route: '/category/delete', method: 'POST', data })
}

export const getSubCategories = async (categoryId: string) => {
  return apiRequest({
    route: `/subcategories/${categoryId}`,
    method: 'GET'
  })
}

export const addSubCategory = async (data: {
  categoryId: string
  subCategories: string[]
}) => {
  return apiRequest({ route: '/subcategories/add', method: 'POST', data })
}

export const deleteSubCategory = async (data: {
  categoryId: string
  subCategoryId: string
}) => {
  return apiRequest({ route: '/subcategories/delete', method: 'POST', data })
}
