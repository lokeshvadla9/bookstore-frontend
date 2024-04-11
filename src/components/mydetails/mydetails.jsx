import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import config from '../../config';
import Swal from 'sweetalert2';

function MyDetails({ userData }) {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [address, setAddress] = useState(userData.address);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can implement your update logic
    if (password === confirmPassword) {
      // Update logic
      const updatedUserData = {
        customerId: userData.customer_id,
        email,
        password: password || userData.password, // If password is not changed, keep the old password
        firstName,
        lastName,
        address,
        phoneNumber,
        isDeleted: 0
      };

      try {
        const response = await fetch(config.backendBaseUrl+'/api/users/register-or-update-customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUserData)
        });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'User details updated successfully!',
              });
          setPasswordChanged(true);
          setPassword('');
          setConfirmPassword('');
          setEditMode(false);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update user details',
              });
        }
      } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Failed to update user details',
          });
        console.error('Error updating user details:', error);
      }
    } else {
      // Handle password mismatch
      alert('Password mismatch. Please check your input.');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h2">{editMode?'Edit Details':'My Details'}</Typography>
      <br></br>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" width='50%' marginLeft={50}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '1rem', borderRadius:'25px', padding:'10px 20px' }}>
    Update Details
  </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button variant="outlined" onClick={handleCancelClick} style={{ color: 'inherit', borderRadius:'25px', padding:'10px 20px' }}>
    Cancel
  </Button>
            </Grid>
          </Grid>
          
        </form>
      ) : (
        <div>
          <div>
<IconButton onClick={handleEditClick} sx={{ gridColumn: 'span 2', mt: 2, justifyContent: 'flex-end', textAlign:'left' }}>
                <EditIcon /> Edit 
            </IconButton>
            </div>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2, textAlign:'left', marginLeft:'300px', marginTop:'30px' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold'}}>
                First Name:
            </Typography>
            <Typography variant="body1">{firstName}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Last Name:
            </Typography>
            <Typography variant="body1">{lastName}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Address:
            </Typography>
            <Typography variant="body1">{address}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Phone Number:
            </Typography>
            <Typography variant="body1">{phoneNumber}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Email:
            </Typography>
            <Typography variant="body1">{email}</Typography>
</Box>
</div>

      )}
    </Box>
  );
}

export default MyDetails;
