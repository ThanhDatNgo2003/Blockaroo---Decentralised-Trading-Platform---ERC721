import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import VerifiedIcon from '@mui/icons-material/Verified';

const item = [
  {
    id: 1,
    image: 'lion/416115118_1097121594635932_2993300085316626669_n.jpg',
    highestBid: 10,
    remainingTime: '02:30:00',
    useravatar: "lion/416056042_216595671449191_333028321265486358_n.jpg",
    username: 'MysticExplorer',
    userid: '@DreamSeeker'
  },
  {
    id: 2,
    image: 'koala/416132063_263961596571665_8091555308778454630_n.jpg',
    highestBid: 5,
    remainingTime: '01:15:00',
    useravatar: "koala/416137435_1380817886133419_3608802292287033680_n.jpg",
    username: 'QuantumQuasar',
    userid: '@StellarVoyager'
  },
  {
    id: 3,
    image: 'alligator/418734366_328681940152083_7012872026476473338_n.jpg',
    highestBid: 15,
    remainingTime: '03:45:00',
    useravatar: "kangaroo/416101034_935775464079009_3552962690161379757_n.jpg",
    username: 'AquaAdventurer',
    userid: '@OceanicNomad'
  }
  // Add more items as needed
];


const UserTag = ({ useravatar, username, userid }) => {
  return (
    <div>
      <Box
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-controls={username}
      aria-haspopup="true"
      color="inherit"
      display= "flex"
      padding= "15px 15px 15px 0"
      justifyContent= "space-between"
      alignItems="center"
      >
        <Box 
            display='flex'
        >
            <img className='usertrendingavatar' src={useravatar} alt={`Avatar for ${username}`} /> 

            <Box>
                <Typography variant="h6" noWrap component="div" margin="0" color="#c5c5c6">
                    {username}
                </Typography>
                <Typography variant="h7" noWrap component="div" margin="0" color="#8a8b92">
                    {userid} 
                    <VerifiedIcon sx={{color: "#008AF7", fontSize: 15, ml: 1}}/>
                </Typography>
            </Box>
        </Box>
      </Box>
    </div>
  );
};


const ItemsInfo = ({ id, image, highestBid, remainingTime, useravatar, username, userid }) => {
  return (
    <Card sx={{ width: 300, backgroundColor: "#212229", margin: 'auto', mt: 2, mb: 2, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '30px'}}>
      <CardMedia
        component="img"
        height="220"
        image={image}
        sx= {{ borderRadius: '30px', width: 270, margin: 'auto', mt: 2}}
      />

      <CardContent sx={{ p: 2 }}>

        <UserTag useravatar={useravatar} username={username} userid={userid} />

        <hr style={{borderColor: "#707070", opacity: 0.3, borderWidth: 0.8}}></hr>

        <Typography variant="body1" color="#8A8B92" sx={{ mb: 1 }}>
          Highest Bid: {highestBid} ETH
        </Typography>
        <Typography variant="body1" color="#8A8B92">
          Remaining Time: {remainingTime}
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
};
const LiveAuctions = () => {
  return (
    <div className="live-auctions">
      <h2>Live Auctions</h2>
      <ul className="items-list">
        {item.map((item) => (
          <div>
            <ItemsInfo
            key={item.id}
            id={item.id}
            image={item.image}
            highestBid={item.highestBid}
            remainingTime={item.remainingTime}
            useravatar={item.useravatar}
            username={item.username}
            userid={item.userid}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LiveAuctions;