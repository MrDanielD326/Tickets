import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { addThousandsSeperator } from '../../utils/helper';
import InfoCard from '../../components/Card/InfoCard';
import TaskListTable from '../../components/Table/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';
import { LuArrowRight } from 'react-icons/lu';
import DashboardSkeleton from '../../components/Skeleton/DashboardSkeleton';

const STATUS_COLORS = ['#C70039', '#900C3F', '#581845'];
const PRIORITY_COLORS = ['#27ae60', '#f1c40f', '#c0392b'];

const Dashboard = ({ fetchDataApi, redirectPath = '/admin/tasks' }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const prepareChartData = useCallback(({ taskDistribution = {}, taskPriorityLevels = {} }) => {
    setPieChartData([
      { status: 'Pending', count: taskDistribution.Pending || 0 },
      { status: 'In Progress', count: taskDistribution.InProgress || 0 },
      { status: 'Completed', count: taskDistribution.Completed || 0 }
    ]);

    setBarChartData([
      { priority: 'Low', count: taskPriorityLevels.Low || 0 },
      { priority: 'Medium', count: taskPriorityLevels.Medium || 0 },
      { priority: 'High', count: taskPriorityLevels.High || 0 }
    ]);
  }, []);

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await fetchDataApi();
      if (data) {
        setDashboardData(data);
        prepareChartData(data?.charts || {});
      }
    } catch (error) {
      console.error('Error fetching dashboard data: ', error);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [fetchDataApi, prepareChartData]);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  const getGreeting = () => {
    const indiaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const hour = new Date(indiaTime).getHours();
    if (hour >= 5 && hour < 12) return '🌅 Good Morning';
    if (hour >= 12 && hour < 17) return '☀️ Good Afternoon';
    if (hour >= 17 && hour < 21) return '🌇 Good Evening';
    return '🌙 Good Night';
  };

  const onSeeMore = () => navigate(redirectPath);

  const tasksCounter = useMemo(() => {
    const taskDist = dashboardData?.charts?.taskDistribution || {};
    const taskCount = [
      { label: 'Total Tasks', color: 'bg-[#000000]', value: taskDist.All || 0 },
      { label: 'Pending Tasks', color: 'bg-[#C70039]', value: taskDist.Pending || 0 },
      { label: 'In Progress Tasks', color: 'bg-[#900C3F]', value: taskDist.InProgress || 0 },
      { label: 'Completed Tasks', color: 'bg-[#581845]', value: taskDist.Completed || 0 },
    ];
    return taskCount.map(({ label, color, value }) => (
      <InfoCard key={label} label={label} color={color} value={addThousandsSeperator(value)} />
    ));
  }, [dashboardData]);

  const taskCard = () => {
    const chartConfigs = [
      { component: <CustomPieChart data={pieChartData} colors={STATUS_COLORS} /> },
      { component: <CustomBarChart data={barChartData} colors={PRIORITY_COLORS} /> },
    ];
    return chartConfigs.map(({ title, component }) => (
      <div key={title} className='card'> {component} </div>
    ));
  };

  if (loading) return DashboardSkeleton();
  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className='text-xl md:text-xl font-semibold text-gray-600'> {getGreeting()} </h2>
        <p className='text-sm text-gray-500'>
          {moment().format('dddd')}{' '}
          <span dangerouslySetInnerHTML={{ __html: moment().format('Do').replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>') }} />
          {' '}{moment().format('MMMM YYYY')}
        </p>
      </div>
      <div className='bg-white rounded-lg p-4 md:p-6 shadow-sm'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {tasksCounter}
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'> {taskCard()} </div>
      <TaskListTable tableData={dashboardData?.recentTasks || []} redirectPath={redirectPath} />
    </div>
  );
};

export default Dashboard;
