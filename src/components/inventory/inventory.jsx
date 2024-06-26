import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem,Box,Tooltip} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const Inventory = ({ onAddBookClick }) => {
    const navigate=useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(config.backendBaseUrl + '/api/book/getbooksbyfilter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filterBookId: null,
          filterTitle: null,
          filterISBN: null,
          filterAuthor: null
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
  
      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setOpenUpdateDialog(true);
  };

  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setOpenDeleteDialog(true);
  };

  const handleUpdateBook = async () => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/book/register-or-updatebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            book_id:selectedBook.book_id,
            title: selectedBook.title,
            author: selectedBook.author,
            fk_category_id: selectedBook.fk_category_id,
            description: selectedBook.description,
            price:selectedBook.price,
            quantity_available:selectedBook.quantity_available,
            publiction_year:selectedBook.publiction_year,
            ISBN:selectedBook.ISBN,
            image_url:selectedBook.image_url,
            is_deleted:0
        
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      setOpenUpdateDialog(false);
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleAddBookClick = () => {
    // Open AddBook component in a new tab
    window.open('/addbook', '_blank');
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/book/register-or-updatebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id:selectedBook.book_id,
            title: selectedBook.title,
            author: selectedBook.author,
            fk_category_id: selectedBook.fk_category_id,
            description: selectedBook.description,
            price:selectedBook.price,
            quantity_available:selectedBook.quantity_available,
            publiction_year:selectedBook.publiction_year,
            ISBN:selectedBook.ISBN,
            image_url:selectedBook.image_url,
            is_deleted:1 }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      setOpenDeleteDialog(false);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    years.push(i);
  }

  return (
    <Box sx={{ padding: '20px', marginTop:'3%' }}>
      <Typography variant="h4" gutterBottom>Inventory</Typography>
        <Button variant="contained" onClick={handleAddBookClick} style={{ float: 'right', padding:'10px 20px', borderRadius:'25px'}}>Add Book</Button>
    <Grid container spacing={2}>
      {books && books.map((book) => (
        <Grid item key={book.book_id}>
          <Card style={{ maxWidth: 305, margin: 10, boxShadow:'none', border:'none', backgroundColor:'inherit'}}>
            <CardContent style={{ height: 605, overflow: 'hidden' }}>
              <Typography variant="h6" gutterBottom>
                {book.title}
              </Typography>
              <img src={book.image_url} alt={book.title} style={{ width: '100%', height: '60%', marginTop: 10, borderRadius:'5%' }} />
              <Typography variant="body1" color="textSecondary" style={{marginTop:'5px'}} >
                Author: {book.author}
              </Typography>
              <Typography variant="body1" color="textSecondary" >
                ISBN: {book.ISBN}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{marginBottom:'5px'}}>
                Price: ${book.price}
              </Typography>
              <Typography  style={{marginTop:'5px'}}variant="body2" component="p">
                {book.description.substring(0, 100)}
                {book.description.length > 100 && '...'}
              </Typography>
              <Tooltip title={book.description} arrow>
                <Typography variant="body2" component="p" color="primary" style={{ cursor: 'pointer' }}>
                  See more
                </Typography>
              </Tooltip>
              <div style={{marginBottom:'20px'}}>
              <IconButton style={{width: '50%', color:'black', fontSize:'large'}} aria-label="edit" onClick={() => handleEditBook(book)}>
                <EditIcon />Edit
              </IconButton>
              <IconButton style={{width: '50%', color:'red', fontSize:'large'}} aria-label="delete" onClick={() => handleDeleteBook(book)}>
                <DeleteIcon /> Delete
              </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}

<Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={selectedBook ? selectedBook.title : ''}
            onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            value={selectedBook ? selectedBook.author : ''}
            onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={selectedBook ? selectedBook.price : ''}
            onChange={(e) => setSelectedBook({ ...selectedBook, price: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity Available"
            value={selectedBook ? selectedBook.quantity_available : ''}
            onChange={(e) => setSelectedBook({ ...selectedBook, quantity_available: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={selectedBook ? selectedBook.description : ''}
            onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ISBN"
            value={selectedBook ? selectedBook.ISBN : ''}
            onChange={(e) => setSelectedBook({ ...selectedBook, ISBN: e.target.value })}
            fullWidth
            margin="normal"
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateBook} color="primary">
            Update
          </Button>
          <Button onClick={() => setOpenUpdateDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this book?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmed} color="primary">
            Confirm
          </Button>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    </Box>
  );
};

export default Inventory;
