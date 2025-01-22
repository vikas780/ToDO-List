'use client'
import React, { useState } from 'react'
import { createTask } from '@/features/tasks/TaskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

const AddTask = () => {
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'false',
  })
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  })
  const dispatch = useDispatch()
  const { createStatus } = useSelector((state) => state.Task)
  const { data: session } = useSession()

  const token = session?.user?.token

  const validateForm = () => {
    let valid = true
    let errors = {}

    // Validate name (max length 50)
    if (newTask.name.length > 50) {
      errors.name = 'Title must be less than 50 characters.'
      valid = false
    }

    // Validate description (max length 256)
    if (newTask.description.length > 256) {
      errors.description = 'Description must be less than 256 characters.'
      valid = false
    }

    setErrors(errors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!token) {
      console.error('No token found. Please log in.')
      return
    }

    if (!validateForm()) {
      return // Don't submit if form is invalid
    }

    // Dispatch the createTask action with newTask and token
    dispatch(createTask({ task: newTask, token }))
  }

  return (
    <section className='flex items-center justify-center min-h-screen'>
      <div className='relative w-full max-w-lg bg-white shadow-lg rounded-lg p-8 z-10 mb-10'>
        <header className='text-center mb-6'>
          <h2 className='text-2xl font-extrabold text-gray-800'>
            Add a New Task
          </h2>
        </header>

        <form
          className='space-y-6'
          onSubmit={handleSubmit}
          aria-labelledby='task-form'
        >
          <div className='flex flex-col'>
            <label
              htmlFor='name'
              className='text-lg font-semibold text-gray-800'
            >
              Task Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className={`mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              placeholder='Enter task name'
              required
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='description'
              className='text-lg font-semibold text-gray-800'
            >
              Task Description
            </label>
            <textarea
              id='description'
              name='description'
              className={`mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder='Enter task description'
              rows='4'
              required
            ></textarea>
            {errors.description && (
              <p className='text-red-500 text-sm'>{errors.description}</p>
            )}
          </div>

          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
            >
              {createStatus === 'Creating...' ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddTask
