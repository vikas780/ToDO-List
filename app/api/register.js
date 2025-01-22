// register.js
import { toast } from 'react-toastify'
import axios from 'axios'

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(
      'https://todos-api-aeaf.onrender.com/api/v1/auth/register',
      { name, email, password }
    )

    // On successful registration, return token and user data
    return response.data
  } catch (error) {
    const errorMessage =
      `${error?.response?.data?.msg}, Reason: Email already exists` ||
      'Registration failed'
    toast.error(errorMessage)
    return { error: errorMessage }
  }
}
