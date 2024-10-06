import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', 
    },
    secondary: {
      main: '#FF0000', // Bright red for accents (similar to SpaceX logo)
    },
    background: {
      default: '#000000', // Black background
      paper: '#1C1C1C', // Dark gray for paper surfaces
    },
    text: {
      primary: '#FFFFFF', // White text for primary content
      secondary: '#C1C1C1', // Light gray text for secondary content
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Clean, modern font choice
    h1: {
      color: '#FFFFFF', // White color for headings
      '&:hover': {
        color: '#CCCCCC', // Subtle change on hover
      },
    },
    h2: {
      color: '#C1C1C1', // Light gray for subheadings
      '&:hover': {
        color: '#A8A8A8', // Subtle change on hover
      },
    },
    // Add hover styles for About text
    button: {
      textTransform: 'uppercase', // Uppercase button text
      letterSpacing: '1px', // Spacing for button text
      color: '#FFFFFF', // White text for buttons
      backgroundColor: '#FF0000', // Red background for buttons
      '&:hover': {
        backgroundColor: '#D40000', // Darker red on hover
      },
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#CCCCCC', // Color change on hover for icons
          },
        },
      },
    },
  },
});

export default theme;
