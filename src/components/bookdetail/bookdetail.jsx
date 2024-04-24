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
    <Card style={{ display: 'flex', margin: '100px 225px', minWidth: '800px', border:'none', boxShadow:'none', backgroundColor:'inherit'}}>
      <CardMedia
        component="img"
        style={{ width: '300px', height: '400px' }}
        image={book.image_url}
        title={book.title}
      />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
        <CardContent style={{height:'600px', border:'none'}}>
          <Typography variant="h5" style={{fontSize:50, lineClamp:1, textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp: 2,WebkitBoxOrient:'vertical', overflow:'hidden'}}>{book.title}</Typography>
          <Typography variant="h6" style={{fontSize:30}}>{book.author}</Typography>
          <Typography variant="subtitle2" style={{fontSize:20}}>ISBN: {book.ISBN}</Typography>
          <Typography variant="subtitle2" style={{fontStyle:'italic', fontSize:20}}>Price: ${book.price}</Typography>
          <Typography variant="body" style={{textOverflow:'ellipsis', marginTop:'30px',display:'-webkit-box', WebkitLineClamp: 8,WebkitBoxOrient:'vertical', overflow:'hidden'}} color="textSecondary">{book.description}</Typography>
          <Grid container spacing={2} alignItems="center" style={{marginTop:'50px', display:'block'}}>
    
            
            <FormControl style={{ minWidth: '120px', float:'right'}}>
                <InputLabel id="quantity-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-label"
                  id="quantity-select"
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{borderRadius:'25px'}}
                  label={'Quantity'}
                >
                  {[...Array(10).keys()].map((value) => (
                    <MenuItem key={value + 1} value={value + 1}>{value + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button style={{borderRadius:'25px', padding:'15px 15px', float:'right', margin:'0 10px'}} variant="contained" color="primary" onClick={handleAddToCartClick}>Add to Cart</Button>

          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default BookDetail;
