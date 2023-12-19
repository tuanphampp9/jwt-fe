import React, { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    console.log(user);
    return user.token ? <Outlet /> : <Navigate to="/login" />

}

export default PrivateRoutes