import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from './features/tasks/TaskSlice'
import AuthReducer from './features/auth/AuthSlice'

export const Store = configureStore({
  reducer: {
    Task: TaskReducer,
    auth: AuthReducer,
  },
})

export default Store
