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
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {isAdmin ? "Manage Tasks" : "My Tasks"}
        </h2>
        {tabs?.[0]?.count > 0 && (
          <div className="flex items-center gap-4">
            <TaskStatusTabs tabs={tabs} activeTab={filterStatus} setActiveTab={setFilterStatus} />
            {isAdmin && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                onClick={onDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tasks Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loading ? Array.from({ length: 6 }).map((_, idx) => <TasksSkeleton key={idx} />) : allTasks && allTasks.length > 0 ? (
          allTasks.map((item) => {
            const { _id, title, description, priority, status, progress, createdAt, dueDate, assignedTo, attachments, completedTodoCount, todoChecklist } = item;
            return (
              <TaskCard
                key={_id}
                title={title}
                description={description}
                priority={priority}
                status={status}
                progress={progress}
                createdAt={createdAt}
                dueDate={dueDate}
                assignedTo={assignedTo?.map(({ profileImageUrl }) => profileImageUrl)}
                attachmentCount={attachments?.length || 0}
                completedTodoCount={completedTodoCount || 0}
                todoChecklist={todoChecklist || []}
                onClick={() => onTaskClick(item)}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No tasks found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
