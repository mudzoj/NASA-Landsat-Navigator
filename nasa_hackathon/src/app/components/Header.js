// Header.js
"use client";
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { UserAuth } from '../AuthContext'; // Adjust this pat
import Image from 'next/image';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, googleSignIn, logOut } = UserAuth();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      setAnchorEl(null);
      await logOut();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{justifyContent: 'space-between' }}>
        <Link href="/" passHref>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Image 
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              style={{ width: '10%', height: 'auto', marginRight: '10px', marginTop: "5px" }}
            />
            <Image 
              src="/images/spacespanlogo.png"
              alt="Logo"
              width={250}
              height={150}
              style={{ width: '45%', height: 'auto', marginRight: '10px', marginTop: "10px" }}
            />
          </Box>
        </Link>
        <div>
          <Link href="/" passHref>
            <IconButton color="primary" aria-label="home">
              <HomeIcon />
            </IconButton>
          </Link>
          <IconButton
            color="primary"
            onClick={handleMenuClick}
            aria-label="user account"
          >
            <AccountCircleIcon />
          </IconButton>
          <Link href="/about" passHref>
            <Button 
              color="primary" 
              sx={{ marginTop: '4px', '&:hover': { color: '#CCCCCC', backgroundColor: 'transparent' }}}
            >
              About
            </Button>
          </Link>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {user ? (
              <>
                <MenuItem onClick={handleMenuClose}>Welcome, {user.displayName}</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                  <Link href="/profile" passHref>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              </Link>
              </>
            ) : (
              <MenuItem onClick={handleSignIn}>Login/Signup</MenuItem>
            )}
            
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
