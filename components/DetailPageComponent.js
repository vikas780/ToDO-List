'use client'
import React from 'react'
import Image from 'next/image'
import details from '@/public/details.svg'
import Link from 'next/link'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { deleteTask } from '@/features/tasks/TaskSlice'
import { useDispatch, useSelector } from 'react-redux'

const DetailPageComponent = ({ task, token }) => {
  const dispatch = useDispatch()
  const { deleteStatus } = useSelector((state) => state.Task)
  return (
    <div className='p-4 lg:max-w-5xl max-w-lg mx-auto mt-20'>
      <div className='grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12'>
        <div className='w-full lg:sticky top-0 sm:flex gap-2'>
          <Image
            src={details}
            alt={'Detail screen'}
            className='w-4/5 rounded-md object-cover p-2'
            width={400}
            height={400}
          />
        </div>

        <div>
          <div className='mt-4'>
            <h3 className='text-xl font-bold text-gray-800'>
              Task description:
            </h3>
            <p className='mt-4 leading-0 tracking-wider min-h-36'>
              {task?.description || 'No description available.'}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row justify-center gap-4 mt-8 justify-between'>
            <button
              type='button'
              className='flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-900 text-white text-sm font-semibold rounded-md transition-all'
            >
              <FaEdit />
              Edit Task
            </button>

            <Link href={'/tasks'}>
              <button
                type='button'
                className='flex w-full items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-700 text-white text-sm font-semibold rounded-md transition-all'
                onClick={() =>
                  dispatch(deleteTask({ taskId: task._id, token }))
                }
                disabled={deleteStatus === 'Deleting...'}
              >
                <FaTrashAlt />
                {deleteStatus === 'Deleting...' ? 'Deleting...' : 'Delete Task'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPageComponent
