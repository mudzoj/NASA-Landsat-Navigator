// src/components/ParticleBackground.js
import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  const particlesOptions = {
    particles: {
      number: {
        value: 50, // Start with a smaller number for testing
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 1,
      },
    },
  };

  return (
    <Particles
      options={particlesOptions}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh', // Ensure it takes full viewport height
        zIndex: -1,
      }}
    />
  );
};

export default ParticleBackground;
