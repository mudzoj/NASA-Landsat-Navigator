// app/page.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Page = () => {
  return (
    <Container
      sx={{
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
    </Container>
  );
};

export default Page;
