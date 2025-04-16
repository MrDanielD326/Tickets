import React, { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className='relative w-full'>
            {/* Dropdown button */}
            <button
                className='w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center'
                onClick={() => setIsOpen(!open)}
            >
                {value ? options.find((opt) => opt.value === value)?.label : placeholder}
                <span className='m1-2'>
                    {isOpen ? <LuChevronDown classNorotate-180me='' /> : <LuChevronDown className='' />}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className='absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10'>
                    {options.map((option) => (
                        <div
                            className='px-3 py-2 text-sm cursor-pointer hover:bg-gray-100'
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default SelectDropdown