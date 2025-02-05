// productServices.ts
import { apiRequest } from "../../http-common/apiRequest";
import { ProductFormData } from "../../types/types";

export const getAllProducts = async (filters = {}) => {
  const defaultFilters = {
    category: "",
    subCategory: "",
    minPrice: 0,
    maxPrice: 0,
    size: "",
    stock: false,
    search: "",
  };

  // Merge default filters with any dynamic filters
  const requestData = { ...defaultFilters, ...filters };

  return apiRequest({
    route: "/products/",
    method: "POST",
    data: requestData,
  });
};

export const addProduct = async (data: ProductFormData) => {
  return apiRequest({
    route: "/products/add",
    method: "POST",
    data, // Send JSON payload
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const updateProduct = async (data: ProductFormData) => {
  return apiRequest({
    route: "/products/update",
    method: "POST",
    data, // Send JSON payload
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProduct = async (data: { productId: string }) => {
  return apiRequest({ route: '/products/delete', method: 'POST', data })
}


export const getSingleProduct = async (productId: string) => {
  return apiRequest({
    route: `/products/${productId}`,
    method: 'GET'
  })
}