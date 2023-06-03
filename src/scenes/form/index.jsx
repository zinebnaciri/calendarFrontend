import React from 'react';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import CreateUser from './modalUser.jsx';

export default function UserModal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              textAlign:'center',
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginLeft:'40%'
            }} variant="contained" onClick={handleOpen}
          >
            <AddBoxIcon sx={{ mr: "10px" }} />
            Nouveau 
          </Button>
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
