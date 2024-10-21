'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved !== null ? JSON.parse(saved) : true; // Default to dark mode
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1F719D',
        dark: '#1F719D',
        light: '#40A0D8',
      },
      background: {
        default: isDarkMode ? '#0F0F12' : '#F5F5F5',
        paper: isDarkMode ? '#2F3241' : '#FFFFFF',
      },
      text: {
        primary: isDarkMode ? '#FFFFFF' : '#000000',
        secondary: isDarkMode ? '#B0B0B0' : '#666666',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDarkMode ? '#0F0F12' : '#F5F5F5',
            color: isDarkMode ? '#FFFFFF' : '#000000',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          style: {
            boxShadow: 'none',
            textTransform: 'none',
            borderRadius: 10,
          },
        },
        styleOverrides: {
          root: {
            color: isDarkMode ? '#FFFFFF' : '#000000',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label': {
              color: isDarkMode ? '#FFFFFF' : '#666666',
            },
            '& .MuiInputBase-root::before': {
              borderColor: isDarkMode ? '#6a6868 !important' : '#CCCCCC !important',
            },
            '& .MuiInputBase-input': {
              color: isDarkMode ? '#FFFFFF' : '#000000',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2F3241' : '#FFFFFF',
            color: isDarkMode ? '#FFFFFF' : '#000000',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#2F3241' : '#FFFFFF',
            color: isDarkMode ? '#FFFFFF' : '#000000',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#2F3241' : '#FFFFFF',
            color: isDarkMode ? '#FFFFFF' : '#000000',
          },
        },
      },
    },
    typography: {
      fontFamily: [
        "Cabin",
        'sans-serif'
      ].join(','),
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};