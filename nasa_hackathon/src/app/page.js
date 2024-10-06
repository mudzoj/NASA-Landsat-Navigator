"use client"
import React, { useState, useRef } from 'react';
import { Typography, Box, ThemeProvider, Button, Stepper, Step, StepLabel, TextField } from '@mui/material';
import theme from './theme'; // Adjust this import based on your project structure
import Globe from './components/Globe'; // Import the Globe component
import ParticlesBackground from './components/ParticlesBackground';

const Page = () => {
  const [showStepper, setShowStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // Track the active step
  const [name, setName] = useState(''); // State for name
  const [phone, setPhone] = useState(''); // State for phone number
  const [location, setLocation] = useState(''); // State for location
  const stepperRef = useRef(null);

  // Scroll to the stepper when it's loaded
  const handleGetStartedClick = () => {
    setShowStepper(true);
    setTimeout(() => {
      if (stepperRef.current) {
        window.scrollTo({
          top: stepperRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    }, 100); // Timeout to ensure the stepper is rendered before scrolling
  };

  const handleNext = () => {
    if (activeStep === 0 && name && phone) {
      // Move to the next step if name and phone are filled
      setActiveStep((prevStep) => prevStep + 1);
    } else if (activeStep === 1 && location) {
      // Final step: handle submission or any further action
      console.log('Form submitted:', { name, phone, location });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
        }}
      >
        <Box sx={{ textAlign: 'center', backgroundColor: 'transparent', zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '-410px',
              fontSize: '32px',
              color: 'white',
              backgroundColor: 'transparent',
              zIndex: 1,
              fontFamily: '"Roboto", sans-serif',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            LAND ANALYSIS REIMAGINED.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100vw',
              height: '100vw',
              margin: '0 auto',
              backgroundColor: 'transparent',
            }}
          >
            <Globe /> {/* Use the Globe component */}
          </Box>

          <Box
            sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              padding: '16px',
              textAlign: 'center',
              zIndex: 1,
              width: '65%',
              margin: '20px auto 0',
            }}
          >
            <Typography
              sx={{
                marginTop: '-200px',
                opacity: "1",
                fontSize: '24px',
                color: 'white',
                backgroundColor: 'transparent',
                zIndex: 1,
                fontFamily: '"Roboto", sans-serif',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              Discover and explore the power of satellite imagery
            </Typography>

            <Typography
              variant="h4"
              sx={{
                marginTop: '30px',
                fontFamily: '"Roboto", sans-serif',
                fontSize: '16px',
                color: 'white',
                fontWeight: "bold",
                opacity: "0.75",
              }}
            >
              Harnessing Landsat satellite passes to access detailed surface reflectance data to compare with your own ground-based measurements, all in one place.
            </Typography>
          </Box>
          
          <Box sx={{ paddingBottom: "300px" }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleGetStartedClick}
              sx={{
                marginTop: '-80px',
                backgroundColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'lightgray',
                },
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Stepper - Only visible when showStepper is true */}
          {showStepper && (
            <Box
              ref={stepperRef}
              sx={{
                marginTop: '50px',
                width: '80vw',
                margin: '0 auto',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Stepper activeStep={activeStep} alternativeLabel>
                {['User Info', 'Location'].map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                  />
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    
                  />
                </Box>
              )}

              {activeStep === 1 && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                   
                  />
                </Box>
              )}

              <Button variant="outlined" onClick={handleNext} sx={{ marginTop: '20px',
                  backgroundColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'lightgray',
                  },
                
               }}>
                {activeStep === 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <ParticlesBackground />
    </ThemeProvider>
  );
};

export default Page;
