"use client"
import React, { useState } from 'react';
import { Container, Typography, Box, Divider, TextField } from '@mui/material';
import ParticlesBackground from "../components/ParticlesBackground";

const AboutPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column", // Stack elements vertically
      padding: '20px', // Add some padding around the box
      marginTop: "100px"
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', margin: '20px 0', }}>
        <Divider variant="fullWidth" sx={{ flex: 1, borderColor: 'gray', height: '1px' }} />
        <Typography 
          variant="h4" 
          sx={{ 
            margin: '0 10px', 
            position: 'relative', 
            whiteSpace: 'nowrap', 
            fontWeight: "Bold",
            fontSize: '2rem', // Make the text larger
            padding: '0 10px' // Optional: some padding around the text
          }}
        >
          Profile
        </Typography>
        <Divider variant="fullWidth" sx={{ flex: 1, borderColor: 'gray', height: '1px' }} />
      </Box>

      {/* Outlined Text Fields */}
      <Box sx={{
        width: '80%', // Set width for the fields
        display: 'flex',
        flexDirection: 'column',
        gap: '15px', // Space between fields
        marginTop: "150px"
      }}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            border: '1px solid gray', // Outline color
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Border color
              },
              "&:hover fieldset": {
                borderColor: "lightgray", // Color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Color when focused
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
            border: '1px solid gray', // Outline color
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Border color
              },
              "&:hover fieldset": {
                borderColor: "lightgray", // Color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Color when focused
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
            border: '1px solid gray', // Outline color
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Border color
              },
              "&:hover fieldset": {
                borderColor: "lightgray", // Color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Color when focused
              },
            },
          }}
        />
      </Box>

      <ParticlesBackground />
    </Box>
  );
};

export default AboutPage;
