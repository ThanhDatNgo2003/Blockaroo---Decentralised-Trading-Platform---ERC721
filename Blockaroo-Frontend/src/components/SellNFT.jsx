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


  getItems()
  .then((res) => res.data)
  .then((data) => {
    if (data.hasOwnProperty("message")) {
      alert(data.message);
    } else {
      setItemsData(data.NFTItems);
    }
  });

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

  const handleSellSuccess = (token, price) => {
    setSnackbarSeverity('success');
    setSnackbarMessage('Your NFT has been listed on the marketplace successfully');
    const objectToModify = itemsData.find((item) => item.token === token);
    if (objectToModify) {
      // Modify the specific fields
      objectToModify.onsell = true;
      objectToModify.price = price;
    }
    const jsonString = JSON.stringify(itemsData, null, 2);
    console.log(jsonString);
    setSnackbarOpen(true);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setSnackbarSeverity('success');
    setSnackbarMessage('Token copied to clipboard');
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
            {token ? `0x${token.slice(2, 7)}...${token.slice(-5)}` : 'Token not available'}
            <IconButton onClick={handleCopyToken}>
              <FileCopyIcon sx={{ fontSize: '15px' }} />
            </IconButton>
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
              handleSellSuccess(token, Price);
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
