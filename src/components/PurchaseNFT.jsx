import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AccordionExpandDefault from "./Accordion"
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export default function SimplePaper() {
  return (
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
                src="416175010_149332201606848_2518519025901588448_n.jpg"
                alt="NFT Item"
                style={{ width: '100%', height: "100%", objectFit: 'contain', borderRadius: "0 0 20px 20px"}} />
            </Paper>
        </Box>

        <div className='nft-content'>
            <Typography variant='h6' sx={{marginRight: "10px", color: "#419AE0"}}>
                Koala Gangs 
                <VerifiedIcon sx={{width: "15px", height: "15px", marginLeft: "5px", color: "#008AF7"}} />
            </Typography>
            <div style={{marginTop: "20px"}}>
                <Typography variant='h4' sx={{color: "#E0E0E0"}}>Alpha Koala #2710</Typography>
                <Typography variant='h6' sx={{color: "#E0E0E0"}}>Owned by <span className='owner'>EEC9A8</span></Typography>
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

            <Button variant="text" sx={{backgroundColor: "#008AF7", color: "#E0E0E0", width: "70%", margin: "20px 100px 0 100px"}} endIcon={<ShoppingCartOutlinedIcon />}>Buy now</Button>

        </div>
    </div>
  );
}