import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import apiClient from '@/util/ApiClient'
const defaultState = {
  allTasks: [],
  totalTask: 0,
  isLoading: true,
  deleteStatus: '',
  createStatus: '',
  updateStatus: '',
  lastDeletedTask: null,
}

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async ({ taskId, token }, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/todo/delete?id=${taskId}`)
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
    try {
      const response = await apiClient.post(
        '/todo/create',

        task
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to create task'
      )
    }
  }
)

export const updateTask = createAsyncThunk(
  'task/editTask',
  async ({ taskId, task, token }, thunkAPI) => {
    try {
      const response = await apiClient.put(`/todo/update?id=${taskId}`, task)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to update task'
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
    storeDeletedTask: (state, action) => {
      state.lastDeletedTask = action.payload // Store the deleted task
    },

    clearDeletedTask: (state) => {
      state.lastDeletedTask = null // Clear the stored task
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
    builder.addCase(updateTask.pending, (state) => {
      state.updateStatus = 'Updating...'
    })
    builder.addCase(updateTask.fulfilled, (state) => {
      state.updateStatus = 'Updated'
      toast.success('Task Updated')
    })
    builder.addCase(updateTask.rejected, (state, action) => {
      state.updateStatus = 'Failed'
      toast.error(action.payload)
    })
  },
})

export const { showLoading, hideLoading, storeDeletedTask, clearDeletedTask } =
  TaskSlice.actions
export default TaskSlice.reducer
