// src/app/pages/about.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ParticlesBackground from "../components/ParticlesBackground";

const AboutPage = () => {
  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ marginTop: '20px' }}>
        ABOUT PAGE
        <ParticlesBackground />
      </Typography>
    </Box>


  );
};

export default AboutPage;
