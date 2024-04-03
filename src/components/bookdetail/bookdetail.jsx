import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';

const BookDetail = ({ book, onAddToCart }) => {
    console.log(book)
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCartClick = () => {
        console.log(quantity);
        onAddToCart(book,quantity);
      };  
  return (
    <Card style={{ display: 'flex', margin: '25px' }}>
      <CardMedia
        component="img"
        style={{ width: '200px', height: '300px' }}
        image={book.image_url}
        title={book.title}
      />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
        <CardContent>
          <Typography variant="h5">{book.title}</Typography>
          <Typography variant="subtitle1">{book.author}</Typography>
          <Typography variant="body2" color="textSecondary">{book.description}</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <FormControl style={{ marginTop: '16px', minWidth: '120px' }}>
                <InputLabel id="quantity-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-label"
                  id="quantity-select"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {[...Array(10).keys()].map((value) => (
                    <MenuItem key={value + 1} value={value + 1}>{value + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={handleAddToCartClick}>Add to Cart</Button>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default BookDetail;
