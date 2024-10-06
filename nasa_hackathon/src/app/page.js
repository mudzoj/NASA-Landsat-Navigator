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
  Divider,
} from "@mui/material";
import theme from "./theme"; // Adjust this import based on your project structure
import Globe from "./components/Globe"; // Import the Globe component
import ParticlesBackground from "./components/ParticlesBackground";
import { AuthContextProvider, useAuth } from "./AuthContext";
import { getLatestImage } from "@/lib/utils/getLatestImage";

const Page = () => {
  const [showStepper, setShowStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [buttonText, setButtonText] = useState("Get Started");
  const [showBox, setShowBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // State to store image URL
  const stepperRef = useRef(null);
  const globeRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const maxOffset = 200; // Set the maximum offset value (adjust as needed)
  const { isLoggedIn } = useAuth(); // Access the authentication context

  const handleGetStartedClick = () => {
    if (!isLoggedIn) {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return; // Exit if the user is not logged in
    }

    setShowStepper(true);
    setButtonText("Submit"); // Change button text to Submit when stepper starts
    setShowBox(false); // Make sure the box is hidden on Get Started click
    setTimeout(() => {
      if (stepperRef.current) {
        window.scrollTo({
          top: stepperRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleNext = async () => {
    if (activeStep === 0 && name && phone) {
      setActiveStep((prevStep) => prevStep + 1);
    } else if (activeStep === 1 && location) {
      console.log("Form submitted:", { name, phone, location });

      // Fetch the latest data and display it in the box
      const imgSrc = await getLatestImage(47, 26);
      setImageSrc(imgSrc); // Set the image URL in the state

      // Toggle the box when the form is submitted
      setShowBox(!showBox);

      // Reset the form and stepper after submission
      setActiveStep(0);
      setName("");
      setPhone("");
      setLocation("");
      setShowStepper(false);
      setButtonText("Submit Again?");
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          position: "relative",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            marginBottom: "50px",
            backgroundColor: "transparent",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              width: "100vw",
              fontSize: { xs: "24px", sm: "32px" },
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              marginBottom: "5000px",
            }}
          >
            LAND ANALYSIS REIMAGINED.
          </Typography>

          <Box
            ref={globeRef}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "90vw", sm: "80vw", md: "60vw" },
              height: { xs: "90vw", sm: "80vw", md: "60vw" },
              backgroundColor: "transparent",
              transform: `translateY(${offset - 25}px)`,
            }}
          >
            <Globe />
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%" },
            padding: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.01)",
            textAlign: "center",
            marginBottom: "40px",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "20px", sm: "24px" },
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
              fontSize: { xs: "14px", sm: "16px" },
              color: "white",
              opacity: "0.75",
              marginBottom: "0px",
            }}
          >
            Harnessing Landsat satellite passes to access detailed surface
            reflectance data to compare with your own ground-based measurements,
            all in one place.
          </Typography>
        </Box>
        <Box sx={{ width: "30%", margin: "20px 0", marginBottom: "50px" }}>
          <Divider
            variant="fullWidth"
            sx={{ borderColor: "gray", height: "1px" }}
          />
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
            fontSize: { xs: "14px", sm: "16px" },
          }}
        >
          Want a reminder when your location will be passed over by the Landsat
          Satellite?
        </Typography>

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
        >
          {buttonText}
        </Button>

        {showStepper && (
          <Box
            ref={stepperRef}
            sx={{
              width: { xs: "90%", sm: "70%", md: "50%" },
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              marginTop: "400px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
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
                  required
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
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
                  required
                />
              </Box>
            )}

            <Box sx={{ mt: 2, marginBottom: "100px" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleNext}
                fullWidth
                disabled={
                  (activeStep === 0 && (!name || !phone)) ||
                  (activeStep === 1 && !location)
                }
              >
                {activeStep === 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </Box>
        )}

        {/* Toggleable Box */}
        {showBox && (
          <Box
            sx={{
              marginTop: "200px",
              width: "60%",
              padding: "20px",
              backgroundColor: "transparent",
              borderRadius: "10px",
              border: "2px solid white",
              color: "white",
              display: "flex", // Make the box a flex container
              flexDirection: "column", // Stack children vertically
              alignItems: "center", // Center children horizontally
              justifyContent: "center", // Center children vertically
              paddingBottom: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                color: "white",
                fontWeight: "bold",
                fontStyle: "italic",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              Request Received.
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                color: "white",
                opacity: "0.75",
                marginBottom: "50px",
                textAlign: "center",
              }}
            >
              In the meantime, here is the latest capture of your location:
            </Typography>

            <img
              src={imageSrc}
              alt="Loaded"
              style={{
                maxWidth: "50%", // Ensure the image fits within the box
                maxHeight: "50%",
                objectFit: "contain", // Maintain aspect ratio
                transform: "rotate(-15deg)", // Adjust the angle as needed
                backgroundColor: "transparent",
              }}
            />
          </Box>
        )}
      </Box>
      <ParticlesBackground />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <AuthContextProvider>
      <Page />
    </AuthContextProvider>
  );
};

export default App;
