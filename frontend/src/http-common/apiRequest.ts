import http from "./httpCommon";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  route: string;
  method: HttpMethod;
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, string>; // Make headers optional here
}

export const apiRequest = async ({ route, method, data, params, headers }: RequestConfig) => {
  try {
    // Initialize headers, default to empty object if not provided
    const requestHeaders: Record<string, string> = headers || {};

    // If data is an instance of FormData, don't set Content-Type, let the browser handle it
    if (data instanceof FormData) {
      requestHeaders['Content-Type'] = 'multipart/form-data'; // Let the browser handle this for FormData
    } else {
      // Default Content-Type for JSON requests
      requestHeaders['Content-Type'] = 'application/json';
    }

    const response = await http({
      url: route,
      method: method,
      data: data,
      params: params,
      headers: requestHeaders, // Include the headers in the request
    });

    return response.data;
  } catch (error: any) {
    // Handle errors globally here
    throw error.response ? error.response.data : new Error(error.message);
  }
};
