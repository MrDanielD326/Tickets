import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import Tasks from '../UI/Tasks';

const MyTasks = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  return (
    <DashboardLayout activeMenu="My Tasks">
      <Tasks
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onTaskClick={handleClick}
        isAdmin={false}
      />
    </DashboardLayout>
  );
};

export default MyTasks;
