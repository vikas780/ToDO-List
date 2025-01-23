'use client'

import React, { useEffect, useState } from 'react'
import { createTask, updateTask } from '@/features/tasks/TaskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const AddTask = ({ taskToEdit = null }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    status: false,
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { updateStatus, createStatus } = useSelector((state) => state.Task)
  const { data: session } = useSession()
  const router = useRouter() // Use the router hook for navigation

  const token = session?.user?.token

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        name: taskToEdit.name,
        description: taskToEdit.description,
        status: taskToEdit.status,
      })
    }
  }, [taskToEdit])

  const validateForm = () => {
    const errors = {}
    let isValid = true

    if (task.name.length > 50) {
      errors.name = 'Title must be less than 50 characters.'
      isValid = false
    }
    if (task.description.length > 256) {
      errors.description = 'Description must be less than 256 characters.'
      isValid = false
    }

    setErrors(errors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      console.error('No token found. Please log in.')
      return
    }

    if (!validateForm()) {
      return
    }

    try {
      if (taskToEdit) {
        // Edit Task
        await dispatch(
          updateTask({ taskId: taskToEdit._id, task: { ...task }, token })
        ).unwrap()
        router.push(`/tasks/${taskToEdit._id}`)
      } else {
        // Create New Task
        await dispatch(createTask({ task, token })).unwrap()
        router.push('/tasks')
      }
      // Redirect to /tasks after successful operation
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <section className='flex items-center justify-center min-h-screen  dark:bg-gray-900'>
      <div className='relative w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 z-10 mb-10'>
        <header className='text-center mb-6'>
          <h2 className='text-2xl font-extrabold text-gray-800 dark:text-gray-200'>
            {taskToEdit ? 'Edit Task' : 'Add a New Task'}
          </h2>
        </header>

        <form
          className='space-y-6'
          onSubmit={handleSubmit}
          aria-labelledby='task-form'
          role='form'
        >
          {/* Task Name */}
          <div className='flex flex-col'>
            <label
              htmlFor='name'
              className='text-lg font-semibold text-gray-800 dark:text-gray-200'
            >
              Task Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className={`mt-1 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              placeholder='Enter task name'
              required
              aria-describedby='name-error'
            />
            {errors.name && (
              <p id='name-error' className='text-red-500 text-sm' role='alert'>
                {errors.name}
              </p>
            )}
          </div>

          {/* Task Description */}
          <div className='flex flex-col'>
            <label
              htmlFor='description'
              className='text-lg font-semibold text-gray-800 dark:text-gray-200'
            >
              Task Description
            </label>
            <textarea
              id='description'
              name='description'
              className={`mt-1 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              placeholder='Enter task description'
              rows='4'
              required
              aria-describedby='description-error'
            ></textarea>
            {errors.description && (
              <p
                id='description-error'
                className='text-red-500 text-sm'
                role='alert'
              >
                {errors.description}
              </p>
            )}
          </div>

          {/* Status Checkbox (Visible Only on Edit) */}
          {taskToEdit && (
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='status'
                className='w-5 h-5 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500'
                checked={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.checked })}
                aria-labelledby='status-label'
              />
              <label
                htmlFor='status'
                id='status-label'
                className='text-lg text-gray-800 dark:text-gray-200'
              >
                Mark as Completed
              </label>
            </div>
          )}

          {/* Submit Button */}
          <div className='flex flex-col gap-3 justify-center'>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
            >
              {taskToEdit
                ? updateStatus === 'Updating...'
                  ? 'Updating...'
                  : 'Update Task'
                : createStatus === 'Creating...'
                ? 'Creating...'
                : 'Create Task'}
            </button>
            <Link href='/tasks'>
              <button
                type='button'
                className='w-full py-2 px-4 bg-teal-600 dark:bg-teal-500 text-white font-medium rounded-md hover:bg-teal-800 dark:hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
              >
                Back to All tasks
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddTask
