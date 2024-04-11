import React, { useEffect, useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, FormControl, Select, MenuItem } from '@mui/material';
import config from '../../config';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Fetch queries data from API
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await fetch(config.backendBaseUrl+'/api/users/getqueries');
      if (response.ok) {
        const data = await response.json();
        setQueries(data.data);
      } else {
        console.error('Failed to fetch queries:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
        const response = await fetch(config.backendBaseUrl+'/api/users/updatequerystatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query_id: id,
                new_status: newStatus
            })
        });

        if (response.ok) {
            // Update the status of the query in the state
            const updatedQueries = queries.map(query => {
                if (query.id === id) {
                    return { ...query, status: newStatus };
                }
                return query;
            });
            setQueries(updatedQueries);
            
            alert('Query status updated successfully');
        } else {
            // Error handling
            alert('Failed to update query status');
        }
    } catch (error) {
        console.error('Error updating query status:', error);
    }
};

const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredQueries = filterStatus === 'All' ? queries : queries.filter(query => query.status === filterStatus);

  return (
    <Box sx={{ padding: '20px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', borderRadius: '5px', marginTop:'3%' }}>
      <Typography variant="h4" gutterBottom>Queries</Typography>
      <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          displayEmpty
          style={{borderRadius:'25px'}}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="wip">WIP</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper} style={{borderRadius:'25px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQueries.map(query => (
              <TableRow key={query.id}>
                <TableCell>{query.name}</TableCell>
                <TableCell>{query.email}</TableCell>
                <TableCell>{query.subject}</TableCell>
                <TableCell>{query.message}</TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={query.status}
                      style={{borderRadius:'25px'}}
                      onChange={(event) => handleStatusChange(query.id, event.target.value)}
                    >
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="wip">WIP</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Queries;
