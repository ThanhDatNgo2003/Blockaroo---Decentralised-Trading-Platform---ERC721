import React, { useState } from 'react';
import sha256 from 'crypto-js/sha256';
import TransactionDetails from './TransactionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import getTransaction from '../api/getWalletTransaction';
import { useEffect } from 'react';

const TransactionHistory = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransaction(localStorage.getItem('wallet_address'))
      .then((res) => res.data)
      .then((data) => {
        // console.log('Fetched data:', data);
        if (data.hasOwnProperty("message")) {
          // Handle error message if needed
        } else {
          // Update itemsData state with the fetched data
          setTransaction(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const generateHash = (transaction) => {
    const detailsString = JSON.stringify(transaction);
    return sha256(detailsString).toString();
  };

  const handleTransactionClick = (event, transaction) => {
    setAnchorEl(event.currentTarget);

    if (selectedTransaction && selectedTransaction.id === transaction.id) {
      // Clicking the same transaction again will close the details
      setPopoverOpen(false);
      setSelectedTransaction(null);
    } else {
      // Clicking a different transaction will show its details
      setPopoverOpen(true);
      setSelectedTransaction({ ...transaction, hash: generateHash(transaction) });
    }
  };

  const handleClose = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Transaction History
      </Typography>
      <List>
        {transaction.map((transac, index) => {
          const transactionHash = transac.transaction_hash;

          return (
            <React.Fragment key={transac.transaction_id}>
              <ListItem disablePadding>
                <ListItemButton onClick={(event) => handleTransactionClick(event, transac)}>
                  <ListItemText primary={transactionHash} />
                </ListItemButton>
              </ListItem>
              {index < transaction.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedTransaction && <TransactionDetails transaction={selectedTransaction} />}
      </Popover>
    </Paper>
  );
};

export default TransactionHistory;
