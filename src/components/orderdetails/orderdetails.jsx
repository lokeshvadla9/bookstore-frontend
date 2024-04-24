import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import config from '../../config';
import { Accordion, AccordionSummary,AccordionDetails } from '@mui/material/';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
      {orders && orders.map(order => 
        <Grid item xs={12} key={order.order_id}>
        <Card style={{border:'none', boxShadow:'none', backgroundColor:'inherit' , margin:'0 70px'}}>
          <CardContent>
            <Typography variant="h2" >Order ID# {order.order_id}</Typography>
            <Typography variant="body1" style={{fontSize:'1.5rem', marginTop:'10px'}}><b>Payment Type:</b> {order.payment_method}</Typography>
            <Typography variant="body1" style={{fontSize:'1.5rem'}}><b>Delivery Address: </b>{order.delivery_address}</Typography>
            <Typography variant="body1" style={{fontSize:'1.5rem'}}><b>Total Price:</b> ${order.total_price}</Typography>
            <Typography variant="body1" style={{fontSize:'1.5rem'}}><b>Order Date:</b> {formatDate(order.order_date)}</Typography>
            <Typography variant="body1" style={{fontSize:'1.5rem'}}><b>Order Status:</b> {order.order_status}</Typography>
            <Typography variant="subtitle2" style={{fontSize:'1.5rem', marginTop:'20px', marginBottom:'20px'}}><b>Items:</b></Typography>
            <div style={{ display: 'flex', overflowX: 'auto'}}>
              {JSON.parse(order.items).map(item => (
                <div key={item.item_name} style={{ marginRight: '10px' }}>
                  <img src={item.item_image_url} alt={item.item_name} style={{ margin:'0 5px', maxWidth: '400px', height:'500px'}} />
                  <Typography variant="body2" style={{fontSize:'1.5rem', fontWeight:'700', margin:'20px 3px'}}>
                    {item.item_name} - ${item.unit_price} x {item.quantity}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
            </Grid>
      )}
    </Grid>
  );
};

export default OrderDetails;
