"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#1F719D',
      main: '#1F719D'
    },
    background: {
      default: '#1B1A28',
      paper: '#2F3241',
    },
    text: {
      primary: '#fff'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          boxShadow: 'none',
          textTransform: 'none',
          borderRadius: 10
        }
      }
    }
  },
  typography: {
    fontFamily: [
      "Cabin",
      'sans-serif'
    ].join(',')
  }
});

export default theme;

