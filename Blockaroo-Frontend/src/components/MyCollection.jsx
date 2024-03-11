import React from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
  } from '@mui/material';
  import SellIcon from '@mui/icons-material/Sell';
import useMediaQuery from '@mui/material/useMediaQuery';
import ConfirmSellPopup from './SellNFT';
import jsonItemsData from '../blockaroodata/ItemsNFT';
import { useWallet } from './WalletContext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '15px',
    backgroundColor: alpha(theme.palette.common.white, 0.12),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.22),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '30vw',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 'calc(30vw - 42px)',
      },
    },
}));


const RootContainer = styled('div')({
  flexGrow: 1,
  padding: 1.5, // Adjust as needed
});

const PaginationContainer = styled('div')({
  marginTop: 1.5, // Adjust as needed
  display: 'flex',
  justifyContent: 'center',
});

const ItemContainer = styled(Grid)({
  // Adjust spacing as needed
  padding: 1.5,
});

  
const ItemsInfo = ({ token, name, image, ownedname, ownedavatar, price, remainingTime, onBuyClick, onViewDetailsClick, onSell }) => {
  // Use useMediaQuery to get the current screen size
  const isMediumScreen = useMediaQuery('(max-width:1300px)');

    const handleCardClick = () => {
      onViewDetailsClick(token);
    };
  
    const handleBuyButtonClick = (event) => {
      // Prevent the card click event from being triggered when clicking the buy button
      event.stopPropagation();
      onBuyClick(token);
    };

  return (
    <Card       
      sx={{
        width: isMediumScreen ? 170 : 220,
        backgroundColor: "#212229",
        margin: 'auto',
        mt: 1.5,
        mb: 1.5,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '30px',
        transition: 'transform 0.2s', // Add a transition for a smooth hover effect
        '&:hover': {
          transform: 'scale(1.05)', // Increase the scale on hover
          cursor: 'pointer', // Set cursor to pointer on hover
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="165"
        image={image}
        alt={name}
        sx={{
          borderRadius: '30px',
          width: isMediumScreen ? 140 : 200,
          margin: 'auto',
          height: isMediumScreen ? 130 : 160,
          mt: 1.5,
        }}
      />
      <Box 
        display='flex'
        marginTop= "8px"
        marginLeft= "15px"
      >
        <img className='usertrendingavatar' src={ownedavatar} alt={`Avatar for ${ownedname}`} />         
        <Box>
          <Typography noWrap component="div" margin="0" color="#c5c5c6" sx={{ fontSize: '16px' }}>
            {name}
          </Typography>
          <Typography noWrap component="div" margin="0" color="#8a8b92" sx={{ fontSize: '14px' }}>
            {ownedname}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 1.5 }}>
        <Typography variant="body1" color="#fff" sx={{ mb: 1, mt: 1, fontSize: isMediumScreen ? '0.8rem' : '1.0rem' }}>
          Price: {price} ETH
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0px' }}>
          <Typography color = '#7986cc'>
            {onSell ? 'On Sale' : ''}
          </Typography>
          <Button
            variant="contained"
            endIcon={<SellIcon />}
            sx={{
              m: 0.75,
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '7px',
              padding: '3.5px 11px',
              fontSize: '10.5px',
            }}
            onClick={(event) => handleBuyButtonClick(event)}
            disabled={onSell}
          >
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


const MyCollection = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isSellOpen, setSellOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { walletAddress } = useWallet();

  const handleViewDetailsClick = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmSell = () => {
    // Perform the transaction or any other action here
    // You can also close the Sell pop-up after the action is completed
    setSellOpen(false);
  };

  const handleCloseSell = () => {
    setSellOpen(false);
  };


  const handleBuyButtonClick = (item) => {
      setSelectedItem(item);
      setSellOpen(true);
  };


  const MyNFT = jsonItemsData.ItemsData.filter((item) => {
    const itemWalletAddress = item.walletaddress?.walletAddress;
    return itemWalletAddress === walletAddress;
  });
  
  
  const filteredItems = MyNFT.filter((items) =>
    items.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 12; // 6 rows x 3 items per row = 18 items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    
    <RootContainer>
      <Search>
        <SearchIconWrapper>
            <SearchIcon sx ={{ color: '#FFFFFF' }}/>
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search NFT"
            inputProps={{ 'aria-label': 'search' }}
            sx ={{ color: '#8A8B92' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Search>
      <Grid container>
        {currentItems.map((items) => (
          <ItemContainer key={items.token} items xs={6} sm={4} md={3} lg={4} xl={3}>
          <div>
            <ItemsInfo
            token={items.token}
            name={items.name}
            ownedname={items.ownedname}
            ownedavatar={items.ownedavatar}
            image={items.image}
            price={items.price}
            artist={items.artists}
            remainingTime={items.remainingTime}
            onBuyClick={() => handleBuyButtonClick(items)}
            onViewDetailsClick={() => handleViewDetailsClick(items)}
            onSell={items.onsell}
            />
          </div>
          </ItemContainer>
        ))}
      </Grid>
     
      <ConfirmSellPopup
        token={selectedItem ? selectedItem.token : null}
        from={'0x0B97D...a820d'}
        to={'0x0Af3b...2845f'}
        image={selectedItem ? selectedItem.image : ''}
        amount={selectedItem ? selectedItem.price : 0}
        open={isSellOpen}
        handleClose={handleCloseSell}
        handleSell={handleConfirmSell}
      />
      <PaginationContainer>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </PaginationContainer>
    </RootContainer>
  );
};

export default MyCollection;
