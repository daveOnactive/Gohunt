import { Box, Button, TextField } from "@mui/material";
import { AccountDisplay, UploadInput, WalletAddressInput } from "../atoms";

export function BuyAsset(){
  return (
    <Box>
      <Box mt={3.5}>
        <AccountDisplay />
      </Box>

      <TextField
        id="standard-basic"
        label="Buyer’s Phone Number"
        variant="standard"
        fullWidth
        placeholder="Type buyer’s phone number"
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
        <WalletAddressInput isInput />
      </Box>

      <Box my={3}>
        <UploadInput />
      </Box>

      <Button variant="contained" fullWidth>
        Buy
      </Button>
    </Box>
  )
}