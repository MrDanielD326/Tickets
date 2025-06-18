import React, { useEffect, useState, useCallback } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import TaskCard from '../../components/Card/TaskCard';
import TaskStatusTabs from '../../components/Tab/TaskStatusTabs';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TasksSkeleton from '../../components/Skeleton/TasksSkeleton';

const Tasks = ({ filterStatus, setFilterStatus, onTaskClick, onDownloadReport, isAdmin }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus !== "All" ? filterStatus : undefined,
        },
      });
      setAllTasks(data?.tasks ?? []);
      const { all = 0, pendingTasks = 0, inProgressTasks = 0, completedTasks = 0 } = data?.statusSummary || {};
      setTabs([
        { label: "All", count: all },
        { label: "Pending", count: pendingTasks },
        { label: "In Progress", count: inProgressTasks },
        { label: "Completed", count: completedTasks },
      ]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    getAllTasks();
  }, [filterStatus, getAllTasks]);

  return (
    <div className="my-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl md:text-xl font-medium">{isAdmin ? "Manage Tasks" : "My Tasks"}</h2>
        </div>
        {tabs?.[0]?.count > 0 && (
          <div className="flex items-center gap-3">
            <TaskStatusTabs tabs={tabs} activeTab={filterStatus} setActiveTab={setFilterStatus} />
            {isAdmin && (
              <button className="hidden lg:flex download-btn" onClick={onDownloadReport}>
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => <TasksSkeleton key={idx} />)
          : allTasks?.map((item) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.asssignedTo?.map(({ profileImageUrl }) => profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => onTaskClick(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default Tasks;
