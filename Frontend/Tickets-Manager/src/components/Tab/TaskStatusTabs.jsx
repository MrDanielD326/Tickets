import React from 'react'

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => (
    <div className='my-1'>
        <div className='flex gap-1 md:gap-2'>
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    className={`relative px-2 md:px-3 py-1 text-xs font-medium transition-colors duration-150 ${activeTab === tab.label
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                        } cursor-pointer focus:outline-none`}
                    onClick={() => setActiveTab(tab.label)}
                    type="button"
                >
                    <div className='flex items-center'>
                        <span
                            className={`text-[10px] ml-1 px-1.5 py-0.5 rounded ${activeTab === tab.label
                                ? 'bg-primary text-white'
                                : 'bg-gray-200/70 text-gray-600'
                                }`}
                        >
                            {tab.count}
                        </span>
                        <span className='mx-1'></span>
                        <span className='text-[10px]'> {tab.label} </span>
                    </div>
                    {activeTab === tab.label && (
                        <div className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded'></div>
                    )}
                </button>
            ))}
        </div>
    </div>
)

export default TaskStatusTabs