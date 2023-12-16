import React from "react";
import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoutes = (props) => {
    let auth = sessionStorage.getItem('account');
    return auth ? <Outlet /> : <Navigate to="/login" />

}

export default PrivateRoutes