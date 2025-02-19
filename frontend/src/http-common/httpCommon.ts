import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASEURL
const http = axios.create({
  baseURL: `${baseUrl}api` || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  // withCredentials:true
})

// Add token to headers
http.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default http
