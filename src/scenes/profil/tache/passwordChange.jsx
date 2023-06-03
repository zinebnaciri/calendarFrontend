import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import axios from 'axios';

export default function PasswordChanger() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== verifyPassword) {
      console.error('New password and verify password do not match');
      return;
    }

    const user_id = localStorage.getItem('id');

    try {
      const response = await axios.put(`/api/auth/users/${user_id}/password`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      if (response.status === 200) {
        console.log('Password updated successfully');
        // Clear input fields or perform any additional actions after successful update
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 20, marginTop: 30 }}>
      <form onSubmit={handlePasswordUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="old_password"
              label="Old Password"
              name="old_password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="new_password"
              label="New Password"
              name="new_password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="verify_password"
              label="Verify New Password"
              name="verify_password"
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update Password
        </Button>
      </form>
    </Container>
  );
}
