import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const TransactionDetails = ({ transaction }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#2196f3' }}>
        Transaction Details
      </Typography>

      {transaction.kind === 'ERC721 transfer' && (
        <>
          <Typography variant="body1" style={{ fontWeight: 'bold', color: '#4caf50' }}>
            Kind: {transaction.kind}
          </Typography>
          <Typography variant="body1">Token ID: {transaction.tokenId}</Typography>
          <Typography variant="body1">From: {transaction.from}</Typography>
          <Typography variant="body1">To: {transaction.to}</Typography>
          <Typography variant="body1">Price: {transaction.price}</Typography>
        </>
      )}

      {(transaction.kind === 'ERC20 receive' || transaction.kind === 'ERC20 withdrawn') && (
        <>
          <Typography variant="body1" style={{ fontWeight: 'bold', color: '#ff9800' }}>
            Kind: {transaction.kind}
          </Typography>
          <Typography variant="body1">From: {transaction.from}</Typography>
          <Typography variant="body1">To: {transaction.to}</Typography>
          <Typography variant="body1">Amount: {transaction.amount}</Typography>
        </>
      )}

      <Typography variant="body1" style={{ fontWeight: 'bold', color: transaction.status === 'success' ? '#4caf50' : '#f44336' }}>
        Status: {transaction.status}
      </Typography>
      <Typography variant="body1">Transaction Date: {new Date(Number(transaction.timestamp)).toLocaleString()}</Typography>
    </Paper>
  );
};

export default TransactionDetails;
