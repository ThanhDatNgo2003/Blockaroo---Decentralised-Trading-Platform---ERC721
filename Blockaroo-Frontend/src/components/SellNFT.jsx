import { useState } from 'react';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField'; // Import TextField for input
import getItems from '../api/getItems';
import { useEffect } from 'react';
import sellnft from '../api/sellNFT';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(3px)',
}));

const ConfirmSellPopup = ({ token, image, open, handleClose, handleSell }) => {
  const [enteredPrice, setEnteredPrice] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [itemsData, setItemsData] = useState([])


  useEffect(() => {
    getItems()
      .then((res) => res.data)
      .then((data) => {
        // console.log('Fetched data:', data);
        if (data.hasOwnProperty("message")) {
          // Handle error message if needed
        } else {
          // Update itemsData state with the fetched data
          setItemsData(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getCurrentFormattedDateTime = () => {
    const dateOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toLocaleDateString('en-US', dateOptions);
    const formattedTime = currentDateTime.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate} ${formattedTime}`;
  };

  const handleSellSuccess = (token, image, price) => {
    if (!enteredPrice.trim()) {
      alert('Please enter a price.');
      return;
    }
    const objectToModify = itemsData.find(item => item.token_id === token);
    if (objectToModify) {
      sellnft({
        token_id: objectToModify.token_id, 
        price: price,
        wallet_address: (localStorage.getItem('wallet_address'))
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log('Fetched data:', data);
        if (data.hasOwnProperty("message")) {
          window.location.reload();
          alert(data.message);
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    } else {
      console.error('Item with token', token, 'not found in Your Collection');
    }
  };



  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} BackdropComponent={StyledBackdrop}>
        <DialogTitle sx={{ padding: '20px 0 5px 25px' }}>Confirm Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>Please review your transaction details.</DialogContentText>
        </DialogContent>
        <Divider />
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '10px 10px 5px 10px',
          }}
        >
          <img className="itemtransaction" src={image} alt="Item Transaction" loading="lazy" />
          <DialogContentText padding="5px">
            {'Token ID: ' + token }
          </DialogContentText>
          <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>{getCurrentFormattedDateTime()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
          <TextField
            label="Enter Price (ETH)"
            variant="outlined"
            value={enteredPrice}
            onChange={(e) => setEnteredPrice(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSell();
              const Price = parseFloat(enteredPrice);
              handleSellSuccess(token, image, Price);
            }}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ConfirmSellPopup;
