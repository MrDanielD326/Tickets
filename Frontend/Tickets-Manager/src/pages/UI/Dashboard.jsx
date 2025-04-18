import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import moment from 'moment';
import { addThousandsSeperator } from '../../utils/helper';
import InfoCard from '../../components/Card/InfoCard';
import TaskListTable from '../../components/Table/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';
import { LuArrowRight } from 'react-icons/lu';

const COLORS = ['#8D51FF', '#00B8BD', '#7BCE00'];

const Dashboard = ({ fetchDataApi, redirectPath = '/admin/tasks' }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const prepareChartData = useCallback(({ taskDistribution = {}, taskPriorityLevels = {} }) => {
    setPieChartData([
      { status: 'Pending', count: taskDistribution.Pending || 0 },
      { status: 'In Progress', count: taskDistribution.InProgress || 0 },
      { status: 'Completed', count: taskDistribution.Completed || 0 }
    ]);
  
    setBarChartData([
      { status: 'Low', count: taskPriorityLevels.Low || 0 },
      { status: 'Medium', count: taskPriorityLevels.Medium || 0 },
      { status: 'High', count: taskPriorityLevels.High || 0 }
    ]);
  }, []);

  const getDashboardData = useCallback(async () => {
    try {
      const { data } = await fetchDataApi();
      if (data) {
        setDashboardData(data);
        prepareChartData(data?.charts);
      }
    } catch (error) {
      console.error('Error fetching dashboard data: ', error);
    }
  }, [fetchDataApi, prepareChartData]);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  const getGreeting = () => {
    const indiaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const hour = new Date(indiaTime).getHours();
    const minute = new Date(indiaTime).getMinutes();
    if (hour >= 6 && (hour < 8 || (hour === 7 && minute <= 59))) return 'Good Night';
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const onSeeMore = () => navigate(redirectPath);

  const tasksCounter = useMemo(() => {
    const taskDist = dashboardData?.charts?.taskDistribution || {};
    const taskCount = [
        { label: 'Total Tasks', color: 'bg-primary', value: taskDist.All || 0 },
        { label: 'Pending Tasks', color: 'bg-violet-500', value: taskDist.Pending || 0 },
        { label: 'In Progress Tasks', color: 'bg-cyan-500', value: taskDist.InProgress || 0 },
        { label: 'Completed Tasks', color: 'bg-lime-500', value: taskDist.Completed || 0 },
      ];
    return taskCount.map(({ label, color, value }) => (
      <InfoCard key={label} label={label} color={color} value={addThousandsSeperator(value)} />
    ));
  }, [dashboardData]);

  const taskCard = () => {
    const chartConfigs = [
      { title: 'Task Distribution in Pie', component: <CustomPieChart data={pieChartData} colors={COLORS} /> },
      { title: 'Task Distribution in Bar', component: <CustomBarChart data={barChartData} /> },
    ];
    return chartConfigs.map(({ title, component }) => (
      <div key={title} className='card'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium'> {title} </h5>
        </div>
        {component}
      </div>
    ));
  };

  return (
    <>
      <div className='card my-5'>
        <div className='col-span-3'>
          <h2 className='text-xl md:text-2xl'> {getGreeting()}, {user?.name} </h2>
          <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'> {moment().format('dddd Do MMM YYYY')} </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
          {tasksCounter}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
        {taskCard()}
        <div className='card md:col-span-2'>
          <div className='flex items-center justify-between'>
            <h5 className='text-lg'> Recent Tasks </h5>
            <button className='card-btn' onClick={onSeeMore}> See All <LuArrowRight className='text-base' /> </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTasks || {}} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
