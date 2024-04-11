import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { Loader } from "../loader/Loader";

// Styled component for the card
const StyledCard = styled(Card)({
  maxWidth: 450,
  margin: 10,
  borderRadius: '5%'
});

// Styled component for the card content
const StyledCardContent = styled(CardContent)({
  height: 550,
  overflow: "hidden",
});

// Styled component for the card media
const StyledCardMedia = styled(CardMedia)({
  width: "42%",
  height: "50%",
  borderRadius: '5%'
});

function Shop({ onCardClick }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (book) => {
    navigate(`/bookdetail/${book.book_id}`, { state: { book } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          config.backendBaseUrl + "/api/book/getbooksbyfilter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filterBookId: null,
              filterTitle: null,
              filterISBN: null,
              filterAuthor: null,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBooks(data.data);
        } else {
          console.error("Failed to fetch books");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <Box mt={4}>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item key={book.book_id} style={{borderRadius: '5%'}}>
            <CardActionArea onClick={() => onCardClick(book)}>
              <StyledCard style={{borderRadius: '5%'}} >
                <StyledCardContent>
                <StyledCardMedia
                    component="img"
                    image={book.image_url}
                    alt={book.title}
                  />
                  <Typography variant="h6" gutterBottom style={{margin:'15px 0'}}>
                  <h3>{book.title}</h3>
                  </Typography>
                  <Typography variant="body1" color="textSecondary" style={{margin: '5px 0'}}>
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" style={{margin: '5px 0'}}>
                    ISBN: {book.ISBN}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" style={{margin: '5px 0'}}>
                    Price: ${book.price}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {book.description.substring(0, 100)}
                    {book.description.length > 100 && "..."}
                  </Typography>
                  {/* <Tooltip title={book.description} arrow>
                  <Typography variant="body2" component="p" color="primary" style={{ cursor: 'pointer' }}>
                    See more
                  </Typography>
                </Tooltip> */}
                </StyledCardContent>
              </StyledCard>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Shop;
