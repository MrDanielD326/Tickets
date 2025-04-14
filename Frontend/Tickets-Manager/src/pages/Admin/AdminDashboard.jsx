import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';

const AdminDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  return (
    <div>
      AdminDashboard
    </div>
  )
}

export default AdminDashboard