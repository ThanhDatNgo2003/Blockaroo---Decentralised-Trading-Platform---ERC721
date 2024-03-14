import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const TransactionDetails = ({ transaction }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#2196f3' }}>
        Transaction Details
      </Typography>
          <Typography variant="body1" style={{ fontWeight: 'bold', color: '#4caf50' }}>
            Kind: {transaction.event}
          </Typography>
          <Typography variant="body1">Token ID: {transaction.token_id}</Typography>
          <Typography variant="body1">From: {transaction.from_address}</Typography>
          <Typography variant="body1">To: {transaction.to_address}</Typography>
      <Typography variant="body1">Transaction Date: {transaction.date}</Typography>
    </Paper>
  );
};

export default TransactionDetails;
