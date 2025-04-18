import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import UserProvider, { UserContext } from './context/userContext';
import PrivateRoute from './routes/PrivateRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';

const Root = () => {
  const { user, loading } = useContext(UserContext);
  return loading ? null : !user
    ? <Navigate to="/login" replace />
    : user.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/user/dashboard" replace />;
};

const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tasks" element={<ManageTasks />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>
        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={['member']} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/tasks" element={<MyTasks />} />
          <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
        </Route>
        {/* Default Route */}
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
    <Toaster toastOptions={{ style: { fontSize: '13px' } }} />
  </UserProvider>
);

export default App;
