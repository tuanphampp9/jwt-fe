import React, { useEffect, useState } from 'react';
import './Users.scss'
import { getListUserWithPaginate } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import ModalDelete from '../Modal/ModalDelete';
import ModalUser from '../Modal/ModalUser';
const Users = () => {
    const [listUser, setListUser] = useState([]);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [type, setType] = useState('create');
    const [infoUser, setInfoUser] = useState('');
    const limit = 3;
    useEffect(() => {
        fetchAllUser(1, limit);
    }, [])
    const fetchAllUser = async (page, limit) => {
        const res = await getListUserWithPaginate(page, limit);
        if (res.data && res.data.EC === 0) {
            setListUser(res.data.DT.listUser);
            setTotalPages(res.data.DT.totalPages);
        }
    }
    const handlePageClick = (e) => {
        fetchAllUser(e.selected + 1, limit);
    }
    return (
        <div className='container'>
            <div className='user-header'>
                <h3>Table Users</h3>
                <div className='acion-btn'>
                    <button className='btn btn-success' onClick={() => window.location.reload()}><i className="fa fa-refresh"></i>Refresh</button>
                    <button className='btn btn-primary' onClick={() => {
                        setOpenModalUser(true)
                        setType('create')
                    }}><i className="fa fa-plus"></i>Add new user</button>
                </div>
            </div>
            <div className='user-body'>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Display name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser.map((user) => {
                            return <tr key={`row-${user.id}`}>
                                <th scope="row">{user.id}</th>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.display_name}</td>
                                <td>{user.group.name}</td>
                                <td>
                                    <button className='btn btn-warning mx-2' onClick={() => {
                                        setOpenModalUser(true);
                                        setType('update')
                                        setInfoUser(user);
                                    }}><i className="fa fa-pencil"></i></button>
                                    <button className='btn btn-danger' onClick={() => {
                                        setOpenModalDelete(true)
                                        setInfoUser(user)
                                    }
                                    }><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
            <div className='user-footer'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={4}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
            {openModalDelete && <ModalDelete open={openModalDelete} setOpen={setOpenModalDelete} infoUser={infoUser} />}
            {openModalUser && <ModalUser open={openModalUser} setOpen={setOpenModalUser} type={type} infoUser={infoUser} />}
        </div>
    )
}

export default Users;