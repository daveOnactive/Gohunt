import { Box, InputBase, InputLabel, Typography } from "@mui/material";
import { AssetMenu } from "./AssetMenu";
import { Assets } from "@/type";
import { formatNumber } from "@/helpers";
import { Copy } from ".";

type IProps = {
  isInput?: boolean;
  onAssetChange?: (value: string) => void;
  asset?: Assets;
  type?: 'sell' | 'buy';
  onInputChange?: (value: string) => void;
}

export function WalletAddressInput({ isInput, onAssetChange, asset, type = 'sell', onInputChange }: IProps) {
  
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
        <InputLabel>Wallet Address</InputLabel>

        <InputLabel>Rate = {formatNumber(asset?.rate[type] as number, true)}</InputLabel>
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
          {
            isInput ? (
              <InputBase
                fullWidth
                onChange={(ev) => onInputChange?.(ev.target.value)}
              />
            ) : (
              <>
                  <Typography variant="h6" sx={{
                    fontSize: { sm: '1.27rem', xs: '.7rem'}
                  }}>{asset?.assetAddress}</Typography>

                  <Copy
                    name='Wallet Address'
                    value={asset?.assetAddress || ''}
                  />
              </>
            )
          }
        </Box>

        <Box sx={{
          display: 'flex',
          mx: 'auto',
        }}>
          <AssetMenu onChange={(value) => onAssetChange?.(value)}/>
        </Box>

      </Box>
    </Box>
  )
}