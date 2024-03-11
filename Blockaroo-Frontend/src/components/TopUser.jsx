import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';

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
        padding= "13px 10px"
        justifyContent= "space-between"
        alignItems="center"
      >
        <Box 
            display='flex'
        >
               <img className='usertrendingavatar' src={useravatar} alt={`Avatar for ${username}`} /> 
        
            <Box>
                <Typography noWrap component="div" margin="0" color="#c5c5c6" sx={{ fontSize: '15px' }}>
                    {username}
                </Typography>
                <Typography noWrap component="div" margin="0" color="#8a8b92" sx={{ fontSize: '13px' }}>
                    {userid}
                </Typography>
            </Box>
        </Box>
        <IconButton sx={{ fontSize: '15px', color: "white", borderColor: "#047cdc", borderRadius: '10px', height: '27px',
            backgroundColor: 'rgba(18, 81, 134, 1)',
            '&:hover': {
            backgroundColor: 'rgba(18, 81, 134, 0.5)',
            },}}>
            Follow
        </IconButton>
      </Box>
    </div>
  );
};

const TopTrending = ({ title, users }) => {
  return (
    <div className='trendingBoard'>
        <Typography variant="h5" margin="30px 0 20px 0" color="#cacaca" >{title}</Typography>
        <div className='trending'>
            {users.map(user => (
              <UserTag useravatar={user.avatar} username={user.username} userid={user.userid} />
            ))}
        </div>
    </div>
  );
};



export default TopTrending

