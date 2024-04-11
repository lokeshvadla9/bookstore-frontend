import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import config from '../../config';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(config.backendBaseUrl + '/api/book/getallorders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.data[0].slice(0, 5)); // Fetch recent 5 orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Orders</Typography>
      <Table size="small" style={{borderRadius:'25px'}}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 && orders.map((row) => (
            <TableRow key={row['Order Id']}>
              <TableCell>{row['Order Date']}</TableCell>
              <TableCell>{row['Customer Name']}</TableCell>
              <TableCell>{row['Delivery Address']}</TableCell>
              <TableCell>{row['Payment Method']}</TableCell>
              <TableCell align="right">{`$${row['Total Price']}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export default Orders;
