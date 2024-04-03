import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box ,TextField, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import config from '../../config';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // Track the user being edited
    const [updatedUserData, setUpdatedUserData] = useState({}); // Track updated user data

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/users/getallusers');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user being edited
    setUpdatedUserData({ ...user }); // Initialize updatedUserData with current user data
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/users/register-or-update-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customerId: updatedUserData.customer_id,
            email: updatedUserData.email,
            password: updatedUserData.password,
            firstName: updatedUserData.first_name,
            lastName: updatedUserData.last_name,
            address: updatedUserData.address,
            phoneNumber: updatedUserData.phone_number,
            isDeleted: 0}),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      // Refresh users list after successful update
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/users/register-or-update-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customerId: user.customer_id,
            email: user.email,
            password: user.password,
            firstName: user.first_name,
            lastName: user.last_name,
            address: user.address,
            phoneNumber: user.phone_number,
            isDeleted: 1 // Set isDeleted to 1 for soft deletion
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Refresh users list after successful deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', borderRadius: '5px', marginTop:'3%' }}>
  <TableContainer component={Paper}>
    <Table aria-label="users table">
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.customer_id}>
            <TableCell>{editingUser === user ? <TextField name="first_name" value={updatedUserData.first_name} onChange={handleChange} /> : user.first_name}</TableCell>
            <TableCell>{editingUser === user ? <TextField name="last_name" value={updatedUserData.last_name} onChange={handleChange}  />  : user.last_name}</TableCell>
            <TableCell>{editingUser === user ? <TextField name="email" value={updatedUserData.email} onChange={handleChange} /> : user.email}</TableCell>
            <TableCell>{editingUser === user ? <TextField name="phone_number" value={updatedUserData.phone_number} onChange={handleChange} /> : user.phone_number}</TableCell>
            <TableCell>{editingUser === user ? <TextField name="address" value={updatedUserData.address} onChange={handleChange} /> : user.address}</TableCell>
            <TableCell>
              {editingUser === user ? (
                <>
                  <IconButton aria-label="update" onClick={() => handleUpdateUser()}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton aria-label="cancel" onClick={() => setEditingUser(null)}>
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton aria-label="edit" onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteUser(user)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
  );
};

export default Customers;
