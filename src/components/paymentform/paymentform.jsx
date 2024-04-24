import * as React from 'react';
import { useState,useEffect,formRef } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { FormHelperText } from '@mui/material';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { styled } from '@mui/system';
import { validateDate } from '@mui/x-date-pickers/internals';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

 const PaymentForm=React.forwardRef(({ id, onSubmit }, ref) => {
  const [cardHolderName,setCardHolderName]=React.useState('')
  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const formRef = React.useRef(null);
  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
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
  const [errors, setErrors] = useState({});
  const handleSubmit=(e) => {
    e.preventDefault();
    var isValidate=validateForm();
    if(isValidate)
      onSubmit({
        'paymentType':paymentType,
        'cardNumber':cardNumber,
        'cvv':cvv,
        'expirationDate':expirationDate,
        'cardHolderName':cardHolderName
      });
    else
      onSubmit(null);
  };

  const validateForm=()=>{
    let newErrors={};
    if(paymentType=='bankTransfer')
        return true;

    const strippedCardNumber = cardNumber.replace(/\s/g, '');
    const cardValid = /^\d{16}$/.test(strippedCardNumber);
    if(!cardValid){
      newErrors['cardNumber']='Card Number must be 16 digits number';
    }
    else{
      delete newErrors['cardNumber'];
    }

    if(cvv.length!=3 || isNaN(cvv) || !cvv.trim())
      newErrors['cvv']='CVV must be 3 digits number'
    else
      delete newErrors['cvv'];

    if(!validateExpirationDate(expirationDate))
      newErrors['expirationDate']='Invalid Date';
    else
      delete newErrors['expirationDate'];

    if(!cardHolderName.trim())
      newErrors['cardHolderName']='Name should not be empty'
    else
      delete newErrors['cardHolderName']
    
    setErrors(newErrors);
    return Object.keys(newErrors).length==0;
  };

  const validateExpirationDate=(dateString)=>
  {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(dateString)) {
      return false;
    }
    console.log(dateString);
    const [month, year] = dateString.split('/');
    console.log(month,year,dateString);
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);
    console.log(monthNumber, yearNumber);
    if (monthNumber < 1 || monthNumber > 12) {
      return false;
    }
    const currentYear = new Date().getFullYear() % 100;
    console.log(currentYear)
    if (yearNumber < currentYear || yearNumber > 99) {
      return false;
    }
    return true;
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
    setErrors({ ...errors, [event.target.name]: '' });
  };
  const handleCardNumberChange = (event) => {
    
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    console.log(value);
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    console.log(formattedValue);
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }else{
      setErrors({ ...errors, [event.target.name]: '' });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            flexDirection: { sm: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === 'creditCard'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'creditCard' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'creditCard' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('creditCard')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === 'bankTransfer'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'bankTransfer' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'bankTransfer' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('bankTransfer')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Bank account</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === 'creditCard' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: '100%',
              borderRadius: '20px',
              border: '1px solid ',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'text.secondary',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  name="cardNumber"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  error={errors.cardNumber?true:false}
                />
                <FormHelperText id="helper_text_cardNumber" sx={{ color: errors.cardNumber ? 'red' : 'initial' }}>
              {errors.cardNumber ? errors.cardNumber:''}
          </FormHelperText>
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  name="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                  error={errors.cvv?true:false}
                />
                <FormHelperText id="helper_text_cvv" sx={{ color: errors.cvv ? 'red' : 'initial' }}>
              {errors.cvv ? errors.cvv:''}
          </FormHelperText>
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Name
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  name="cardHolderName"
                  autoComplete="card-name"
                  placeholder="John Smith"
                  value={cardHolderName}
                  onChange={handleCardHolderNameChange}
                  required
                  error={errors.cardHolderName?true:false}
                />
                <FormHelperText id="helper_text_cardHolderName" sx={{ color: errors.cardHolderName ? 'red' : 'initial' }}>
              {errors.cardHolderName ? errors.cardHolderName:''}
          </FormHelperText>
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  name="expirationDate"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  error={errors.expirationDate?true:false}
                />
                <FormHelperText id="helper_text_expirationDate" sx={{ color: errors.expirationDate ? 'red' : 'initial' }}>
              {errors.expirationDate ? errors.expirationDate:''}
          </FormHelperText>
              </FormGrid>
            </Box>
          </Box>
        </Box>
      )}

      {paymentType === 'bankTransfer' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Your order will be processed once we receive the funds.
          </Alert>
          <Typography variant="subtitle1" fontWeight="medium">
            Bank account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please transfer the payment to the bank account details shown below.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Bank:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              Mastercredit
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Account number:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              123456789
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Routing number:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              987654321
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
    </form>
  );
});

export default PaymentForm;