import React from 'react'

const DetailsLoading = () => {
  return (
    <div className='p-2 lg:max-w-5xl max-w-lg mx-auto mt-20'>
      <div className='grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12'>
        {/* Shimmer for Image Section */}
        <div className='w-full lg:sticky top-0 sm:flex gap-2'>
          <div className='w-4/5 rounded-md bg-gray-300 h-96 animate-pulse'></div>
        </div>

        {/* Shimmer for Details Section */}
        <div>
          {/* Shimmer for Title */}
          <div className='h-8 bg-gray-300 rounded-md w-3/4 animate-pulse'></div>

          {/* Shimmer for Price */}
          <div className='flex flex-wrap gap-4 mt-4'>
            <div className='h-6 bg-gray-300 rounded-md w-1/4 animate-pulse'></div>
          </div>

          {/* Shimmer for About Section */}
          <div className='mt-4'>
            <div className='h-6 bg-gray-300 rounded-md w-1/2 animate-pulse'></div>
            <div className='mt-4 space-y-2'>
              <div className='h-4 bg-gray-300 rounded-md w-full animate-pulse'></div>
              <div className='h-4 bg-gray-300 rounded-md w-3/4 animate-pulse'></div>
              <div className='h-4 bg-gray-300 rounded-md w-4/5 animate-pulse'></div>
              <div className='h-4 bg-gray-300 rounded-md w-2/3 animate-pulse'></div>
            </div>
          </div>

          {/* Shimmer for Button */}
          <div className='w-full mt-8 h-10 bg-gray-300 rounded-md animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default DetailsLoading
