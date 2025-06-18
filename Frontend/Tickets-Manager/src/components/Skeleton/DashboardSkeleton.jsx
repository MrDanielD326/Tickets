import React from 'react'

const DashboardSkeleton = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
    {/* Header Skeleton */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div className="h-8 bg-gray-200 rounded w-48"></div>
      <div className="h-6 bg-gray-200 rounded w-40"></div>
    </div>

    {/* Info Cards Skeleton */}
    <div className='bg-white rounded-lg p-4 md:p-6 shadow-sm'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Charts Skeleton */}
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {[...Array(2)].map((_, i) => (
        <div key={i} className='card'>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>

    {/* Recent Tasks Skeleton */}
    <div className='bg-white rounded-lg p-4 md:p-6 shadow-sm'>
      <div className='flex items-center justify-between mb-4'>
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24 hidden md:block"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default DashboardSkeleton