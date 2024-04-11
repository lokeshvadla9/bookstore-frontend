import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Chart from '../chart/chart';
import Deposits from '../deposits/deposits';
import Orders from '../orders/orders';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              borderRadius:'25px'
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              borderRadius:'25px'
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',borderRadius:'25px' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
