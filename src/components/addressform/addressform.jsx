// AddressForm.js

import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { FormControlLabel, Checkbox, Grid, FormLabel, OutlinedInput,FormHelperText } from '@mui/material';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const AddressForm = React.forwardRef(({ id, onSubmit }, ref) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [errors, setErrors] = useState({});

  const formRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  useEffect(() => {
    if (ref) {
      ref.current = {
        dispatchSubmitEvent: () => {
          const event = new Event('submit', { bubbles: true, cancelable: true });
          formRef.current.dispatchEvent(event);
        },
      };
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hitting handleSubmit');
    var isValidate=validateForm();
    if(isValidate)
      onSubmit(formData);
    else
      onSubmit(null);
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      switch (key) {


        case 'firstName':
        case 'lastName':
        case 'address1':
        case 'address2':
        case 'city':
        case 'country':

          if (!value.trim()) {
            newErrors[key] = key + ' ' + 'should not be empty';
          }
          else {
            delete newErrors[key];
          }
          break;
        case 'state':
          if(value.length!=2)
          {
            newErrors[key]='Pls give 2 letters of state'
          }
          else{
            delete newErrors[key];
          }
          break;
        case 'zip':
          if(value.length!=5||isNaN(value))
          {
            newErrors[key]='Invalid Zipcode'
          }
          else{
            delete newErrors[key];
          }
          break;
        default:
          break;

      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length==0?true:false;
    
    
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName ? true : false}
          />
          <FormHelperText id="helper_text_firstName" sx={{ color: errors.firstName ? 'red' : 'initial' }}>
              {errors.firstName ? errors.firstName:''}
          </FormHelperText>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName ? true : false}
          />
          <FormHelperText id="helper_text_lastName" sx={{ color: errors.lastName ? 'red' : 'initial' }}>
              {errors.lastName ? errors.lastName:''}
          </FormHelperText>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address1" required>
            Address line 1
          </FormLabel>
          <OutlinedInput
            id="address1"
            name="address1"
            type="text"
            value={formData.address1}
            onChange={handleInputChange}
            error={errors.address1 ? true : false}
          />
          <FormHelperText id="helper_text_address1" sx={{ color: errors.address1 ? 'red' : 'initial' }}>
              {errors.address1 ? errors.address1:''}
          </FormHelperText>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address2">Address line 2</FormLabel>
          <OutlinedInput
            id="address2"
            name="address2"
            type="text"
            value={formData.address2}
            onChange={handleInputChange}
            error={errors.address2 ? true : false}
          />
          <FormHelperText id="helper_text_address2" sx={{ color: errors.address2 ? 'red' : 'initial' }}>
              {errors.address2 ? errors.address2:''}
          </FormHelperText>
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            error={errors.city ? true : false}
          />
          <FormHelperText id="helper_text_city" sx={{ color: errors.city ? 'red' : 'initial' }}>
              {errors.city ? errors.city:''}
          </FormHelperText>
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="state" required>
            State
          </FormLabel>
          <OutlinedInput
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleInputChange}
            error={errors.state ? true : false}
          />
          <FormHelperText id="helper_text_state" sx={{ color: errors.state ? 'red' : 'initial' }}>
              {errors.state ? errors.state:''}
          </FormHelperText>
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            type="text"
            value={formData.zip}
            onChange={handleInputChange}
            error={errors.zip ? true : false}
          />
          <FormHelperText id="helper_text_zipcode" sx={{ color: errors.zip ? 'red' : 'initial' }}>
              {errors.zip ? errors.zip:''}
          </FormHelperText>
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleInputChange}
            error={errors.country ? true : false}
          />
          <FormHelperText id="helper_text_country" sx={{ color: errors.country ? 'red' : 'initial' }}>
              {errors.country ? errors.country:''}
          </FormHelperText>
        </FormGrid>
      </Grid>
    </form>
  );
});

export default AddressForm;
