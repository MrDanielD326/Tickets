import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import InfosCard from '../../components/Card/InfosCard';
import moment from 'moment';
import AvatarGroup from '../../components/Avatar/AvatarGroup';
import TodoCheckList from '../../components/Inputs/TodoCheckList';
import Attachment from '../../components/Inputs/Attachment';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-lime-100 text-lime-500 border border-lime-200';
      case 'In Progress': return 'bg-cyan-100 text-cyan-500 border border-cyan-200';
      default: return 'bg-violet-100 text-violet-500 border border-violet-200';
    }
  };

  // Get task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Handle todo checklist
  const updateTodochecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];
    const taskId = id;

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;

      try {
        const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId), {
          todoChecklist
        });
        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          // Optionally revert the toggle if the API call fails
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
      } catch (error) {
        console.error("Error to get the task:", error);
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  // Handle attachment link
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link; // Default to HTTPS
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
    return () => { }
  }, [id]);

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className='mt-5'>
        {task && (
          <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
            <div className='form-card col-span-3'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl md:text-xl font-medium'>
                  {task?.title}
                </h2>
                <div className={`text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}>
                  {task?.status}
                </div>
              </div>
              <div className='mt-4'>
                <InfosCard label="Description" value={task?.description} />
              </div>
              <div className='grid grid-cols-12 gap-4 mt-4'>
                <div className='col-span-6 md:col-span-4'>
                  <InfosCard label="Priority" value={task?.priority} />
                </div>
                <div className='col-span-5 md:col-span-4'>
                  <InfosCard label="Due Date" value={task?.dueDate ? moment(task?.dueDate).format("Do MMM YYYY") : "N/A"} />
                </div>
                <div className='col-span-6 md:col-span-4'>
                  <label className='text-xs font-medium text-slate-500'> Assigned To </label>
                  <AvatarGroup
                    avatars={task?.assignedTo?.map((item) => item?.profileImageUrl || [])}
                    maxVisible={3}
                  />
                </div>
              </div>
              <div className='mt-2'>
                <label className='text-xs font-medium text-slate-500'> Todo Checklist </label>
                {task?.todoChecklist?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodochecklist(index)}
                  />
                ))}
              </div>
              {task?.attachments?.length > 0 && (
                <div className='mt-2'>
                  <label className='text-xs font-medium text-slate-500'> Attachments </label>
                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      index={index}
                      key={`link_${index}`}
                      link={link}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ViewTaskDetails
