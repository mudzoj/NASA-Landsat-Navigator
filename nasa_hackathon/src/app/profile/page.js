"use client";
import React, { useState } from 'react';
import { Container, Typography, Box, Divider, TextField, Button } from '@mui/material';
import ParticlesBackground from "../components/ParticlesBackground";

const AboutPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleUpdate = () => {
    // Handle the update logic here
    console.log("Update button clicked", { email, phone, location });
  };

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column", // Stack elements vertically
      padding: '20px', // Add some padding around the box
      marginTop: "100px"
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', margin: '20px 0' }}>
        <Divider variant="fullWidth" sx={{ flex: 1, borderColor: 'gray', height: '1px' }} />
        <Typography 
          variant="h4" 
          sx={{ 
            margin: '0 10px', 
            position: 'relative', 
            whiteSpace: 'nowrap', 
            fontWeight: "bold",
            fontSize: '2rem', // Make the text larger
            padding: '0 10px' // Optional: some padding around the text
          }}
        >
          Profile
        </Typography>
        <Divider variant="fullWidth" sx={{ flex: 1, borderColor: 'gray', height: '1px' }} />
      </Box>

      {/* Parent Box for Outlined Text Fields */}
      <Box sx={{
  width: '100%', // Set width for the fields to 100% of the parent
  maxWidth: '600px', // Set a maximum width for larger screens
  padding: '40px', // Increase padding inside the box for a bigger look
  backgroundColor: 'transparent', // Make the background transparent or set to 'white' as needed
  borderRadius: '8px', // Rounded corners
  border: '2px solid gray', // Add a border (thickness, style, color)
  boxShadow: 2, // Optional: adds a slight shadow
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Increased space between fields
  marginTop: "150px",
}}>
  {/* Text fields and update button go here */}
      <Typography 
          variant="h4" 
          sx={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: '0 10px', 
            position: 'relative', 
            whiteSpace: 'nowrap', 
            fontWeight: "bold",
            fontSize: '24px', // Make the text larger
            padding: '0 10px', // Optional: some padding around the text
            paddingBottom: "50px"
          }}
        >
          Saved Information
          </Typography>

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Grey border color
              },
              "&:hover fieldset": {
                borderColor: "lightgray", // Color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray", // Color when focused
              },
              "& input": {
                backgroundColor: "transparent", // Make background transparent
              },
            },
          }}
        />

        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Grey border color
              },
              "&:hover fieldset": {
                borderColor: "lightgray", // Color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray", // Color when focused
              },
              "& input": {
                backgroundColor: "transparent", // Make background transparent
              },
            },
          }}
        />

        <TextField
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Grey border color
              },
              "&:hover fieldset": {
                borderColor: "lightgray", // Color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray", // Color when focused
              },
              "& input": {
                backgroundColor: "transparent", // Make background transparent
              },
            },
          }}
        />

        {/* Update Button */}
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleUpdate} 
          sx={{ 
            marginTop: '20px', // Space above the button
            alignSelf: 'center' // Center the button horizontally
          }}
        >
          Update
        </Button>
      </Box>

      <ParticlesBackground />
    </Box>
  );
};

export default AboutPage;
