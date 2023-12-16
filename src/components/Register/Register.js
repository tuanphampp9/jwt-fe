import React, { useEffect } from 'react'
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { registerNewUser } from '../../services/userService';
const Register = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            phone: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            username: Yup.string()
                .min(2, 'Username have to bigger two characters')
                .required('Required!'),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Invalid phone number')
                .required('Phone number is required'),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!")
        }),
        onSubmit: async (values) => {
            console.log(values);
            const dataRegister = { email: values.email, display_name: values.username, phone: values.phone, password: values.password };
            const res = await registerNewUser(dataRegister);
            if (res.status === 200) {
                toast.success(res.data.EM)
                navigate('/login')
            }
        }
    });
    return (
        <div className="register-container mt-2">
            <div className='container'>
                <div className='row'>
                    <div className='content-left col-6 d-none d-md-block'>
                        <div className='brand'>
                            Checksdf
                        </div>
                        <div className='description'>
                            Learn and experience
                        </div>
                    </div>
                    <div className='content-right col-md-6 col-12 d-flex flex-column gap-2 py-4'>
                        <div>
                            <label>Email:</label>
                            <input type='email' className='form-control' placeholder='Email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                            {formik.errors.email && formik.touched.email && <p className='check-error'>{formik.errors.email}</p>}
                        </div>
                        <div>
                            <label >Username:</label>
                            <input type='text' className='form-control' placeholder='username' name='username' value={formik.values.username} onChange={formik.handleChange} />
                            {formik.errors.username && formik.touched.username && <p className='check-error'>{formik.errors.username}</p>}
                        </div>
                        <div>
                            <label >Phone number: </label>
                            <input type='text' className='form-control' placeholder='Phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} />
                            {formik.errors.phone && formik.touched.phone && <p className='check-error'>{formik.errors.phone}</p>}
                        </div>
                        <div>
                            <label>Password: </label>
                            <input type='password' className='form-control' placeholder='Password' name='password' value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password && formik.touched.password && <p className='check-error'>{formik.errors.password}</p>}
                        </div>
                        <div>
                            <label>Confirm Password: </label>
                            <input type='password' className='form-control' placeholder='Confirm Password' name='confirm_password' value={formik.values.confirm_password} onChange={formik.handleChange} />
                            {formik.errors.confirm_password && formik.touched.confirm_password && <p className='check-error'>{formik.errors.confirm_password}</p>}
                        </div>
                        <button className='btn btn-primary' type='submit' disabled={formik.isSubmitting} onClick={formik.handleSubmit}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => navigate('/login')}>Already've have an account?Back to login!</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default Register