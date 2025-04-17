import React from 'react'

const Progress = ({ progress, status }) => {
    const getColor = () => {
        switch (status) {
            case 'Completed': return 'text-indigo-100 text-indigo-500 border border-indigo-500/10';
            case 'In Progress': return 'text-cyan-100 text-cyan-500 border border-cyan-500/10';
            default: return 'text-violet-100 text-violet-500 border border-violet-500/10';
        }
    };
    return (
        <div className='w-full bg-gray-200 rounded-full h-1.5'>
            <div
                className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`}
                style={{ width: `${progress}%` }}
            >

            </div>
        </div>
    )
}

export default Progress