import { Box, InputBase, Typography } from "@mui/material";
import NGN from '../../../public/svg/NGN.svg';
import Image from 'next/image';

export function CurrencyInput() {
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
        <Image
          alt={'currency'}
          src={NGN}
        />
        <Typography variant='body1' color="white" sx={{
          fontSize: '14px',
          mx: 1
        }}>
          NGN
        </Typography>
      </Box>
    </Box>
  )
}