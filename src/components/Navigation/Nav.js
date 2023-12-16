import React from 'react'
import './Nav.scss'
import { NavLink } from 'react-router-dom'
const Nav = () => {
    return (
        <div className="topnav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/create-user">Create users</NavLink>
            <NavLink to="/update-user">Update user</NavLink>
        </div>
    )
}

export default Nav