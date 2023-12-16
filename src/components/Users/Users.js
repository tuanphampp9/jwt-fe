import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Users.scss'
const Users = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login')
        }
    }, [])
    return <div>hello component</div>
}

export default Users;