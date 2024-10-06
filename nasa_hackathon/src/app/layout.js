"use client"
// app/layout.js

import localFont from "next/font/local";
import "./globals.css";
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ParticlesBackground from './components/ParticlesBackground'; // Make sure this path is correct
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Adjust this import based on your project structure
import Link from 'next/link';

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
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Link href="/" passHref>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      SpaceSpan
                    </Typography>
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
                      <Button color="primary">About</Button>
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
