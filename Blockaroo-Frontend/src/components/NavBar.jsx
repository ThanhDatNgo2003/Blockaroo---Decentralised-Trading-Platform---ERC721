import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ToggleMenu from './ToggleMenu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import WalletPopup from './WalletPopup';
import useLogout from '../functions/LogOut';



export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const { handleLogout } = useLogout();

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const storedUsername = sessionStorage.getItem('username');
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const handleLogoClick = () => navigate('/marketplace');
  const handleLoginClick = () => navigate('/login');
  const handleProfileClick = () => navigate('/profile');

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { handleProfileClick(); handleMenuClose(); }}>Profile</MenuItem>
      <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => { handleProfileClick(); handleMenuClose(); }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="Logout"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <nav className="menu navlist" role="navigation" aria-label="Navigation Menu">
        <AppBar position="static" sx={{ bgcolor: '#080808', borderRadius: '0px 0px 15px 15px' }}>
          <Toolbar>
          <ToggleMenu />
            <IconButton onClick={handleLogoClick}>
              <img className="logo" src="logo.png" alt="Blockaroo" loading="lazy"></img>
              <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <img className="logotext" src="logotext.png" alt="Blockaroo" loading="lazy"></img>
              </Typography>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
              {isLoggedIn && <WalletPopup />}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon sx={{ fontSize: '26.25px', color: '#8A8B92' }} />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon sx={{ fontSize: '26.25px', color: '#8A8B92' }} />
                </Badge>
              </IconButton>
              {isLoggedIn ? (
                <IconButton size="large" edge="end" aria-label="account of current user" onClick={handleProfileMenuOpen} color="inherit">
                  <AccountCircle sx={{ fontSize: '26.25px', color: '#8A8B92', paddingRight:'7px' }} />
                  <Typography variant="h6" noWrap component="div" margin="0">{storedUsername}</Typography>
                </IconButton>
              ) : (
                <IconButton size="large" edge="end" aria-label="login" onClick={handleLoginClick} sx={{ color: '#8a8b92' }}>
                  <LoginIcon sx={{ fontSize: '26.25px' }} />
                  <Typography variant="h6" noWrap component="div" margin="0">Login</Typography>
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </nav>
    </Box>
  );
}
