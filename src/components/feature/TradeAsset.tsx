import { Box, Button, Typography } from "@mui/material"
import { AssetInput, CurrencyInput } from "../atoms"


function DisplayRate() {
  return (
    <Box sx={{ mb: 2, mt: 2.5 }}>
      <Typography mb={0.5}>1 BTC</Typography>
      <Typography>1,000 <span style={{ opacity: .5 }}>NGN</span></Typography>
    </Box>
  )
}

type IProps = {
  tradeType: 'sell' | 'buy';
}

export function TradeAsset({ tradeType }: IProps) {

  return (
    <Box>
      <DisplayRate />

      <Box sx={{
        display: 'flex',
        flexDirection: tradeType === 'sell' ? 'column' : 'column-reverse',
        height: '8rem',
        justifyContent: 'space-between',
      }}>
        <AssetInput />
        <CurrencyInput />
      </Box>

      <Button fullWidth sx={{ mt: 5 }} variant="contained" size="large">
        {tradeType === 'sell' ? 'Sell Now' : 'Buy Now'}
      </Button>
    </Box>
  )
}