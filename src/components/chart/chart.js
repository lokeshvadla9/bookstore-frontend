import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Typography from '@mui/material/Typography';

function Chart() {
  const theme = useTheme();
  const [salesData, setSalesData] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:4000/api/book/getlast7dayssales')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setSalesData(data.data);
        } else {
          console.error('Failed to fetch sales data:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  const formattedData = salesData.map(sale => ({
    time: new Date(sale.sale_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    amount: sale.total_sales
  }));

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Last 7 Days Sales</Typography>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={formattedData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: Math.max(...formattedData.map(d => d.amount), 2500), // Set max value dynamically
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default Chart;
