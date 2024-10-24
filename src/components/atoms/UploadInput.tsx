'use client'

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Button, Typography, Box, InputLabel, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MAX_SIZE = 5242880;

type IProp = {
  getFile?: (file: any) => void;
  error?: boolean;
}

export function UploadInput({ getFile, error }: IProp) {

  const [selectedFile, setSelectedFile] = useState<any>();
  const theme = useTheme();  // Using MUI theme

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    getFile?.(file);
  }, [getFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
    },
    maxSize: MAX_SIZE,
  });

  return (
    <>
      <InputLabel 
        sx={{
          fontSize: '1rem',
          color: theme.palette.text.primary,  // Adjusting based on the theme
          mb: 1
        }}
      >
        Upload a screenshot of Transaction
      </InputLabel>
      
      <Box 
        sx={{
          borderColor: error ? theme.palette.error.main : theme.palette.divider,  // Error or default border color
          borderStyle: 'dashed',
          borderWidth: '1px',
          height: { sm: '196px' },
          width: '100%',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
          p: { xs: 2 },
          cursor: 'pointer',
          bgcolor: theme.palette.background.default  // Adjusting background color based on theme
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CloudUploadOutlinedIcon 
          sx={{ 
            color: theme.palette.text.primary  // Icon color adapts to theme
          }} 
        />
        
        {
          selectedFile ? selectedFile?.name : (
            <>
              <Typography 
                variant='body2' 
                sx={{ color: theme.palette.text.secondary }}  // Placeholder text adapts to theme
              >
                Choose a file & drop it here
              </Typography>
              <Typography 
                variant='body1' 
                sx={{ color: theme.palette.text.secondary }}  // Placeholder text adapts to theme
              >
                JPEG, PNG, PDF formats up to 5MB
              </Typography>
              <Button 
                variant='contained' 
                sx={{
                  color: theme.palette.primary.contrastText,  // Button text color adapts to theme
                  bgcolor: theme.palette.primary.main  // Button background color adapts to theme
                }}
              >
                Select File
              </Button>
            </>
          )
        }
      </Box>
    </>
  )
}
