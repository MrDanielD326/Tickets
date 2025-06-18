import React from 'react'

const StatCard = ({ label, count, status }) => {
    const getStatusTagColor = () => {
        switch (status) {
            case 'Completed': return 'text-[#581845] bg-[#581845]/10 border border-[#581845]/20';
            case 'In Progress': return 'text-[#900C3F] bg-[#900C3F]/10 border border-[#900C3F]/20';
            default: return 'text-[#C70039] bg-[#C70039]/10 border border-[#C70039]/20';
        }
    };
    return (
        <div className={`flex-1 text-[8px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded flex items-center justify-center`}>
            <span className='text-[8px] font-semibold'>
                {count}{" "}{" "}{label}
            </span>
        </div>
    )
}

export default StatCard