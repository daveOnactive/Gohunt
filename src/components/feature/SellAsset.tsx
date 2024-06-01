import { Box, Button, TextField } from "@mui/material";
import { AccountInput, UploadInput, WalletAddressInput } from "..";

export function SellAsset() {
  return (
    <Box>
      <Box mt={3.5}>
        <WalletAddressInput />
      </Box>
      
      <TextField 
        id="standard-basic" 
        label="Seller’s Phone Number" 
        variant="standard" 
        fullWidth
        placeholder="Type seller’s phone number"
        sx={{
          mt: 2,
        }}
      />

      <TextField
        id="standard-basic"
        label="Amount"
        variant="standard"
        type="number"
        fullWidth
        placeholder="Type amount"
        sx={{
          mt: 2,
        }}
      />

      <Box mt={3}>
        <AccountInput />
      </Box>

      <Box my={3}>
        <UploadInput />
      </Box>

      <Button variant="contained" fullWidth>
        Sell
      </Button>
    </Box>
  )
}