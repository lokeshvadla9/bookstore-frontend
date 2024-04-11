import * as React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import config from '../../config';
import Swal from 'sweetalert2';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://uta.edu/">
        UTA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login({ setIsLoggedIn }) {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);




  const handleSubmit = async (event) => {
    console.log(email,password);
    event.preventDefault();
    
    // Reset error states
    setEmailError(false);
    setPasswordError(false);

    // Validate email format
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError(true);
      return;
    }

    try {
      const response = await fetch(config.backendBaseUrl+'/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        
        // Login successful
        const data = await response.json();
        if(data.status==='success')
        {
          setIsLoggedIn(true);
          if(email==='admin@uta.com')
          {
            localStorage.setItem('userId',data.data.customer_id);
            navigate('/admindashboard');
          }
            
          else{
            localStorage.setItem('userId',data.data.customer_id);
            navigate('/customerhome',{ state: { userData: data.data } });
          }

        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password. Please try again.',
          });
        }
        

        
      } else {
        // Login failed
        console.error('Login failed');

        // Show SweetAlert for login failure
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
      });
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://bkstoreimages.blob.core.windows.net/websiteimages/6.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <br></br>
            <br></br>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main',alignSelf: 'center'  }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? 'Invalid email format' : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? 'Password is required' : ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{borderRadius:'25px', fontSize:'unset'}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Login