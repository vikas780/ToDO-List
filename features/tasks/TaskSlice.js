import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import ApiClient from '@/util/ApiClient'
import axios from 'axios'

const defaultState = {
  allTasks: [],
  totalTask: 0,
  isLoading: true,
  deleteStatus: '',
  createStatus: '',
}

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async ({ taskId, token }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/delete?id=${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Unauthorized: Token may be invalid or expired.')
        toast.error('Unauthorized. Please log in again.')
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to delete task'
      )
    }
  }
)

// Async thunk for creating a task
export const createTask = createAsyncThunk(
  'task/createTask',
  async ({ task, token }, thunkAPI) => {
    console.log('Token in createTask:', token)

    try {
      const response = await axios.post(
        'https://todos-api-aeaf.onrender.com/api/v1/todo/create',

        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to create task'
      )
    }
  }
)

const TaskSlice = createSlice({
  name: 'Task',
  initialState: defaultState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTask.pending, (state) => {
      state.deleteStatus = 'Deleting...'
    })
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.deleteStatus = 'Deleted'
      toast.success('Task Deleted')
    })
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.deleteStatus = 'Failed'
      toast.error(action.payload)
    })
    builder.addCase(createTask.pending, (state) => {
      state.createStatus = 'Creating...'
    })
    builder.addCase(createTask.fulfilled, (state) => {
      state.createStatus = 'Created'
      toast.success('Task Created')
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.createStatus = 'Failed to create'
      toast.error(action.payload)
    })
  },
})

export const { showLoading, hideLoading } = TaskSlice.actions
export default TaskSlice.reducer
