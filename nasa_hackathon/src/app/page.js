"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Box,
  ThemeProvider,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from "@mui/material";
import theme from "./theme"; // Adjust this import based on your project structure
import Globe from "./components/Globe"; // Import the Globe component
import ParticlesBackground from "./components/ParticlesBackground";

const Page = () => {
  const [showStepper, setShowStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const stepperRef = useRef(null);
  const globeRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const maxOffset = 200; // Set the maximum offset value (adjust as needed)

  const handleGetStartedClick = () => {
    setShowStepper(true);
    setTimeout(() => {
      if (stepperRef.current) {
        window.scrollTo({
          top: stepperRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleNext = () => {
    if (activeStep === 0 && name && phone) {
      setActiveStep((prevStep) => prevStep + 1);
    } else if (activeStep === 1 && location) {
      console.log("Form submitted:", { name, phone, location });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate the new offset for vertical movement
      const newOffset = Math.min(scrollY, maxOffset);
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingTop: "50px",
          display: "flex",
          flexDirection: "column", // Stack elements vertically
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Fill the full viewport height
          position: "relative",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            position: "relative", // Set the parent container as relative
            textAlign: "center",
            marginBottom: "50px",
            backgroundColor: "transparent",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              width: "100vw", // Let the width adjust automatically
              fontSize: { xs: "24px", sm: "32px" }, // Responsive font sizes
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
              position: "absolute", // Position the text absolutely
              top: "10%", // Adjust the distance from the top
              left: "50%",
              transform: "translate(-50%, -50%)", // Center horizontally and vertically
              zIndex: 10, // Ensure text appears in front of the globe
            }}
          >
            LAND ANALYSIS REIMAGINED.
          </Typography>

          <Box
  ref={globeRef} // Add ref to globe container
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: "90vw", sm: "80vw", md: "60vw" },
    height: { xs: "90vw", sm: "80vw", md: "60vw" },
    backgroundColor: "transparent",
    // marginTop: "-50px", // Decrease from 50px to 20px (or lower)
    transform: `translateY(${offset-25}px)`, // Move vertically
  }}
>
  <Globe />
</Box>
        </Box>

        {/* Description Section */}
        <Box
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%" }, // Responsive width for the description
            padding: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.01)",
            textAlign: "center",
            marginBottom: "40px",
            zIndex: 1, // Ensure text appears above the globe
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "20px", sm: "24px" }, // Responsive font size
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
              marginBottom: "20px",
            }}
          >
            Discover and explore the power of satellite imagery
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" }, // Responsive font size
              color: "white",
              opacity: "0.75",
              marginBottom: "30px",
            }}
          >
            Harnessing Landsat satellite passes to access detailed surface
            reflectance data to compare with your own ground-based measurements,
            all in one place.
          </Typography>
        </Box>

        {/* Button Section */}
        <Button
          variant="outlined"
          size="large"
          onClick={handleGetStartedClick}
          sx={{
            marginBottom: "40px",
            backgroundColor: "white",
            color: "white",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          Get Started
        </Button>

        {/* Stepper Section */}
        {showStepper && (
          <Box
            ref={stepperRef}
            sx={{
              width: { xs: "90%", sm: "70%", md: "50%" },
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              marginTop: "30px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "white",
                fontWeight: "bold",
                opacity: "0.75",
                marginBottom: "20px",
              }}
            >
              Want a reminder when your location will be passed over by the
              Landsat Satellite?
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {["User Info", "Location"].map((label, index) => (
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                      },
                      "&:hover fieldset": {
                        borderColor: "lightgray",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                      },
                      "&:hover fieldset": {
                        borderColor: "lightgray",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                      },
                      "&:hover fieldset": {
                        borderColor: "lightgray",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              </Box>
            )}

            <Button
              variant="outlined"
              onClick={handleNext}
              sx={{
                marginTop: "20px",
                backgroundColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "lightgray",
                },
              }}
            >
              {activeStep === 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        )}
      </Box>

      <ParticlesBackground />
    </ThemeProvider>
  );
};

export default Page;
