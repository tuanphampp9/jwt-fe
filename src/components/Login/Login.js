import React, { useContext } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import { toast } from 'react-toastify'
import { UserContext } from '../../context/UserContext';
const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [valueLogin, setValueLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const handleLogin = async () => {
        if (!valueLogin || !password) {
            setError('Bạn chưa nhập tài khoản hoặc mật khẩu');
        } else {
            setError('')
            const res = await loginUser(valueLogin, password);
            if (res.data.EC === 1) {
                return setError(res.data.EM);
            }
            toast.success(res.data.EM);
            localStorage.setItem('token', res.data.DT.access_token)
            login({ isAuthenticated: true, token: res.data.DT.access_token, display_name: res.data.DT.display_name, isLoading: false })
            navigate('/manage-users')
        }
    }
    return (
        <div className="login-container mt-2">
            <div className='container'>
                <div className='row'>
                    <div className='content-left col-6 d-none d-md-block'>
                        <div className='brand'>
                            Check
                        </div>
                        <div className='description'>
                            Learn and experience
                        </div>
                    </div>
                    <div className='content-right col-md-6 col-12 d-flex flex-column gap-2 py-4'>
                        <input type='text' className='form-control' placeholder='Email or Phone number'
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)} />
                        <input type='password' className='form-control' placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLogin();
                                }
                            }} />
                        {error && <h3 style={{ color: 'red', fontStyle: 'italic', fontSize: '14px' }}>{error}</h3>}
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Log in</button>
                        <a href='afda' className='text-center'>Forgotten password?</a>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => navigate('/register')}>
                                Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login