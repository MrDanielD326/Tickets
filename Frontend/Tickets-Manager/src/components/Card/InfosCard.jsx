import React from 'react'

const InfosCard = ({ label, value }) => (
    <>
        <label className='text-xs font-medium text-slate-500'> {label} </label>
        <p className='text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5'> {value} </p>
    </>
)

export default InfosCard