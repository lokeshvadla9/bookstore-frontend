import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



export default function Review({cart,totalPrice,tax,total_n_tax,addressInfo,paymentInfo}) {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary={cart.length+"selected"} />
          <Typography variant="body2">{'$'+totalPrice}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="+ 8.25% tax" />
          <Typography variant="body2">{'$'+tax}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {'$'+total_n_tax}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{addressInfo.firstName+' '+addressInfo.lastName}</Typography>
          <Typography color="text.secondary" gutterBottom>
            {[addressInfo.address1,addressInfo.address2,addressInfo.city,addressInfo.state,addressInfo.zip,addressInfo.country].join(', ')}
          </Typography>
        </div>
        <div>
  {paymentInfo.paymentType === 'creditCard' ? (
    <>
      <Typography variant="subtitle2" gutterBottom>
        Payment details
      </Typography>
      <Grid container>
      <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
  <Typography variant="body1" color="text.secondary">
    Card Number:
  </Typography>
  <Typography variant="body2">{paymentInfo.cardNumber}</Typography>
</Stack>
<Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
  <Typography variant="body1" color="text.secondary">
    CVV:
  </Typography>
  <Typography variant="body2">{paymentInfo.cvv}</Typography>
</Stack>
<Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
  <Typography variant="body1" color="text.secondary">
    Expiration Date:
  </Typography>
  <Typography variant="body2">{paymentInfo.expirationDate}</Typography>
</Stack>
<Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
  <Typography variant="body1" color="text.secondary">
    Card Holder Name:
  </Typography>
  <Typography variant="body2">{paymentInfo.cardHolderName}</Typography>
</Stack>
      </Grid>
    </>
  ) : (
    <div>
    <Typography variant="subtitle2" gutterBottom>
        Payment details
      </Typography>
      <Typography variant="body1" color="text.secondary">
      Bank Transfer
    </Typography>
    </div>

  )}
</div>

      </Stack>
    </Stack>
  );
}