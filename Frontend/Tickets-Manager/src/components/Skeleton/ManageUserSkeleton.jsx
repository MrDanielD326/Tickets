import React from 'react';

const ManageUserSkeleton = () => (
    <div className='user-card p-2 animate-pulse'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-gray-200 border-2 border-white'></div>
            </div>
            <div>
                <div className='h-4 w-24 bg-gray-200 rounded mb-2'></div>
                <div className='h-3 w-32 bg-gray-100 rounded'></div>
            </div>
        </div>
        <div className='flex items-end gap-3 mt-5'>
            {[...Array(3)].map((_, i) => (
                <div key={i} className='flex-1 px-4 py-2 rounded bg-gray-100'>
                    <div className='h-3 w-8 bg-gray-200 rounded mb-1 mx-auto'></div>
                    <div className='h-2 w-12 bg-gray-100 rounded mx-auto'></div>
                </div>
            ))}
        </div>
    </div>
);

export default ManageUserSkeleton; 