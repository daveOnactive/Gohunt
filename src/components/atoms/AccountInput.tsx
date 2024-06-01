import { Box, InputLabel, InputBase } from "@mui/material";
import { AssetMenu } from "./AssetMenu";

export function AccountInput() {
    return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        '& label': {
          color: 'white',
          fontSize: '1rem'
        }
      }}>
        <InputLabel>Seller’s Account Details</InputLabel>
      </Box>
      
      <Box sx={{
        borderBottom: 1,
        borderColor: '#6a6868',
        width: '100%',
        display: 'flex',
        py: 1
      }}>
        <Box sx={{
          width: '70%',
          borderRight: 1,
          borderColor: '#6a6868',
          height: 30,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 2
        }}>
          <InputBase
            type="number"
            fullWidth
            placeholder='Type the account number'
          />
        </Box>

        <Box sx={{
          display: 'flex',
          mx: 'auto',
        }}>
          <AssetMenu />
        </Box>

      </Box>
    </Box>
  )
}