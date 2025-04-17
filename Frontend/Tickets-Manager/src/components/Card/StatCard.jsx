import React from 'react'

const StatCard = ({ label, count, status }) => {
    const getStatusTagColor = () => {
        switch (status) {
            case 'Completed': return 'text-indigo-100 text-indigo-500 border border-indigo-200';
            case 'In Progress': return 'text-cyan-100 text-cyan-500 border border-cyan-200';
            default: return 'text-violet-100 text-violet-500 border border-violet-200';
        }
    };
    return (
        <div className={`flex-1 text-[8px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
            <span className='text-[10px] font-semibold'>
                {count}
                <br />
                {label}
            </span>
        </div>
    )
}

export default StatCard