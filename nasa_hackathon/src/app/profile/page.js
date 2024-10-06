// src/app/pages/about.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ParticlesBackground from "../components/ParticlesBackground";

const AboutPage = () => {
  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ marginTop: '20px' }}>
        PROFILE PAGE

      </Typography>
      <ParticlesBackground />
    </Box>

  );
};

export default AboutPage;
