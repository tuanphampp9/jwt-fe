import React, { useContext } from 'react'
import './Nav.scss'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify'
const NavHeader = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogoutAccount = async () => {
        const res = await logoutUser();
        if (res && res.data.EC === 0) {
            localStorage.removeItem('token');
            navigate('/login')
            logout()
            toast.success('Logout successful')
        }
    }
    return (
        <div className='root-nav'>
            <div className="topnav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/manage-users">Manage users</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
            <div className='right-nav'>
                <div className='info-user'>
                    WELCOME {user.display_name}
                </div>
                <div className='log-out' onClick={() => handleLogoutAccount()}>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default NavHeader