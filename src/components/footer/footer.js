import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://uta.edu/">
        Uinversity of Texas at Arlington
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
            bottom:0,
            left:0,
            position:'relative',
            width:'100%',
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              UTA Bookstore Information
            </Typography>
            <Copyright />
          </Container>
        </Box>
        
      
    </ThemeProvider>
  );
}
export default Footer;