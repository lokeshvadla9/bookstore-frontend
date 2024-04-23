import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import config from '../../config';

const OrderDetails = ({customer_id}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(config.backendBaseUrl+'/api/book/getordersbycustomerid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ customer_id: customer_id })
        });
        const data = await response.json();
        if (data.status === 'success') {
          setOrders(data.data); 
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // Call only once when component mounts

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <Grid container spacing={2} marginTop={5}>
      {orders && orders.map(order => (
        <Grid item xs={12} key={order.order_id}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order ID: {order.order_id}</Typography>
              <Typography variant="subtitle1">Payment Type: {order.payment_method}</Typography>
              <Typography variant="body1">Delivery Address: {order.delivery_address}</Typography>
              <Typography variant="body1">Total Price: ${order.total_price}</Typography>
              <Typography variant="body1">Order Date: {formatDate(order.order_date)}</Typography>
              <Typography variant="body1">Order Status: {order.order_status}</Typography>
              <Typography variant="subtitle2">Items:</Typography>
              <div style={{ display: 'flex', overflowX: 'auto' }}>
                {JSON.parse(order.items).map(item => (
                  <div key={item.item_name} style={{ marginRight: '10px' }}>
                    <Typography variant="body2">
                      {item.item_name} - ${item.unit_price}
                    </Typography>
                    <img src={item.item_image_url} alt={item.item_name} style={{ maxWidth: '100px' }} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderDetails;
