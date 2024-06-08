import { Card, Typography, Button, TextField } from "@mui/material";

export function EditWalletDetails() { 
  return (
    <Card elevation={0} sx={{
      borderRadius: '28px',
      px: 9.5,
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      mx: 'auto',
      width: '50%',
      mt: 7
    }}>
      <Typography color='primary' variant="h6" textAlign='center' fontWeight='bold' mb={6.5}>Wallet Details (BTC)</Typography>

      <TextField label='Wallet Address' fullWidth sx={{ my: 2 }} type="number" variant="standard" />

      <Typography variant="body1" fontWeight='bold'>Rates</Typography>

      <TextField label='Sell' fullWidth sx={{ my: 2 }} type="number" variant="standard" />

      <TextField label='Buy' fullWidth sx={{ my: 2 }} type="number" variant="standard" />

      <Button variant="contained" color='primary' fullWidth sx={{ mt: 6.5 }}>Save Changes</Button>
    </Card>
  )
}