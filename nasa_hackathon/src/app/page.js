"use client"; // Mark this as a Client Component

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, Box, createTheme, ThemeProvider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon
import theme from './theme'; // Import your existing theme
import ParticleBackground from './components/ParticleBackground'; // Import your ParticleBackground component

export default function Page() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
      <div style={{ position: 'relative', backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
        
        {/* Add the Particle Background */}
        <ParticleBackground />

        {/*=================================APPBAR======================================== */}
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              SpaceSpan
            </Typography>
            <div>
              <IconButton color="primary" aria-label="home">
                <HomeIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={handleMenuClick}
                aria-label="user account"
              >
                <AccountCircleIcon />
              </IconButton>
              <Button color="primary">About</Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Signup</MenuItem>
                <MenuItem onClick={handleMenuClose}>Login</MenuItem>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        {/*=================================3D EARTH VIEWER SECTION (INCOMPLETE)======================================== */}
        <Container
          sx={{
            marginTop: '100px', // Add margin to create space above the container
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 64px)', // Adjust height to leave space for AppBar
          }}
        >
          <Typography variant="h4" align="center" sx={{ marginTop: '20px' }}>
            Landsat SR Data Tool
          </Typography>
          
          <Box 
            sx={{
              width: '50vw',
              height: '50vw',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px'
            }}
          >
            <Typography variant="h4" align="center" sx={{ marginTop: '20px', color: 'black'}}>
              3D EARTH
            </Typography>
          </Box>
        </Container>

        {/*=================================USER GET STARTED======================================== */}
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 64px)',
          }}
        ></Container>
        
      </div>
    </ThemeProvider>
  );
}
