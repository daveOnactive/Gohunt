import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Button, Typography, Box, InputLabel } from '@mui/material';

export function UploadInput() {
  return (
    <>
      <InputLabel sx={{
        fontSize: '1rem',
        color: '#fff',
        mb: 1
      }}
      >Upload a screenshot of Transaction</InputLabel>
      <Box sx={{
        borderColor: '#CBD0DC',
        borderStyle: 'dashed',
        borderWidth: '1px',
        height: { sm: '196px' },
        width: '100%',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        p: { xs: 2 }
      }}>
        <CloudUploadOutlinedIcon />
        <Typography variant='body2'>Choose a file & drop it here</Typography>
        <Typography variant='body1'>JPEG, PNG, PDF formats up to 5MB</Typography>
        <Button variant='contained'>Select File</Button>
      </Box>
    </>
  )
}