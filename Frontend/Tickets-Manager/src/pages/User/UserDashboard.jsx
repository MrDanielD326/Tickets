import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import { addThousandsSeperator } from '../../utils/helper';
import InfoCard from '../../components/Card/InfoCard';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/Table/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const UserDashboard = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const COLORS = ["#8D51FF", "00B8BD", "#7BCE00"];

  // Prepare Chart Data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { status: "Low", count: taskPriorityLevels?.Low || 0 },
      { status: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { status: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(priorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  useEffect(() => {
    getDashboardData();
    return () => { }
  }, []);

  const getGreeting = () => {
    const indiaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const date = new Date(indiaTime);
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour >= 6 && (hour < 8 || (hour === 7 && minute <= 59))) return 'Good Night';
    if (hour >= 6 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const onSeeMore = () => {
    navigate('/admin/tasks');
  };

  return (
    <DashboardLayout activeMenu="Dashbaord">
      <div className='card my-5'>
        <div className=''>
          <div className='col-span-3'>
            <h2 className='text-xl md:text-2xl'>  {getGreeting()}, {user?.name} </h2>
            <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
          <InfoCard
            label="Total Tasks"
            color="bg-primary"
            value={addThousandsSeperator(dashboardData?.charts?.taskDistribution?.All || 0)}
          />
          <InfoCard
            label="Pending Tasks"
            color="bg-violet-500"
            value={addThousandsSeperator(dashboardData?.charts?.taskDistribution?.All || 0)}
          />
          <InfoCard
            label="In Progress Tasks"
            color="bg-cyan-500"
            value={addThousandsSeperator(dashboardData?.charts?.taskDistribution?.All || 0)}
          />
          <InfoCard
            label="Completed Tasks"
            color="bg-lime-500"
            value={addThousandsSeperator(dashboardData?.charts?.taskDistribution?.All || 0)}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
        <div>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'> Task Distribution </h5>
            </div>
            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>
        </div>
        <div>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'> Task Distribution </h5>
            </div>
            <CustomBarChart data={barChartData} />
          </div>
        </div>
        <div className='md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='text-lg'> Recent Tasks </h5>
              <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || {}} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default UserDashboard