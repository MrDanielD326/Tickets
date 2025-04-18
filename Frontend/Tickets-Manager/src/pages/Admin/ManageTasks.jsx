import React, { useCallback, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import Tasks from '../UI/Tasks';

const ManageTasks = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const handleClick = useCallback((taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  }, [navigate]);

  const handleDownloadReport = useCallback(async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading task details:", error);
      toast.error("Failed to download task details, Please try again.");
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <Tasks
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onTaskClick={handleClick}
        onDownloadReport={handleDownloadReport}
        isAdmin={true}
      />
    </DashboardLayout>
  );
};

export default ManageTasks;
