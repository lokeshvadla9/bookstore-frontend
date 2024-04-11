import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import usStates from './UsStates';
import config from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate=useNavigate();
    const [errors, setErrors] = useState({});


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Perform validations
    const validationErrors = {};
    if (!data.get('firstName').match(/^[A-Za-z]+$/)) {
      validationErrors.firstName = 'First name should only contain alphabets';
    }
    if (!data.get('lastName').match(/^[A-Za-z]+$/)) {
      validationErrors.lastName = 'Last name should only contain alphabets';
    }
    if (!data.get('email').match(/\S+@\S+\.\S+/)) {
      validationErrors.email = 'Invalid email format';
    }
    if (!data.get('zipcode').match(/^\d{5}$/)) {
      validationErrors.zipcode = 'Zip code should contain exactly 5 digits';
    }
    if (!data.get('phoneNumber').match(/^\d{10}$/)) {
        validationErrors.phoneNumber = 'Phone number should contain exactly 10 digits';
      }
  

    // Set errors state
    setErrors(validationErrors);

    // If there are no validation errors, proceed with form submission
    if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await fetch(config.backendBaseUrl + '/api/users/register-or-update-customer', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                customerId:-1,
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                email: data.get('email'),
                password: data.get('password'),
                address: data.get('streetAddress')+','+data.get('city')+','+data.get('state')+','+data.get('zipcode'),
                phoneNumber:data.get('phoneNumber'),
                isDeleted:0
                
              })
            });
            
            if (response.ok) {
                const responseData= await response.json();
                if(responseData.status.toLowerCase()==='success')
                {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: responseData.message,
                      }).then(() => {
                        // Redirect to login page
                        navigate('/login');
                      });
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: responseData.message,
                      });
                }
              // Redirect or perform any other action upon successful registration
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Failed to register user',
                  });
            }
          } catch (error) {
            console.error('Error:', error);
            // Handle error scenario
          }
    }


    
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <br></br>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  label="Street Address"
                  name="streetAddress"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  SelectProps={{ native: true }}
                >
                  {usStates.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  name="zipcode"
                  error={!!errors.zipcode}
                  helperText={errors.zipcode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{borderRadius:'25px', fontSize:'unset'}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
