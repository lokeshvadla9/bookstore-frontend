import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import config from '../../config';

function preventDefault(event) {
  event.preventDefault();
}

const Deposits = () => {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };
  const [todaySaleData, setTodaySaleData] = useState(null);

  useEffect(() => {
    fetch(config.backendBaseUrl+'/api/book/gettodayssale')
      .then(response => response.json())
      .then(data => {
        setTodaySaleData(data);
      })
      .catch(error => console.error('Error fetching today\'s sale data:', error));
  }, []);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Recent Deposits</Typography>
      {todaySaleData && (
        <React.Fragment>
          <Typography component="p" variant="h4">
            ${todaySaleData.data[0].today_sale}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            on {formatDate(todaySaleData.data[0].today_date)}
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Deposits;
