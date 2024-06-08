import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Typography } from "@mui/material";
import { TransactionList } from "../feature";

export function TransactionHistory(){
  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      width: '100%',
    }}>
      <Typography variant="h6" sx={{ color: '#1F719D', textAlign: 'left', mb: 1.5 }}>Transaction History</Typography>
      <TransactionList />
    </Box>
  )
}