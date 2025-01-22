import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    clearToken: (state) => {
      state.token = null
    },
  },
})

export const { setToken, clearToken } = AuthSlice.actions
export default AuthSlice.reducer
