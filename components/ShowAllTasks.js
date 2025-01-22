import Link from 'next/link'
import React from 'react'

const ShowAllTasks = ({ _id, name, description, status, toggleComplete }) => {
  const handleToggle = () => {
    toggleComplete(_id)
  }

  return (
    <div className='bg-gray-100 rounded-2xl p-5 cursor-pointer transition-transform duration-300 ease-in-out relative hover:translate-y-[-0.5rem] mb-4'>
      <div>
        <Link href={`/tasks/${_id}`}>
          <h3 className='text-lg font-extrabold overflow-hidden text-ellipsis whitespace-nowrap z-10'>
            {name}
          </h3>
        </Link>
        <p className='text-sm text-gray-600 mt-2 min-h-[6rem]'></p>
        <div className='flex justify-between items-center mt-4'>
          <h2>Check complete</h2>
          <div className='flex items-center space-x-4'>
            {/* Styled Checkbox */}
            <input
              type='checkbox'
              checked={status}
              onChange={handleToggle}
              className='w-6 h-6 border-2 border-gray-300 rounded-full checked:bg-green-500 transition-colors duration-300 ease-in-out focus:outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAllTasks
