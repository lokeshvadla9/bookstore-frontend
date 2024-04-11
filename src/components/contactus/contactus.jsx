import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const ContactUs = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Reset error state on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { ...errors };

    // Validate form fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true;
        hasErrors = true;
      }
    });

    // Validate email field
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(config.backendBaseUrl+'/api/users/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      setSuccessMessage(responseData.message);
      setErrorMessage('');
      alert('We received your query. Our admin will get in touch with you shortly.');
      navigate('/');

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '75vh', marginTop:'10%' }}
    >
      <Grid container justifyContent="center" sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>Contact Us</Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                helperText={errors.name ? 'Name is required' : ''}
              />
            </Box>
            <Box mb={2}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                helperText={errors.email ? 'Please enter a valid email address' : ''}
              />
            </Box>
            <Box mb={2}>
              <TextField
                name="subject"
                label="Subject"
                fullWidth
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                required
                helperText={errors.subject ? 'Subject is required' : ''}
              />
            </Box>
            <Box mb={2}>
              <TextField
                name="message"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
                helperText={errors.message ? 'Message is required' : ''}
              />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Button type="submit" style={{borderRadius:'25px',padding:'10px 30px'}} variant="contained" color="primary">Submit</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
