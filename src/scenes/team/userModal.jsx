import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import CreateUser from '../form/modalUser.jsx';

export default function UserModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Nouveau</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CreateUser />
            </Modal>
        </div>
    );
}
