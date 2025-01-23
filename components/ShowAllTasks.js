import Link from 'next/link'
import React from 'react'

const ShowAllTasks = ({ _id, name, status, toggleComplete }) => {
  const handleToggle = () => {
    toggleComplete(_id)
  }

  return (
    <div className='bg-gray-100 dark:bg-gray-800  rounded-2xl p-6 cursor-pointer transition-transform duration-300 ease-in-out relative hover:translate-y-[-0.5rem] mb-6'>
      <div>
        <Link href={`/tasks/${_id}`}>
          <h3 className='text-lg font-extrabold text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap z-10'>
            {name}
          </h3>
        </Link>
        <p className='text-sm text-gray-600 dark:text-gray-300 mt-2 min-h-[4rem]'></p>
        <div className='flex justify-between items-center mt-4'>
          <h2 className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
            Check complete
          </h2>
          <div className='flex items-center space-x-4'>
            {/* Styled Checkbox */}
            <input
              type='checkbox'
              checked={status}
              onChange={handleToggle}
              className='w-6 h-6 border-2 border-gray-300 dark:border-gray-500 rounded-full checked:bg-green-500 focus:outline-none transition-colors duration-300 ease-in-out'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAllTasks
