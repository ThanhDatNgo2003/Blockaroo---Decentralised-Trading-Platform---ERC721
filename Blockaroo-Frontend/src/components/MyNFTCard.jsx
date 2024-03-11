import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Button,
  } from '@mui/material';
  import ShareIcon from '@mui/icons-material/Share';
  import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const NFTCard = ({ image, title}) => (
    <Card sx={{ width: 300, backgroundColor: "#212229", mt: 2, mb: 2, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '30px'}}>
    <CardMedia
      component="img"
      height="220"
      image={image}
      sx= {{ borderRadius: '30px', width: 270, margin: 'auto', mt: 2}}
    />

    <CardContent sx={{ p: 2 }}>

      <Typography variant="h5" color="#E0E0E0">
        {title} 
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <IconButton aria-label="add to favorites" sx={{ color: '#E0E0E0', backgroundColor: "#625E5E"}}>
          <FavoriteBorder />
        </IconButton>
        <Button variant="contained" endIcon={<ShareIcon />} sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '25px', padding: '5px 15px', fontSize: '14px' }}>
          Share
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default NFTCard;