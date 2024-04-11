import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import config from '../../config';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/book/getallorders');
      const data = await response.json();
      if (data.status === 'success') {
        // Ensure that the data array contains the orders
        const ordersData = Array.isArray(data.data[0]) ? data.data[0] : [];
        setOrders(ordersData);
      } else {
        console.error('Failed to fetch orders:', data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/book/createorupdateorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          order_id:order['Order Id'],
          customer_id:null,
          delivery_address:null,
          total_price:null,
          order_status:newStatus,
          payment_method:null,
          is_deleted:0
         })
      });
      const data = await response.json();
      if (data.status === 'success') {
        // Refresh orders data
        fetchOrders();
      } else {
        console.error('Failed to update order status:', data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', borderRadius: '5px', marginTop:'7%' }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <TableContainer component={Paper} style={{borderRadius:'25px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="Orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">Order By</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Delivery Address</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order['Order Id']}>
                <TableCell component="th" scope="row">
                  {order['Order Id']}
                </TableCell>
                <TableCell align="right">{order['Customer Name']}</TableCell>
                <TableCell align="right">{order['Order Date']}</TableCell>
                <TableCell align="right">{order['Delivery Address']}</TableCell>
                <TableCell align="right">${order['Total Price']}</TableCell>
                <TableCell align="right">{order['Order Status']}</TableCell>
                <TableCell align="right">{order['Payment Method']}</TableCell>
                <TableCell align="right">
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {JSON.parse(order.Items).map((item, index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>
                        Book ID: {item['Book Id']}, Quantity: {item.Quantity}, Unit Price: ${item['Unit Price']}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell align="right">
                  <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                    label={'status'}
                      value={order['Order Status']}
                      style={{borderRadius:'25px'}}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Dispatched">Dispatched</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersPage;
