"use client";
import localFont from "next/font/local";
import "./globals.css";
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ParticlesBackground from './components/ParticlesBackground'; // Make sure this path is correct
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Adjust this import based on your project structure
import Link from 'next/link';
import Image from 'next/image';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider theme={theme}>
          <ParticlesBackground>
            <div style={{ minHeight: '100vh', color: 'white' }}>
              {/* AppBar */}
              <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" passHref>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Image 
                    src="/images/logo.png" // Ensure the path is correct
                    alt="logo"
                    width={100} // Original width
                    height={100} // Original height
                    style={{ width: '10%', height: 'auto', marginRight: '10px', marginTop: "5px"}} // Adjust margin for spacing
                  />
                  <Image 
                    src="/images/spacespanlogo.png" // Ensure the path is correct
                    alt="Logo"
                    width={250} // Original width
                    height={150} // Original height
                    style={{ width: '45%', height: 'auto', marginRight: '10px', marginTop: "10px"}} // Adjust margin for spacing
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
                        sx={{marginTop: '4px', '&:hover': {
                          color: '#CCCCCC', // Change color on hover
                          backgroundColor: 'transparent', // Make sure background is transparent on hover
                        },}} 
                      >
                        About
                      </Button>
                    </Link>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Login/Signup</MenuItem>
                      <Link href="/profile" passHref>
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                      </Link>
                    </Menu>
                  </div>
                </Toolbar>
                {/* Horizontal line below the title */}
                {/* <Box
                  sx={{
                    width: '98%', // Set width for the line
                    height: '1px', // Line height
                    backgroundColor: 'gray', // Change to your desired grayish color
                    margin: '0 auto', // Center it horizontally
                    marginTop: '-10px', // Space between the text and line
                  }}
                /> */}
              </AppBar>

              {/* Main Content */}
              <div style={{ marginTop: '64px' }}>{children}</div> {/* Adjust for AppBar height */}
            </div>
          </ParticlesBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
