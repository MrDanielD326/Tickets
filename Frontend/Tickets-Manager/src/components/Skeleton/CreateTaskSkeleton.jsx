import React from 'react';

const CreateTaskSkeleton = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse w-full">
        <div className="flex items-center justify-between mb-6">
            <div className="h-7 w-40 bg-gray-200 rounded"></div>
            <div className="h-8 w-20 bg-gray-100 rounded"></div>
        </div>
        <div className="mb-4">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>
        <div className="mb-4">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-20 w-full bg-gray-100 rounded"></div>
        </div>
        <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6 md:col-span-4">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-100 rounded"></div>
            </div>
            <div className="col-span-6 md:col-span-6">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-100 rounded"></div>
            </div>
            <div className="col-span-12 md:col-span-3 mt-4 md:mt-0">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-100 rounded"></div>
            </div>
        </div>
        <div className="mb-4">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>
        <div className="mb-4">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>
        <div className="flex justify-end mt-8">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
    </div>
);

export default CreateTaskSkeleton; 