import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AccordionExpandDefault from "./Accordion"
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DialogActions from '@mui/material/DialogActions';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import {ConfirmTransactionPopup, ConfirmLoginPopup} from './ConfirmationTransaction.jsx';

const ItemDetails = ({ token, name, from, to, ownedname, image, amount, artist, open, handleClose, handleConfirm }) => {
  
  const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(3px)',
  }));

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isConfirmLoginOpen, setConfirmLoginOpen] = useState(false);

  const navigate = useNavigate();

  const handleConfirmTransaction = () => {
    // Perform the transaction or any other action here
    // You can also close the confirmation pop-up after the action is completed
    setConfirmationOpen(false);
  };

  
  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  const handleBuyButtonClick = (item) => {
    if (isLoggedIn) {
      setConfirmationOpen(true);
    } else {
      // Redirect to login page using useNavigate
      setConfirmLoginOpen(true);
    }
  };

  const handleConfirmLogin = () => {
    // Perform the transaction or any other action here
    // You can also close the confirmation pop-up after the action is completed
    setConfirmLoginOpen(false);
    navigate('/login');
  };

  const handleCloseConfirmLogin = () => {
    setConfirmLoginOpen(false);
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose} BackdropComponent={StyledBackdrop} maxWidth="md">
      <div className="nft-profile">
        <Box
            sx={{
                '& > :not(style)': {
                mt: 5,
                ml: 5,
                width: 500,
                height: 500 ,
                borderRadius: 5,
                backgroundColor: "#212229"
                },
            }}
            >
            <Paper elevation={3}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <img src="coins.png" alt="ethereum" style={{margin: "10px 0 10px 10px", height: "30px", width: "30px"}} />
                    <div style={{margin: "10px 10px 10px", display: "flex"}}>
                        <>
                        <ShareIcon sx={{ color: '#E0E0E0', height: "30px", width: "30px", marginRight: "10px"}}></ShareIcon>

                        <Typography variant='h6' sx={{marginRight: "10px", color: "#E0E0E0"}}>0</Typography>

                        <IconButton aria-label="add to favorites" sx={{ color: '#E0E0E0', backgroundColor: "#625E5E", height: "30px", width: "30px"}}>
                            <FavoriteBorder />
                        </IconButton>
                        </>
                    </div>
                </div>

                <img
                src={image}
                alt="NFT Item"
                style={{ width: '100%', height: "100%", objectFit: 'contain', borderRadius: "0 0 20px 20px"}} />
            </Paper>
        </Box>

        <div className='nft-content'>
            <Typography variant='h6' sx={{marginRight: "10px", color: "#419AE0"}}>
                {artist}
                <VerifiedIcon sx={{width: "15px", height: "15px", marginLeft: "5px", color: "#008AF7"}} />
            </Typography>
            <div style={{marginTop: "20px"}}>
                <Typography variant='h4' sx={{color: "#E0E0E0"}}>{name}</Typography>
                <Typography variant='h6' sx={{color: "#E0E0E0"}}>Owned by <span className='owner'>{ownedname}</span></Typography>
            </div>

            <div style={{display: "flex", gap: "20px", marginTop: "30px"}}>
                <div style={{display: "flex", gap: "5px"}}>
                    <RemoveRedEyeOutlinedIcon sx={{color: "#E0E0E0"}} />
                    <Typography variant='h7' sx={{color: "#E0E0E0"}}>175 views</Typography>
                </div>
                <div style={{display: "flex", gap: "5px"}}>
                    <FavoriteBorder sx={{color: "#E0E0E0"}} />
                    <Typography variant='h7' sx={{color: "#E0E0E0"}}>2</Typography>
                </div>
            </div>

            <AccordionExpandDefault />
            <DialogActions>
              <Button variant="text" sx={{backgroundColor: "#008AF7", color: "#E0E0E0", width: "70%", margin: "20px 100px 0 100px"}} onClick={handleClose} color="primary">Cancel</Button>
              <Button variant="text" sx={{backgroundColor: "#008AF7", color: "#E0E0E0", width: "70%", margin: "20px 100px 0 100px"}} endIcon={<ShoppingCartOutlinedIcon/>}  onClick={(event) => handleBuyButtonClick()}>Buy now</Button>
            </DialogActions>
        </div>
      </div>
    </Dialog>
    <ConfirmTransactionPopup
      token={token}
      from={from}
      to={to}
      image={image}
      amount={amount}
      open={isConfirmationOpen}
      handleClose={handleCloseConfirmation}
      handleConfirm={handleConfirmTransaction}
    />
    <ConfirmLoginPopup
      open={isConfirmLoginOpen}
      handleClose={handleCloseConfirmLogin}
      handleConfirm={handleConfirmLogin}
    />
    </>
  );
};

export default ItemDetails;
