import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://todos-api-aeaf.onrender.com/api/v1',
})

export const setupInterceptors = (getToken) => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken()
      console.log('Dymanically getting token', token) // Get the token dynamically
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}

export default apiClient
