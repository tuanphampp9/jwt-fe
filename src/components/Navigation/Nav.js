import React from 'react'
import './Nav.scss'
import { NavLink } from 'react-router-dom'
const Nav = () => {
    return (
        <div className="topnav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/manage-users">Manage users</NavLink>
            <NavLink to="/about">About</NavLink>
        </div>
    )
}

export default Nav