import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://todos-api-aeaf.onrender.com/api/v1',
})

export const setupInterceptors = (token) => {
  apiClient.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}

export default apiClient
