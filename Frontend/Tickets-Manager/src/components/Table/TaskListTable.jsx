import React from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';

const TaskListTable = ({ tableData = [], redirectPath = '/admin/tasks', title = 'Recent Tasks' }) => {
    const navigate = useNavigate();

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-[#581845] bg-[#581845]/10 border border-[#581845]/20';
            case 'In Progress': return 'text-[#900C3F] bg-[#900C3F]/10 border border-[#900C3F]/20';
            case 'Pending': return 'text-[#C70039] bg-[#C70039]/10 border border-[#C70039]/20';
            default: return 'text-[#FF5733] bg-[#FF5733]/10 border border-[#FF5733]/20';
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-[#c0392b] bg-[#c0392b]/10 border border-[#c0392b]/20';
            case 'Medium': return 'text-[#f1c40f] bg-[#f1c40f]/10 border border-[#f1c40f]/20';
            case 'Low': return 'text-[#27ae60] bg-[#27ae60]/10 border border-[#27ae60]/20';
            default: return 'text-[#2c3e50] bg-[#2c3e50]/10 border border-[#2c3e50]/20';
        }
    };

    const onSeeMore = () => navigate(redirectPath);

    return (
        <div className='bg-white rounded-lg p-4 md:p-6 shadow-sm'>
            <div className='flex items-center justify-between mb-6'>
                <h5 className='text-xl font-semibold text-gray-800'>{title}</h5>
                <button
                    className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                    onClick={onSeeMore}
                >
                    Show All <LuArrowRight className='text-base' />
                </button>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-100'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-center'> Name </th>
                            <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-center'> Status </th>
                            <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-center'> Priority </th>
                            <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-center hidden md:table-cell'> Created On </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {Array.isArray(tableData) && tableData.length > 0 ? (
                            tableData.map((task) => (
                                <tr key={task._id} className='hover:bg-gray-50 transition-colors duration-150'>
                                    <td className='py-4 px-4 text-gray-700 text-sm font-medium text-center'> {task.title} </td>
                                    <td className='py-4 px-4 text-center'>
                                        <span className={`px-2.5 py-1.5 text-xs font-medium rounded-full inline-block ${getStatusBadgeColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className='py-4 px-4 text-center'>
                                        <span className={`px-2.5 py-1.5 text-xs font-medium rounded-full inline-block ${getPriorityBadgeColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className='py-4 px-4 text-gray-700 text-sm text-center hidden md:table-cell'>
                                        {moment(task.createdAt).format('Do MMM YYYY')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 px-4 text-center text-gray-500"> No tasks found </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskListTable;
