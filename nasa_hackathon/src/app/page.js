// app/page.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  return (
    
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)', // Increase the height by 100px or any value you prefer
      }}
    >
    
      <Typography variant="h4" align="center" sx={{ marginTop: '20px' }}>
        Landsat SR Data Tool
      </Typography>

      <Box
        sx={{
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginTop: '20px', color: 'black' }}>
          3D EARTH
        </Typography>
      </Box>


      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh + 1000px)', // Increase the height by 100px or any value you prefer
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginTop: '20px', color: 'black' }}>
              3D EARTH
        </Typography>
      </Container>

    
    </Container>



  );
};

export default Page;
