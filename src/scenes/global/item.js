import React from 'react';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import axios from 'axios';
import { logout } from '../RouteComponent/Service'; // Import the logout function from your service component

const Item = ({ title, to, icon, selected, setSelected }) => {
  const handleLogout = () => {
    console.log("ggggggggggg");

    axios.post('/api/auth/logout')
      .then(response => {
        // Handle successful logout
        localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Redirect to the login page or perform other actions
        window.location.href = '/login';
      })
      .catch(error => {
        // Handle error
        console.error('Error logging out:', error);
      });
  };
  return (
    <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default Item;  