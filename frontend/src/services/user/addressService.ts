import { apiRequest } from "../../http-common/apiRequest";

// Create a new address
export const createAddress = async (data: any) => {
  return apiRequest({
    route: "/addresses/",
    method: "POST",
    data,
  });
};

// Get all addresses for a user
export const getUserAddresses = async (userId: string) => {
  return apiRequest({
    route: `/addresses/${userId}`,
    method: "GET",
  });
};

// Get a single address by ID
export const getAddressById = async (id: string) => {
  return apiRequest({
    route: `/addresses/single/${id}`,
    method: "GET",
  });
};

// Update an address
export const updateAddress = async (id: string, data: any) => {
  return apiRequest({
    route: `/addresses/${id}`,
    method: "PUT",
    data,
  });
};

// Delete an address
export const deleteAddress = async (id: string) => {
  return apiRequest({
    route: `/addresses/${id}`,
    method: "DELETE",
  });
};
