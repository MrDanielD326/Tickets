import React from 'react'
import StatCard from './StatCard'

const UserCard = ({ userInfo }) => (
    <div className='user-card p-2'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <img
                    className='w-12 h-12 rounded-full border-1 border-black'
                    src={userInfo?.profileImageUrl}
                    alt='Avatar'
                />
            </div>
            <div>
                <p className='text-sm font-medium'> {userInfo?.name} </p>
                <p className='text-xs text-gray-500'> {userInfo?.email} </p>
            </div>
        </div>
        <div className='flex items-end gap-2 mt-5'>
            <StatCard label="Pending" status="Pending" count={userInfo?.pendingTasks || 0} />
            <StatCard label="In Progress" status="In Progress" count={userInfo?.inProgressTasks || 0} />
            <StatCard label="Completed" status="Completed" count={userInfo?.completedTasks || 0} />
        </div>
    </div>
)

export default UserCard