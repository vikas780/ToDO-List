import React from 'react'

const CreateUpdateTask = () => {
  return (
    <section className='flex items-center justify-center min-h-screen'>
      <div className='relative w-full max-w-lg bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 z-10 mb-10'>
        <header className='text-center mb-6'>
          <h2 className='text-2xl font-extrabold text-gray-800'>
            {/* Shimmer for header text */}
            <div className='h-8 bg-gray-300 rounded-md w-3/4 animate-pulse'></div>
          </h2>
        </header>

        <form className='space-y-6 animate-pulse '>
          {/* Shimmer for Task Name */}
          <div className='flex flex-col'>
            <div className='h-6 bg-gray-300 rounded-md w-3/4 animate-pulse'></div>
            <div className='h-10 bg-gray-300 rounded-md mt-2 animate-pulse'></div>
          </div>

          {/* Shimmer for Task Description */}
          <div className='flex flex-col mt-6'>
            <div className='h-6 bg-gray-300 rounded-md w-1/2 animate-pulse'></div>
            <div className='h-20 bg-gray-300 rounded-md mt-2 animate-pulse'></div>
          </div>

          {/* Shimmer for Status Checkbox (Visible Only on Edit) */}
          <div className='flex items-center space-x-2 mt-6'>
            <div className='w-5 h-5 bg-gray-300 rounded-full animate-pulse'></div>
            <div className='h-6 bg-gray-300 rounded-md w-1/4 animate-pulse'></div>
          </div>

          {/* Shimmer for Submit Buttons */}
          <div className='flex flex-col gap-3 justify-center mt-6'>
            <div className='w-full h-12 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='w-full h-12 bg-gray-300 rounded-md animate-pulse mt-4'></div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreateUpdateTask
