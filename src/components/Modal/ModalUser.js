import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getListGroup } from '../../services/groupService';
import { createNewUser, updateInfoUser } from '../../services/userService';
import { toast } from 'react-toastify'
const ModalUser = (props) => {
    const { open, setOpen, type, infoUser } = props;
    const [listGroup, setListGroup] = useState([]);
    useEffect(() => {
        fetchListGroup();
    }, [])
    const fetchListGroup = async () => {
        const res = await getListGroup();
        if (res && res.data && res.data.EC === 0) {
            setListGroup(res.data.DT)
        }
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            display_name: '',
            phone: '',
            password: '',
            address: '',
            gender: 'male',
            groupId: 1
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            display_name: Yup.string()
                .min(2, 'Username must be at least two characters')
                .required('Required!'),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Invalid phone number')
                .required('Phone number is required'),
            password: type === 'create' && Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!")
        }),
        onSubmit: async (values) => {
            let res;
            if (type === 'create') {
                res = await createNewUser(values);
            } else {
                const { display_name, gender, address, groupId } = values
                res = await updateInfoUser({ display_name, gender, address, groupId }, infoUser.id)
            }
            if (res && res.data.EC === 0) {
                toast.success(res.data.EM);
            }
        }
    });
    useEffect(() => {
        if (type === 'update') {
            formik.setFieldValue('email', infoUser.email);
            formik.setFieldValue('display_name', infoUser.display_name);
            formik.setFieldValue('phone', infoUser.phone);
            formik.setFieldValue('address', infoUser.address);
            formik.setFieldValue('gender', infoUser.gender);
            formik.setFieldValue('groupId', infoUser.group.id);
        }
    }, [type])

    return (<Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{type === "create" ? 'Create new user' : 'Update user'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div className='py-3'>
                    <div className='row'>
                        {type === 'create' && <div className='col-sm-6'>
                            <label>Email:</label>
                            <input type='email' className='form-control' placeholder='Email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                            {formik.errors.email && formik.touched.email && <p className='check-error'>{formik.errors.email}</p>}
                        </div>}
                        <div className={type === 'create' ? 'col-sm-6' : 'col-sm-12'}>
                            <label >Username:</label>
                            <input type='text' className='form-control' placeholder='display_name' name='display_name' value={formik.values.display_name} onChange={formik.handleChange} />
                            {formik.errors.display_name && formik.touched.display_name && <p className='check-error'>{formik.errors.display_name}</p>}
                        </div>
                    </div>
                    <div className='row'>
                        {type === 'create' && <div className='col-sm-6'>
                            <label >Phone number: </label>
                            <input type='text' className='form-control' placeholder='Phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} />
                            {formik.errors.phone && formik.touched.phone && <p className='check-error'>{formik.errors.phone}</p>}
                        </div>}
                        {type === 'create' && <div className={type === 'create' ? 'col-sm-6' : 'col-sm-12'}>
                            <label>Password: </label>
                            <input type='password' className='form-control' placeholder='Password' name='password' value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password && formik.touched.password && <p className='check-error'>{formik.errors.password}</p>}
                        </div>}
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <label >Address: </label>
                            <input type='text' className='form-control' placeholder='please type your address' name='address' value={formik.values.address} onChange={formik.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <label >Gender: </label>
                            <select className="form-select" aria-label="Default select example" name='gender' onChange={formik.handleChange} value={formik.values.gender}>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        <div className='col-sm-6'>
                            <label>Role: </label>
                            <select className="form-select" aria-label="Default select example" name='groupId' onChange={formik.handleChange} value={formik.values.groupId}>
                                {listGroup.map((group) => {
                                    return <option value={group.id} key={group.id}>{group.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div >
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={formik.handleSubmit}>
                {type === 'create' ? 'Add' : 'Save change'}
            </Button>
        </Modal.Footer>
    </Modal >)
}

export default ModalUser