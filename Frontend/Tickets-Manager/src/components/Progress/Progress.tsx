import React from 'react'

const Progress = ({ progress, status }) => {
    const getColor = () => {
        switch (status) {
            case 'Completed': return 'text-[#581845] bg-[#581845]/10 border border-[#581845]/20';
            case 'In Progress': return 'text-[#900C3F] bg-[#900C3F]/10 border border-[#900C3F]/20';
            default: return 'text-[#C70039] bg-[#C70039]/10 border border-[#C70039]/20';
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