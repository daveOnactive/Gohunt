import { Box, InputBase, Typography } from "@mui/material";
import NGN from '../../../public/svg/NGN.svg';
import Image from 'next/image';
import { NumberInput } from "./NumberInput";

export function CurrencyInput({ value, onChange, disabled }: { value: any; onChange?: (value: number) => void; disabled?: boolean }) {
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
        height: 30,
        '& .Mui-disabled': {
          textFillColor : '#fff !important'
        }
      }}>
        <InputBase
          fullWidth
          value={value}
          onChange={(ev) => onChange?.(ev.target.value as unknown as number)}
          inputComponent={NumberInput as any}
          disabled={disabled}
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