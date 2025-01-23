const Shimmer = () => {
  const shimmerElements = Array(8).fill(0)

  return (
    <div className='p-4 mx-auto lg:max-w-[87rem] sm:max-w-full'>
      <h2 className='text-4xl font-bold text-gray-800 mb-12 dark:text-white'>
        All Tasks
      </h2>

      <div className='flex px-4 py-4 rounded-md border-2 animate-pulse bg-gray-200 dark:bg-gray-500 focus-within:border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif] mt-2'></div>
      {/* Shimmer for Filter & Actions Section */}
      <div className='mt-4 flex justify-between items-center gap-4'>
        <div className='w-1/3'>
          <div className='h-6 bg-gray-300 rounded-md w-3/4 animate-pulse'></div>
          <div className='mt-2'>
            <div className='h-10 bg-gray-300 rounded-md w-1/2 animate-pulse'></div>
          </div>
        </div>
        <div className='w-1/4'>
          <div className='h-10 bg-gray-300 rounded-md w-3/4 animate-pulse'></div>
        </div>
      </div>

      {/* Shimmer for Task List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 mt-12'>
        {shimmerElements.map((_, index) => (
          <div
            key={index}
            className='animate-pulse bg-gray-200 p-4 rounded-lg space-y-4'
          >
            {/* Image Section */}
            <div className='bg-gray-300 h-48 w-full rounded-lg'></div>

            {/* Action Section */}
            <div className='flex justify-between items-center'>
              <div className='bg-gray-300 h-6 w-1/3 rounded'></div>
              <div className='bg-gray-300 h-8 w-16 rounded'></div>
            </div>
          </div>
        ))}
      </div>

      {/* Shimmer for Add Task Button */}
      <div className='mt-8'>
        <div className='h-10 bg-gray-300 rounded-md w-32 animate-pulse'></div>
      </div>
    </div>
  )
}

export default Shimmer
