import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../services/userService';
import { toast } from 'react-toastify'
const ModalDelete = (props) => {

    const { open, setOpen, infoUser } = props;
    const handleDeleteUser = async (userId) => {
        const res = await deleteUser(userId);
        if (res && res.data.EC === 0) {
            toast.success(res.data.EM);
        }
    }
    return (<Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this user with email: {infoUser.email}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteUser(infoUser.id)}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default ModalDelete;