'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import details from '@/public/details.svg'
import Link from 'next/link'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { deleteTask, storeDeletedTask } from '@/features/tasks/TaskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const DetailPageComponent = ({ task, token }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { deleteStatus } = useSelector((state) => state.Task)
  const [afterDelete, setAfterDelete] = useState(task)

  const handleDelete = async () => {
    dispatch(
      storeDeletedTask({
        name: task.name,
        description: task.description,
        status: task.status,
        id: task._id,
      })
    )
    await dispatch(deleteTask({ taskId: task._id, token })).unwrap()
    setAfterDelete(null)
    router.push('/tasks')

    // const updatedTasks = task.filter((t) => t._id !== task._id)
    // setAfterDelete(updatedTasks)
  }
  if (!afterDelete) {
    return (
      <h3 className='text-center text-gray-700 dark:text-gray-300'>
        Task has been deleted or is no longer available.
      </h3>
    )
  }

  return (
    <div className='p-4 lg:max-w-5xl max-w-lg mx-auto mt-20'>
      <div className='grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12'>
        <div className='w-full lg:sticky top-0 sm:flex gap-2'>
          <Image
            src={details}
            alt='Screenshot of task details showing the task description and related information.'
            className='w-4/5 rounded-md object-cover p-2'
            width={400}
            height={400}
            aria-labelledby='task-image'
          />
        </div>

        <div>
          <div className='mt-4'>
            <h3
              id='task-description'
              className='text-xl font-bold text-gray-800 dark:text-gray-200'
            >
              Task Description:
            </h3>
            <p
              id='task-desc-text'
              className='mt-4 leading-0 tracking-wider min-h-36 text-gray-700 dark:text-gray-300'
              aria-describedby='task-description'
            >
              {afterDelete?.description || 'No description available.'}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row justify-center gap-4 mt-8 justify-between'>
            <Link href={`/tasks/edit/${task._id}`}>
              <button
                type='button'
                aria-label='Edit task'
                className='flex w-full items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-900 text-white text-sm font-semibold rounded-md transition-all dark:bg-slate-800 dark:hover:bg-slate-700'
              >
                <FaEdit />
                Edit Task
              </button>
            </Link>
            <div>
              <button
                type='button'
                aria-label='Delete task'
                className='flex w-full items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-700 text-white text-sm font-semibold rounded-md transition-all dark:bg-red-600 dark:hover:bg-red-800'
                onClick={handleDelete}
                disabled={deleteStatus === 'Deleting...'}
              >
                <FaTrashAlt />
                {deleteStatus === 'Deleting...' ? 'Deleting...' : 'Delete Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPageComponent
