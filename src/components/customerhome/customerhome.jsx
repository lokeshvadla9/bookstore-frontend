import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { userListItems } from '../listitems/listitems';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import MyDetails from '../mydetails';
import Shop from '../shop';
import BookDetail from '../bookdetail';
import config from '../../config';
import { useLocation} from 'react-router-dom';
import Cart from '../cart';
import OrderDetails from '../orderdetails';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

function CustomerHome() {
  const location = useLocation();
  const userData = location.state.userData;
  const [open, setOpen] = useState(true);
  const [activeView, setActiveView] = useState('shop');
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState([]);


  const handleAddToCart = (book, quantity) => {
    console.log(cart)
    const existingItemIndex = cart.findIndex((item) => item.id === book.book_id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { id: book.book_id, title: book.title, price: book.price, quantity, image_url: book.image_url }]);
    }
    setActiveView('shop');
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleItemClick = (view) => {
    setActiveView(view);
  };

  const handleCardClick = (book) => {
    setSelectedBook(book); 
    setActiveView('bookDetail');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'myDetails':
        return <MyDetails userData={userData}/>;
      case 'shop':
        return <Shop onCardClick={handleCardClick} />
      case 'bookDetail':
        return <BookDetail book={selectedBook} onAddToCart={handleAddToCart} />;
      case 'cart':
        return <Cart cart={cart} userData={userData} setCart={setCart}/>
      case 'orders':
        return <OrderDetails customer_id={userData.customer_id}></OrderDetails>
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {userListItems({ handleItemClick })}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {renderActiveView()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default CustomerHome;
