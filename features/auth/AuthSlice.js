import { createSlice } from '@reduxjs/toolkit'

// Load token from localStorage (if available)
const initialToken =
  typeof window !== 'undefined' ? localStorage.getItem('authToken') : null

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('authToken', action.payload)
    },
    clearToken: (state) => {
      state.token = null
      localStorage.removeItem('authToken')
    },
  },
})

export const { setToken, clearToken } = AuthSlice.actions
export default AuthSlice.reducer
