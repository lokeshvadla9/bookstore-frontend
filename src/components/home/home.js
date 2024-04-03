// src/HomePage.js
import './home.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import {
  AppBar,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Logo,
} from '@mui/material';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/books.json'); // Assuming books.json is in the public folder
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <Carousel className="custom-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://bkstoreimages.blob.core.windows.net/websiteimages/1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://bkstoreimages.blob.core.windows.net/websiteimages/2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://bkstoreimages.blob.core.windows.net/websiteimages/3.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://bkstoreimages.blob.core.windows.net/websiteimages/4.jpg"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://bkstoreimages.blob.core.windows.net/websiteimages/5.jpg"
            alt="Fifth slide"
          />
        </Carousel.Item>
      </Carousel>

      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome!!!
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Explore a wide range of books in various genres
        </Typography>
        <Grid container justifyContent="center">
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            size="large"
          >
            Explore Store
          </Button>
        </Grid>
      </Container>

      {/* Featured Books */}
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Featured Books
        </Typography>
        <br></br>
        <Grid container spacing={2}>
        <Container>
        <Grid container spacing={2}>
          {books.map((book, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={book.image_url}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
        </Grid>
      </Container>
    </div>
  );
}
export default Home

