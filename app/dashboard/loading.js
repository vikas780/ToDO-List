import React from 'react'

const DashboardShimmer = () => {
  return (
    <article className='p-4 bg-gray-100 rounded-lg border-b-4 border-gray-200 shadow-md animate-pulse'>
      <header className='flex items-center justify-between'>
        {/* Shimmer placeholder for the count */}
        <div className='h-12 w-24 bg-gray-200 rounded-md'></div>
        {/* Shimmer placeholder for the icon */}
        <div className='w-16 h-14 bg-gray-200 rounded-lg'></div>
      </header>
      {/* Shimmer placeholder for the title */}
      <div className='mt-4 h-6 bg-gray-200 rounded-md w-3/5'></div>
    </article>
  )
}

export default DashboardShimmer
