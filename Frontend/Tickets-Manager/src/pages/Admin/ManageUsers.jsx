import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/Card/UserCard';
import toast from 'react-hot-toast';
import ManageUserSkeleton from '../../components/Skeleton/ManageUserSkeleton';

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (userData) => {
    navigate("/admin/users", { state: { userId: userData._id } })
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, { responseType: "blob" });
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading user details:", error);
      toast.error("Failed to download user details, Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Team">
      <div className="p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Team</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-lg" /> Download Report
          </button>
        </div>

        {/* Users Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {(loading && allUsers.length === 0) ? [...Array(6)].map((_, i) => <ManageUserSkeleton key={i} />) : (
            [...allUsers]
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((user) => <UserCard key={user._id} userInfo={user} onClick={() => handleClick(user)} />)
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers