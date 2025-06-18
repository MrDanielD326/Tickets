import React from 'react';

const TasksSkeleton = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
        <div className="flex gap-2 mb-2">
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
        <div className="h-4 bg-gray-100 rounded w-24 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="h-3 bg-gray-100 rounded w-full mb-4"></div>
        <div className="flex justify-between mt-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded-full"></div>
            ))}
        </div>
    </div>
);

export default TasksSkeleton; 