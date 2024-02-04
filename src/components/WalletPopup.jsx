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

export default function WalletPopup() {
  const { walletAddress, walletState, addFunds, deductFunds } = useWallet();
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    // Load transaction history from local storage on component mount
    const storedTransactionHistory = JSON.parse(sessionStorage.getItem('transactionHistory')) || [];
    setTransactionHistory(storedTransactionHistory);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFunds = () => {
    if (!isNaN(parseFloat(amount))) {
      addFunds(parseFloat(amount));
      setSnackbarSeverity('success');
      setSnackbarMessage('Funds added successfully!');
      setSnackbarOpen(true);
      console.log('New Balance:', walletState.balance);

      const newTransaction = {
        kind: "ERC20 receive",
        from: "0x06FC0618cFA5a679eb3797955453bACEF671E0a8",
        to: walletAddress,
        amount: amount,
        status: "success",
        timestamp: Date.now().toString()
      }

      setTransactionHistory(prevTransactionHistory => [...prevTransactionHistory, newTransaction]);
      sessionStorage.setItem('transactionHistory', JSON.stringify([...transactionHistory, newTransaction]));

    } else {
      setSnackbarSeverity('error');
      setSnackbarMessage('Invalid amount entered for adding funds.');
      setSnackbarOpen(true);
    }
  };

  const handleDeductFunds = () => {
    const deductionAmount = parseFloat(amount);

    if (!isNaN(deductionAmount)) {
      if (deductionAmount <= walletState.balance) {
        deductFunds(deductionAmount);
        setSnackbarSeverity('success');
        setSnackbarMessage('Funds deducted successfully!');
        setSnackbarOpen(true);
        console.log('New Balance:', walletState.balance);

        const newTransaction = {
        kind: "ERC20 withdrawn",
        from: walletAddress,
        to: '0x06FC0618cFA5a679eb3797955453bACEF671E0a8',
        amount: amount,
        status: "success",
        timestamp: Date.now().toString()
      }

        setTransactionHistory(prevTransactionHistory => [...prevTransactionHistory, newTransaction]);
        sessionStorage.setItem('transactionHistory', JSON.stringify([...transactionHistory, newTransaction]));

      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Insufficient funds for transaction.');
        setSnackbarOpen(true);
      }
    }
  };

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
        onClick={handleOpen}
      >
        <img className="ethereumicon" src="ethereum.png" alt="Ethereum Coin" loading="lazy" />
        <Typography noWrap component="div" sx={{ color: '#7986cc', fontWeight: '500', fontSize: '17px', paddingRight: '10px', margin: '4px' }}>
        {`Balance: ${walletState.balance.toFixed(4)} ETH`}
        </Typography>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Your Wallet</DialogTitle>
        <DialogContent>
          <Typography>
            <DialogContentText padding='5px'>
              {walletAddress ? `0x${walletAddress.slice(2, 7)}...${walletAddress.slice(-5)}` : 'Token not available'}     
              <IconButton onClick={handleCopyToken}>
                <FileCopyIcon sx={{ fontSize: '15px'}} />
              </IconButton>
            </DialogContentText>
          </Typography>
          <Typography component="div" sx={{ mb: 2 }}>
            <TextField
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFunds}>Request Funds</Button>
          <Button onClick={handleDeductFunds}>Wihdraw</Button>
        </DialogActions>
      </Dialog>
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
