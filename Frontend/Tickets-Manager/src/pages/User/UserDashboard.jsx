import React from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Dashboard from '../UI/Dashboard';

const UserDashboard = () => {
  useUserAuth();
  const fetchDashboardData = () => axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
  return (
    <DashboardLayout activeMenu="Dashbaord">
      <Dashboard fetchDataApi={fetchDashboardData} redirectPath="/admin/tasks" />
    </DashboardLayout>
  );
};

export default UserDashboard;
