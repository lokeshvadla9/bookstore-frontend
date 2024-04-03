import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';


export const mainListItems = ({ handleItemClick })=>(
  <React.Fragment>
    <ListItemButton  onClick={() => handleItemClick('dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={() => handleItemClick('orders')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton onClick={() => handleItemClick('customers')}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton onClick={() => handleItemClick('inventory')}>
      <ListItemIcon>
      <InventoryIcon/>
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>
    <ListItemButton onClick={() => handleItemClick('queries')}>
      <ListItemIcon>
      <ContactSupportIcon/>
      </ListItemIcon>
      <ListItemText primary="Queries" />
    </ListItemButton>
  </React.Fragment>
);


export const userListItems = ({ handleItemClick })=>(
  <React.Fragment>
    <ListItemButton onClick={() => handleItemClick('shop')}>
      <ListItemIcon>
        <StorefrontIcon />
      </ListItemIcon>
      <ListItemText primary="Shop" />
    </ListItemButton>
    <ListItemButton onClick={() => handleItemClick('cart')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Cart" />
    </ListItemButton>
    <ListItemButton onClick={() => handleItemClick('orders')}>
      <ListItemIcon>
        <LocalMallIcon/>
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton onClick={() => handleItemClick('myDetails')}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="My Details" />
    </ListItemButton>
    </React.Fragment>
    
);