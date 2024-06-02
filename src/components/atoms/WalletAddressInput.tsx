import { Box, IconButton, InputBase, InputLabel, Typography } from "@mui/material";
import { AssetMenu } from "./AssetMenu";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

type IProps = {
  isInput?: boolean;
}

export function WalletAddressInput({ isInput }: IProps) {
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

        <InputLabel>₦1 = 0.0000000102253</InputLabel>
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
                type="number"
                fullWidth
              />
            ) : (
              <>
                  <Typography variant="h6" sx={{
                    fontSize: { sm: '1.27rem', xs: '.7rem'}
                  }}>1JWRoquJwe46mOtrC6UlZSDofJJFJJ..</Typography>

                  <IconButton>
                    <ContentCopyOutlinedIcon sx={{ color: 'white' }} />
                  </IconButton>
              </>
            )
          }
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