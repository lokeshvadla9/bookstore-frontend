import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation} from 'react-router-dom';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import AddressForm from '../addressform';
import PaymentForm from '../paymentform';
import Review from '../review';
import Info from '../info';
import InfoMobile from '../infomobile';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const logoStyle = {
  width: '140px',
  height: '56px',
  marginLeft: '-4px',
  marginRight: '-8px',
};



export default function Checkout() {
  const navigate=useNavigate();
  const location= useLocation();
  const userData=location.state.userData;
  const cart=location.state.cart;
  const totalPrice=location.state.totalPrice;
  const tax=totalPrice*0.0825;
  var total_n_tax=totalPrice+tax
  total_n_tax=total_n_tax.toFixed(2);
  const[orderId,setOrderId]=React.useState(' ');
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressData,setAddressData]=React.useState(null);
  const [paymentData,setPaymentData]=React.useState(null);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm ref={formRef}  onSubmit={handleAddressFormSubmit}/>;
      case 1:
        return <PaymentForm ref={paymentRef} onSubmit={handlePaymentFormSubmit}/>;
      case 2:
        return <Review cart={cart} totalPrice={totalPrice} tax={tax} total_n_tax={total_n_tax} addressInfo={addressData} paymentInfo={paymentData}/>;
      default:
        throw new Error('Unknown step');
    }
  };

  const handlePaymentFormSubmit=(formData) =>{
      setPaymentData(formData);
  };

  const handleAddressFormSubmit = (formData) => {
      setAddressData(formData);     
  };
  const formRef = useRef(null);
  const paymentRef=useRef(null);

  function getLastFourDigits(cardNumber) {
    const digitsOnly = cardNumber.replace(/\D/g, '');
    const lastFourDigits = digitsOnly.slice(-4);
    return lastFourDigits;
  }

  const handlegoto=()=>{
    navigate('/customerhome',{ state: { userData: userData } });
  }



  const handleNext = async() => {
    if(activeStep==0)
    {   
      formRef.current.dispatchSubmitEvent();
      if(addressData!=null)
        setActiveStep(activeStep + 1);
    } 
    else if(activeStep==1)
    {
      paymentRef.current.dispatchSubmitEvent();
      if(paymentData!=null)
        setActiveStep(activeStep + 1);
    }
    else if(activeStep==2){
      let paymentType=paymentData.paymentType=='creditCard'?('Credit Card-'+'XXXX'+getLastFourDigits(paymentData.cardNumber)):'Bank Transfer'
      const orderDetails=cart.map(item => ({
        book_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      }));
      try {
        const response = await fetch(config.backendBaseUrl+'/api/book/createorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: userData.customer_id,
            delivery_address: [addressData.address1,addressData.address2,addressData.city,addressData.state,addressData.zip,addressData.country].join(', '),
            total_price: total_n_tax,
            payment_method: paymentType,
            order_status: 'Pending',
            order_details:orderDetails ,
          }),
        });
      
        if (!response.ok) {
          throw new Error('Failed to create order. Please try again later.');
        }
      
        const responseData = await response.json();
        
        if (responseData.status === 'success' && responseData && responseData.order_id) {
          setOrderId(responseData.order_id);
          setActiveStep(activeStep + 1);
        } else {
          throw new Error('Failed to create order. Please try again later.');
        }
      } catch (error) {
        console.error('Error creating order:', error);
        alert('Failed to create order. Please try again later.');
      }
      

    }
        
  };

  const handleBack = () => {
    if(activeStep==1)
        setAddressData(null);
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid container marginTop={10} style={{padding:'0.5% 20% 5% 20%'}}>
      <Grid item xs={12} sm={5} lg={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: '1px solid divider',
            padding: 4,
            height: '100%',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Info totalPrice={activeStep >= 2 ? '$'+total_n_tax : '$'+totalPrice} cart={cart} />
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none', marginTop:'20%' } }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? '$'+total_n_tax : '$'+totalPrice}
                </Typography>
              </CardContent>
            </Card>
            <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
          </Box>
        </Box>
      </Grid>
      <Grid item sm={12} md={7} lg={8} marginTop={10} sx={{maxWidth: { xs: '100%', sm: '80%', md: '70%', lg: '60%' }, marginTop: 10}}>
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Stack spacing={2} useFlexGap>
              <Typography variant="h1">📦</Typography>
              <Typography variant="h5">Thank you for your order!</Typography>
              <Typography variant="body1">
                Your order number is <strong>{'#'+orderId}</strong>. We  will update you once it's shipped.
              </Typography>
              <Button variant="contained" onClick={handlegoto}>Go to home</Button>
            </Stack>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end', mt: 2 }}>
                {activeStep !== 0 && (
                  <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="text">
                    Previous
                  </Button>
                )}
                <Button
                  variant="contained"
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={handleNext}
                  style={{borderRadius:'25px', padding:'15px 25px'}}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
      <Box  sx={{ height:'100px', width:'70%' }}></Box>
    </Grid>
    
  );
}

