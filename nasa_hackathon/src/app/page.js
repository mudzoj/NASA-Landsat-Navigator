"use client"; // Mark this as a Client Component
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
// import ParticleBackground from './components/ParticleBackground'; // Import your ParticleBackground component
import { AuthContextProvider, UserAuth } from "./AuthContext";
import theme from './theme'; // Import your existing theme


export default function Page() {
  const [anchorEl, setAnchorEl] = useState(null);
   const [loading, setLoading] = useState(true)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const {user, googleSignIn, logOut} = UserAuth();
  console.log(user);
const handleSignIn = async() => {
  try{
    await googleSignIn()
  } catch(error){
    console.error(error);
  }
}
const handleSignOut = async () => {
  try{
    setAnchorEl(null);
    await logOut();
   
  } catch (error){
    console.log(error);
  }
}

useEffect(() => {
 const checkAuthentication = async () => {
  await new Promise ((resolve) => setTimeout(resolve, 50 ))
  setLoading(false);
 };
 checkAuthentication();

  }, [user]);

 return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
      <div style={{ position: 'relative', backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
        
        {/* Add the Particle Background
        <ParticleBackground /> */}
        <AuthContextProvider>
          {/*=================================APPBAR======================================== */}
          <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                SpaceSpan
              </Typography>
              <div>
                <IconButton color="primary" aria-label="home">
                  <HomeIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={handleMenuClick}
                  aria-label="user account"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Button color="primary">About</Button>
                {loading ? null : !user ? (<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={handleSignIn} className="p-2 cursor-pointer">
                    Login
                  </MenuItem>
                  <MenuItem onClick={handleSignIn} className="p-2 cursor-pointer">
                    Sign up
                  </MenuItem>
                
                </Menu>): (
                  <div>
                    <p class="text-white">Welcome , {user.displayName}</p>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose} className="p-2 cursor-pointer">Profile
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}   className="p-2 cursor-point">Sign Out</MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </AuthContextProvider>
        {/*=================================3D EARTH VIEWER SECTION (INCOMPLETE)======================================== */}
        <Container
          sx={{
            marginTop: '100px', // Add margin to create space above the container
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
              width: '50vw',
              height: '50vw',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px'
            }}
          >
            <Typography variant="h4" align="center" sx={{ marginTop: '20px', color: 'black'}}>
              3D EARTH
            </Typography>
          </Box>
        </Container>

        {/*=================================USER GET STARTED======================================== */}
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 64px)',
          }}
        ></Container>
        
      </div>
    </ThemeProvider>
  );
}