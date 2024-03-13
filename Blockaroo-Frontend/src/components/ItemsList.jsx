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
    IconButton,
    Button,
    Box,
  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ConfirmTransactionPopup, ConfirmLoginPopup} from './ConfirmationTransaction.jsx';
import ItemDetails from './ItemDetails';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import getItems from '../api/getItems';
import { useEffect } from 'react';


const BlurredBackdrop = styled(Backdrop)({
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
});


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
  padding: 1.5,
});

const PaginationContainer = styled('div')({
  marginTop: 1.5,
  display: 'flex',
  justifyContent: 'center',
});

const ItemContainer = styled(Grid)({
  padding: 1.5,
});



const ItemsInfo = ({ token, name, image, ownedname, price, artist, onBuyClick, onViewDetailsClick }) => {
  const isMediumScreen = useMediaQuery('(max-width:1300px)');

  const handleCardClick = () => {
    onViewDetailsClick(token);
  };

  const handleBuyButtonClick = (event) => {
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
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          cursor: 'pointer',
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
        marginTop="8px"
        marginLeft="15px"
      >
        <img className='usertrendingavatar' src="./useravatar.jpg" alt={`Avatar for ${ownedname}`} />
        <Box>
          <Typography noWrap component="div" margin="0" color="#c5c5c6" sx={{ fontSize: '16px' }}>
            {name}
          </Typography>
          <Typography noWrap component="div" margin="0" color="#8a8b92" sx={{ fontSize: '14px' }}>
            {artist}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 1.5 }}>
        <Typography variant="body1" color="#fff" sx={{ mb: 1, fontSize: isMediumScreen ? '0.7rem' : '1rem' }}>
          Price: {price} ETH
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0px' }}>
          <IconButton aria-label="add to favorites" sx={{ color: 'text.secondary' }}>
            <FavoriteIcon />
          </IconButton>
          <Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '7px', padding: '3.5px 11px', fontSize: '10.5px' }} onClick={(event) => handleBuyButtonClick(event)}  >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ItemsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalFilter, setAnimalFilter] = useState('');
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemDetailsOpen, setItemDetailsOpen] = useState(false);
  const [isConfirmLoginOpen, setConfirmLoginOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
  const [filteredItems, setFilteredItems] = useState([]);


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


  

  const handleSortChange = (property) => {
    if (sortBy === property) {
      // If already sorting by the same property, toggle the order
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // If sorting by a different property, set the new property and default to ascending order
      setSortBy(property);
      setSortOrder('asc');
    }
  };

  if (itemsData && itemsData.length > 0) {
    // Sorting items based on selected property and order
    itemsData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
  
      if (sortBy === 'item_name') {
        return order * a.item_name.localeCompare(b.item_name);
      } else if (sortBy === 'price') {
        return order * (a.price - b.price);
      }
  
      return 0; // Default: No sorting
    });
  }

  const navigate = useNavigate();
  

  const handleViewDetailsClick = (item) => {
    setItemDetailsOpen(true);
    setSelectedItem(item);
  };

  const handleCloseItemDetails = () => {
    setItemDetailsOpen(false);
  };

  const handleConfirmTransaction = () => {
    setConfirmationOpen(false);
    handleCloseItemDetails(); 
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  const handleBuyButtonClick = (item) => {
    if (isLoggedIn) {
      setSelectedItem(item);
      setConfirmationOpen(true);
    } else {
      setConfirmLoginOpen(true);
    }
  };

  const handleConfirmLogin = () => {
    setConfirmLoginOpen(false);
    navigate('/login');
  };

  const handleCloseConfirmLogin = () => {
    setConfirmLoginOpen(false);
  };

  useEffect(() => {
    if (itemsData && itemsData.length > 0) {
      const onSellNFT = itemsData.filter((item) => item.onsell === 1);
      const filtered = onSellNFT.filter((item) =>
        (animalFilter === '' || item.item_name.toLowerCase().includes(animalFilter.toLowerCase())) &&
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [itemsData, animalFilter, searchTerm]); 
  
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  console.log('item:', itemsData);
  console.log('Fill:', filteredItems);
  console.log('current:', currentItems);

  return (
    <RootContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: '#FFFFFF' }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search NFT"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ color: '#8A8B92' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
        <Box>
        <IconButton aria-label="filter" sx={{ p: 0, color: '#fff', marginRight: '20px', fontSize: '20px' }} onClick={() => setFilterModalOpen(true)}>
          <FilterAltIcon sx={{ p: 0.5, fontSize: '25px', border: '2px solid white', borderRadius: '8px' }} />
        </IconButton>
        <IconButton aria-label="sort" sx={{ p: 0, color: '#fff', marginRight: '20px', fontSize: '20px' }}>
          <SortByAlphaRoundedIcon
            sx={{
              p: 0.5,
              fontSize: '25px',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => handleSortChange('name')}
          />
        </IconButton>
        </Box>
        {/* Filter Modal */}
        <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)} closeAfterTransition BackdropComponent={BlurredBackdrop}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Animal Filter
          </Typography>
          <Select
            value={animalFilter}
            onChange={(e) => setAnimalFilter(e.target.value)}
            sx={{ width: '100%', marginBottom: '20px' }}
          >
            <MenuItem value="">All Animals</MenuItem>
            {['Koala', 'Alligator', 'Lion', 'Kangaroo'].map((animal) => (
              <MenuItem key={animal} value={animal}>{animal}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={() => { setFilterModalOpen(false); }}>
            Close
          </Button>
        </Box>
      </Modal>
      </Box>
      <Grid container>
        {currentItems.map((item) => {
          console.log(item.token_id);
          return (
          <ItemContainer key={item.token_id} items xs={6} sm={4} md={3} lg={4} xl={3}>
            <div>
              <ItemsInfo
                token={item.token_id}
                name={item.item_name}
                image={item.image_url}
                ownedname={item.username}
                price={item.price}
                artist={item.artist}
                onBuyClick={() => handleBuyButtonClick(item)}
                onViewDetailsClick={() => handleViewDetailsClick(item)}
              />
            </div>
          </ItemContainer>
          );
        })}
      </Grid>
      <ItemDetails
        token={selectedItem ? selectedItem.token_id : null}
        name={selectedItem ? selectedItem.item_name : null}
        from={'0x0B97D...a820d'}
        to={'0x0Af3b...2845f'}
        ownedname={selectedItem ? selectedItem.username : null}
        image={selectedItem ? selectedItem.image_url : ''}
        amount={selectedItem ? selectedItem.price : 0}
        artist={selectedItem ? selectedItem.artist : null}
        open={isItemDetailsOpen}
        item={selectedItem}
        handleClose={handleCloseItemDetails}
      />
      <ConfirmTransactionPopup
        token={selectedItem ? selectedItem.token_id : null}
        from={selectedItem? selectedItem.wallet_address: null}
        to={'0x0Af3b...2845f'}
        image={selectedItem ? selectedItem.image_url : ''}
        amount={selectedItem ? selectedItem.price : 0}
        open={isConfirmationOpen}
        handleClose={handleCloseConfirmation}
        handleConfirm={handleConfirmTransaction} 
        handleCloseItemDetails={handleCloseItemDetails}
      />
      <ConfirmLoginPopup
        open={isConfirmLoginOpen}
        handleClose={handleCloseConfirmLogin}
        handleConfirm={handleConfirmLogin}
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

export default ItemsList;