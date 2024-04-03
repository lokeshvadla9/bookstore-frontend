import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, Grid,IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ cart,userData,setCart}) {
  const navigate=useNavigate();
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleDeleteItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const handleProceedToCheckout = (cart,totalPrice) => {
     navigate('/checkout',{state:{cart:cart,totalPrice:totalPrice,userData:userData}});
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Cart</Typography>
      {cart.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
        <ShoppingCartIcon fontSize="large" color="disabled" sx={{ fontSize: 80 }} />
        <Typography variant="body1" sx={{ mt: 2 }}>Cart is empty</Typography>
      </Box>
      ) : (
        <React.Fragment>
          <List>
            {cart.map((item) => (
              <React.Fragment key={item.book_id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.title} src={item.image_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2">Price: ${item.price}</Typography>
                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                      </React.Fragment>
                    }
                  />
                  <IconButton edge="end" onClick={() => handleDeleteItem(item)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          <Box mt={2}>
            <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
          </Box>
          <Box mt={2}>
            <Grid container justifyContent="flex-end">
                <Button variant="contained" color="primary"  sx={{ marginRight: 2 }} onClick={()=>handleProceedToCheckout(cart,totalPrice)}>
                  Proceed to Checkout
                </Button>
            </Grid>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default Cart;
