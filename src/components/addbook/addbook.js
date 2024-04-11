import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { BlobServiceClient} from '@azure/storage-blob';
import config from '../../config';
import Swal from 'sweetalert2';

const categories = [
    { "category_id": 1, "category_name": "Textbooks" },
    { "category_id": 2, "category_name": "Academic Reference" },
    { "category_id": 3, "category_name": "Course Materials" },
    { "category_id": 4, "category_name": "Study Guides" },
    { "category_id": 5, "category_name": "Research Journals" },
    { "category_id": 6, "category_name": "Academic Writing" },
    { "category_id": 7, "category_name": "Research Methodology" },
    { "category_id": 8, "category_name": "Scientific Publications" },
    { "category_id": 9, "category_name": "Engineering" },
    { "category_id": 10, "category_name": "Mathematics" },
    { "category_id": 11, "category_name": "Computer Science" },
    { "category_id": 12, "category_name": "Humanities" },
    { "category_id": 13, "category_name": "Social Sciences" },
    { "category_id": 14, "category_name": "Business Studies" },
    { "category_id": 15, "category_name": "Law" },
    { "category_id": 16, "category_name": "Medicine" },
    { "category_id": 17, "category_name": "Psychology" },
    { "category_id": 18, "category_name": "Education" },
    { "category_id": 19, "category_name": "Arts & Literature" },
    { "category_id": 20, "category_name": "Languages" }
  ];



function AddBook() {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
    quantity: '',
    description: '',
    publicationYear: '',
    isbn: '',
    image: null
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  setBookData({ ...bookData, [name]: value });
  setErrors({ ...errors, [name]: '' });
}

const handleImageChange = (e) => {
    setBookData({ ...bookData, image: e.target.files[0], imageName: e.target.files[0].name });
  };

  const validateForm = () => {
    let newErrors = {  };
    // Perform validations for each field
  Object.keys(bookData).forEach((key) => {
    console.log(key,bookData[key]);
    const value = bookData[key];
    switch (key) {
      case 'title':
      case 'author':
      case 'description':
        // Title, author, and description are mandatory fields
        if (!value.trim()) {
            newErrors[key] = 'This field is required';
        } else {
          delete newErrors[key];
        }
        break;
      case 'price':
        // Price should be a number
        if (!value.trim() || isNaN(value)) {
            newErrors[key] = 'Price must be a number';
        } else {
          delete newErrors[key];
        }
        break;
      case 'quantity':
        // Quantity should be an integer
        if (!value.trim() || !Number.isInteger(Number(value))) {
            newErrors[key] = 'Quantity must be an integer';
        } else {
          delete newErrors[key];
        }
        break;
      case 'isbn':
        // ISBN should have 10 or 13 digits
        if (!/^\d{10}$/.test(value) && !/^\d{13}$/.test(value)) {
            newErrors[key] = 'ISBN must have 10 or 13 digits';
        } else {
          delete newErrors[key];
        }
        break;
        
    case 'image':
        if (!value) {
            newErrors[key]='Please select an image';
          }else {
            delete newErrors[key];
          }
        break;
      default:
        break;
    }
  });
  
  setErrors(newErrors);
  };

  const uploadImageToAzureBlobStorage = async (imageFile) => {
    
    const blobServiceClient = BlobServiceClient.fromConnectionString(config.blob_connectionString);
    const containerClient = blobServiceClient.getContainerClient(config.blob_container_name);
    const blobName = `${Date.now()}-${imageFile.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(imageFile);  
    return blockBlobClient.url;
  };
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    if (Object.keys(errors).length===0) {
      try {
        const imageUrl = await uploadImageToAzureBlobStorage(bookData.image);
        const response = await fetch(config.backendBaseUrl + '/api/book/register-or-updatebook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              book_id:-1,
              title: bookData['title'],
              author: bookData['author'],
              fk_category_id: bookData['category'],
              description: bookData['description'],
              price:bookData['price'],
              quantity_available:bookData['quantity'],
              publiction_year:bookData['publicationYear'],
              ISBN:bookData['isbn'],
              image_url:imageUrl
              
              
            })
          });
          
          if (response.ok) {
              const responseData= await response.json();
              if(responseData.status==='success')
              {
                  Swal.fire({
                      icon: 'success',
                      title: 'Added Successful',
                      text: responseData.message,
                    }).then(() => {
                        setBookData(
                            {
                                title: '',
                                author: '',
                                category: '',
                                price: '',
                                quantity: '',
                                description: '',
                                publicationYear: '',
                                isbn: '',
                                image_url: '',
                                image:null
                              }
                        );
                    });
              }
              else{
                  Swal.fire({
                      icon: 'error',
                      title: 'Something Went Wrong',
                      text: responseData.message,
                    });
              }
            // Redirect or perform any other action upon successful registration
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Registration Failed',
                  text: 'Failed to register user',
                });
          }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    years.push(i);
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: '7%', marginBottom:'5%' }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Add Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={bookData.title}
              onChange={handleInputChange}
              error={errors.title ? true : false}
              helperText={errors.title}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={bookData.category}
                onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={bookData.author}
              onChange={handleInputChange}
              error={errors.author ? true : false}
              helperText={errors.author}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={bookData.price}
              onChange={handleInputChange}
              error={errors.price ? true : false}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={bookData.quantity}
              onChange={handleInputChange}
              error={errors.quantity ? true : false}
              helperText={errors.quantity}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={bookData.description}
              onChange={handleInputChange}
              error={errors.description ? true : false}
              helperText={errors.description}

            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="publication-year-label">Publication Year</InputLabel>
              <Select
                labelId="publication-year-label"
                id="publication-year-select"
                value={bookData.publicationYear}
                onChange={(e) => setBookData({ ...bookData, publicationYear: e.target.value })}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={bookData.isbn}
              onChange={handleInputChange}
              error={errors.isbn ? true : false}
              helperText={errors.isbn}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Image Name"
              name="imageName"
              value={bookData.imageName || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            {errors.image && (
                <Typography variant="caption" color="error">
                    {errors.image}
                </Typography>
             )}
          </Grid>
          <Grid item xs={6}>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="contained-button-file">
              <Button variant="outlined" component="span" style={{borderRadius:'25px', padding:'15px 70px'}}>
                Choose Image
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{borderRadius:'25px', padding:'15px 25px'}}
            >
              Add Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
export default AddBook;
