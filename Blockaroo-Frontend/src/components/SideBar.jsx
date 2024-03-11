import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WalletIcon from '@mui/icons-material/Wallet';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


export default function SideBar() {
    return (
            <Box sx={{ height: '100vh', width: '100%', maxWidth: 260, bgcolor: '#080808', borderRadius: '0px 30px 30px 0px' }}>
                <nav className="menu navlist" role="navigation" aria-label="Navigation Menu">
                <div className='logowrap'><img className = "logo" src="logo.png" alt="Blockaroo" loading= "lazy" ></img></div>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <SpaceDashboardIcon fontSize= 'large' sx ={{ fontSize: '100', color: '#8A8B92' }}/>
                                </ListItemIcon >
                                <ListItemText primary="Dashboard" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <StorefrontIcon fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                                </ListItemIcon>
                                <ListItemText primary="Marketplace" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <CollectionsBookmarkIcon fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                                </ListItemIcon>
                                <ListItemText primary="Collection" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <FavoriteIcon fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                                </ListItemIcon>
                                <ListItemText primary="Favorite" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <WalletIcon fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                                </ListItemIcon>
                                <ListItemText primary="Wallet" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <HistoryIcon fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                                </ListItemIcon>
                                <ListItemText primary="History" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <SettingsIcon fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                                </ListItemIcon>
                                <ListItemText primary="Settings" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx ={{ padding:'20px'}}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                                </ListItemIcon>
                                <ListItemText primary="Logout" fontSize= 'large' sx ={{ color: '#8A8B92' }}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>

    )
}
