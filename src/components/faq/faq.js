import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import faqData from './faqData.json';
import { Container } from '@mui/material';

const FAQ = () => {
  return (
    <Container
    component="main"
    sx={{ display: 'flex', flexDirection: 'column', minHeight: '75vh', marginTop:'10%' }}
  >
    <Box marginTop={20}>
      <Typography variant="h5" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Box bgcolor="#f5f5f5" width="100%" p={2}>
              <Typography variant="subtitle1">{faq.question}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box bgcolor="#ededed" width="100%" p={2}>
              <Typography>{faq.answer}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
    </Container>
  );
};

export default FAQ;
