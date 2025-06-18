import React from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const TaskListTable = ({ tableData = [], redirectPath = '/admin/tasks' }) => {
    const navigate = useNavigate();

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            case 'Pending': return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
            case 'In Progress': return 'bg-sky-50 text-sky-600 border border-sky-100';
            default: return 'bg-slate-50 text-slate-600 border border-slate-100';
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-rose-50 text-rose-600 border border-rose-100';
            case 'Medium': return 'bg-amber-50 text-amber-600 border border-amber-100';
            case 'Low': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            default: return 'bg-slate-50 text-slate-600 border border-slate-100';
        }
    };

    const onSeeMore = () => navigate(redirectPath);

    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-100'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-left'>Name</th>
                        <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-center'>Status</th>
                        <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-center'>Priority</th>
                        <th className='py-3.5 px-4 text-gray-600 font-semibold text-sm text-center hidden md:table-cell'>Created On</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                    {Array.isArray(tableData) && tableData.length > 0 ? (
                        tableData.map((task) => (
                            <tr key={task._id} className='hover:bg-gray-50 transition-colors duration-150'>
                                <td className='py-4 px-4 text-gray-700 text-sm font-medium text-left'>{task.title}</td>
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
                            <td colSpan="4" className="py-4 px-4 text-center text-gray-500">No tasks found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskListTable;