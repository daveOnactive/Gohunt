'use client'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Button, Typography, Box, InputLabel } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MAX_SIZE = 5242880;

type IProp = {
  getFile?: (file: any) => void;
  error?: boolean;
}

export function UploadInput({ getFile, error }: IProp) {

  const [selectedFile, setSelectedFile] = useState<any>();

  const onDrop = useCallback((acceptedFiles: any[]) => {

    const file = acceptedFiles[0];

    setSelectedFile(file);

    getFile?.(file)
  }, [getFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
      <InputLabel sx={{
        fontSize: '1rem',
        color: '#fff',
        mb: 1
      }}
      >Upload a screenshot of Transaction</InputLabel>
      <Box 
        sx={{
          borderColor: error ? 'red' : '#CBD0DC',
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
          cursor: 'pointer'
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CloudUploadOutlinedIcon />
        {
          selectedFile ? selectedFile?.name : (
            <>
              <Typography variant='body2'>Choose a file & drop it here</Typography>
              <Typography variant='body1'>JPEG, PNG, PDF formats up to 5MB</Typography>
              <Button variant='contained'>Select File</Button>
            </>
          )
        }
      </Box>
    </>
  )
}