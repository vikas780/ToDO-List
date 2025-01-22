import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from './features/tasks/TaskSlice'
import AuthReducer from './features/auth/AuthSlice'
import { setupInterceptors } from '@/util/ApiClient'

export const Store = configureStore({
  reducer: {
    Task: TaskReducer,
    auth: AuthReducer,
  },
})

// Set up Axios interceptors
setupInterceptors(() => Store.getState().auth?.token)

export default Store
