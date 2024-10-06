"use client"
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
  Divider,
  Alert,
} from "@mui/material";
import theme from "./theme"; // Adjust this import based on your project structure
import Globe from "./components/Globe"; // Import the Globe component
import ParticlesBackground from "./components/ParticlesBackground";
import { AuthContextProvider, useAuth } from "./AuthContext"; // Import useAuth here

const Page = () => {
  const [showStepper, setShowStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [showNewBox, setShowNewBox] = useState(false); // New state for the new box
  const stepperRef = useRef(null);
  const newBoxRef = useRef(null); // Ref for the new box
  const globeRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const maxOffset = 200; // Set the maximum offset value (adjust as needed)
  const { isLoggedIn } = useAuth(); // Access the authentication 
  const [alertVisible, setAlertVisible] = useState(false);

  const handleGetStartedClick = () => {
    if (!isLoggedIn) {
      setAlertVisible(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return; // Exit if the user is not logged in
    }
  
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

      // Hide location field and submit button, and show new box
      setShowNewBox(true);
      setShowStepper(false); // Hide the stepper
      setActiveStep(0); // Reset the stepper to the first step

      // Scroll to the new box
      setTimeout(() => {
        if (newBoxRef.current) {
          window.scrollTo({
            top: newBoxRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
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
              marginBottom: "5000px", // Add this line to create more space below
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
              transform: `translateY(${offset - 25}px)`, // Move vertically
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
              marginBottom: "30px",
            }}
          >
            Discover and explore the power of satellite imagery
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" }, // Responsive font size
              color: "white",
              opacity: "0.75",
              marginBottom: "0px",
            }}
          >
            Harnessing Landsat satellite passes to access detailed surface reflectance data to compare with your own ground-based measurements, all in one place.
          </Typography>
        </Box>
        
        <Box sx={{ width: '30%', margin: '20px 0', marginBottom: "50px"}}> {/* Adjust margin as needed */}
          <Divider variant="fullWidth" sx={{ borderColor: 'gray', height: '1px' }} />
        </Box>
        
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            color: "white",
            fontWeight: "bold",
            opacity: "1",
            marginBottom: "10px",
            fontSize: { xs: "14px", sm: "16px" }, // Responsive font size
          }}
        >
          Want a reminder when your location will be passed over by the Landsat Satellite?
        </Typography>

        {/* Button Section */}
        <Button
          variant="outlined"
          size="large"
          onClick={handleGetStartedClick}
          sx={{
            backgroundColor: "white",
            color: "white",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          Get Started
        </Button>

        {alertVisible && (
          <Alert 
            severity="warning" // Change severity to 'info', 'success', or 'error' as needed
            onClose={() => setAlertVisible(false)} // Close the alert when the close button is clicked
            sx={{ 
              position: 'fixed', 
              top: '50%', // Center vertically
              left: '50%', // Center horizontally
              transform: 'translate(-50%, -50%)', // Offset to truly center it
              zIndex: 1000, 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with transparency
              color: 'black', // Change text color to black for better visibility
              borderRadius: '8px', // Optional: rounded corners
              width: '80%', // Optional: responsive width
              maxWidth: '400px', // Optional: max width for larger screens
            }} 
          >
            Please SignIn/SignUp to get started!
          </Alert>
        )}

        {/* Stepper Section */}
        {showStepper && (
          <Box
            ref={stepperRef}
            sx={{
              width: { xs: "90%", sm: "70%", md: "50%" },
              margin: "20px 0",
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust opacity for background
              borderRadius: "8px", // Optional: add some rounding to the box
              padding: "16px", // Add some padding inside the box
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {["Contact Info", "Location"].map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ marginBottom: 2 }} // Adjust margin as needed
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ marginBottom: 2 }} // Adjust margin as needed
                />
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{ marginBottom: 2 }} // Adjust margin as needed
                />
                <Button variant="contained" onClick={handleNext}>
                  Submit
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* New Box Section */}
        {showNewBox && (
          <Box
            ref={newBoxRef} // Add ref to the new box
            sx={{
              width: "90%",
              margin: "20px 0",
              padding: "16px",
              backgroundColor: "white", // Make the background white
              borderRadius: "8px", // Optional: rounding corners
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: add shadow for depth
            }}
          >
            <Typography variant="h5" component="h2">
              Thank you for your submission!
            </Typography>
            <Typography variant="body1">
              We will notify you when your location will be passed over by the Landsat Satellite.
            </Typography>
          </Box>
        )}

        <ParticlesBackground />
      </Box>
    </ThemeProvider>
  );
};

export default Page;
