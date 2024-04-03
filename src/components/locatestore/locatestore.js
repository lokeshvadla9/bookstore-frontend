import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const LocateStore = () => {
  const API_KEY = "AIzaSyDcafy9k0FgeeOsLyAd3x4_DaKfajExTmk";
  const storeLocation = { lat: 32.733441150184845, lng: -97.10955426227687 };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 20, mb: 8 }}  > 
      <Box width="100%">
        <Typography variant="h2" gutterBottom>
          Store Location
        </Typography>
        <Grid container spacing={8} columns={16} sx={{ ml: { xs: 0, md: 2 } }} >
          <Grid item xs={6} md={8}> 
            <LoadScript googleMapsApiKey={API_KEY}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }} // Removed inline width for better responsiveness
                center={storeLocation}
                zoom={16}
              >
                <Marker position={storeLocation}/>
              </GoogleMap>
            </LoadScript>
          </Grid>
          <Grid item xs={6} md={8}> 
            <Box>
              <Typography variant="h4" gutterBottom>
                Store Address
              </Typography>
              <Typography variant="body1">400 Spaniolo Dr, </Typography>
              <Typography variant="body1">Arlington, TX 76010</Typography>
              <br></br>
              <Typography variant="h4" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1">Phone: +18172722785</Typography>
              <Typography variant="body1">Email: info@utabookstore.com</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>

  );
};

export default LocateStore;
