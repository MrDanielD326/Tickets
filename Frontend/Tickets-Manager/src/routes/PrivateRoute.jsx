import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles }) => <Outlet />

export default PrivateRoute