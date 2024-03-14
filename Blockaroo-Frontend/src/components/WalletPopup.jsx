import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Box,
  Typography
} from '@mui/material';
import { useWallet } from './WalletContext';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useEffect } from 'react';
import getBalance from '../api/getBalance';

export default function WalletPopup() {
  const { walletAddress, walletState, addFunds, deductFunds } = useWallet();
  const [amount, setAmount] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [balance, setBalance] = useState('');

  const handleCopyToken = () => {
    navigator.clipboard.writeText(walletAddress);
    setSnackbarSeverity('success');
    setSnackbarMessage('Wallet Address copied to clipboard.');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  console.log("Wallet",localStorage.getItem('wallet_address'));

  useEffect(() => {
    getBalance(localStorage.getItem('wallet_address'))
      .then((res) => res.data)
      .then((data) => {
        // console.log('Fetched data:', data);
        if (data.hasOwnProperty("wallet_balance")) {
          setBalance(data)  }
        })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px',
          backgroundColor: '#212229',
          borderRadius: '20px',
          padding: '5px',
          cursor: 'pointer',
        }}
      >
        <img className="ethereumicon" src="ethereum.png" alt="Ethereum Coin" loading="lazy" />
        <Typography noWrap component="div" sx={{ color: '#7986cc', fontWeight: '500', fontSize: '17px', paddingRight: '10px', margin: '4px' }}>
        {`Balance: ${parseFloat(balance.wallet_balance).toFixed(6)} ETH`}
        </Typography>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
