import { Box, InputBase} from "@mui/material";
import { AssetMenu } from "./AssetMenu";

export function AssetInput() {
  return (
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
        height: 30
      }}>
        <InputBase
          type="number"
          fullWidth
        />
      </Box>
      <Box sx={{
        display: 'flex',
        mx: 'auto',
      }}>
        <AssetMenu />
      </Box>
    </Box>
  )
}