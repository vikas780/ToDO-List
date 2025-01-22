const Shimmer = () => {
  const shimmerElements = Array(8).fill(0)
  return (
    <div className='p-4 mx-auto lg:max-w-[87rem] sm:max-w-full'>
      <h2 className='text-4xl font-bold text-gray-800 mb-12'>All Tasks</h2>
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
    </div>
  )
}

export default Shimmer
