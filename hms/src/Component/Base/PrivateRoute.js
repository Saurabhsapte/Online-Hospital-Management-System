import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../../Authentication/auth'
const PrivateRoute = () => {


    if (isLoggedIn()) {
        return <Outlet />
    }
    else {
        return <Navigate to={'/login'} />
    }
}

export default PrivateRoute;