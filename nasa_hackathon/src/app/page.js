"use client"; // Mark this as a Client Component

import React from 'react';
import { Typography, Box, ThemeProvider } from '@mui/material';
import theme from './theme'; // Adjust this import based on your project structure

const Page = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          marginTop: '64px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 64px)', // Adjust for AppBar height
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            Landsat SR Data Tool
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35vw',
              height: '35vw',
              borderRadius: '50%',
              backgroundColor: 'white',
              margin: '0 auto', // Centering the circle horizontally
            }}
          >
            <Typography variant="h4" sx={{ color: 'black' }}>
              3D EARTH
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Page;
