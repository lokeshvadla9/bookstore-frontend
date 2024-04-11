import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import config from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform email validation
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      try {
        const response = await fetch(config.backendBaseUrl+'/api/users/forgotpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        if (response.ok) {
          const responseData= await response.json();
          if(responseData.status==='success')
          {
            Swal.fire({
              icon: 'success',
              title: 'Verified',
              text: responseData.message,
            }).then(() => {
              // Redirect to login page
              navigate('/login');
            });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong',
              text: responseData.message,
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: 'There is a problem, Try again',
          });
        }
      } catch (error) {
        console.error('Error sending reset password request:', error);
        alert('An error occurred while sending reset password request. Please try again later.');
      }




    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '88vh' }}>
      <Box sx={{ maxWidth: '400px', textAlign: 'center' }}>
        <Avatar sx={{ margin: 'auto', marginBottom: '20px', backgroundColor: 'error.main', width: '64px', height: '64px' }}>
          <LockOutlinedIcon sx={{ fontSize: '36px', color: 'white' }} />
        </Avatar>
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={handleChange}
                error={Boolean(emailError)}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" style={{borderRadius:'25px', padding:'10px 0'}} fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
