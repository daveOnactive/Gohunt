'use client'
import { Box, InputLabel, InputBase, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { formatNumber } from "@/helpers";
import { Currency } from '@/type';
import { NumberInput } from ".";

type IProps = {
  control: Control<any>;
  defaultValue: string;
  selectedAsset: string;
  error: boolean;
  rate: number;
}

export function AmountInput({ control, defaultValue, selectedAsset, error, rate }: IProps) {
  const [amountInAsset, setAmountInAsset] = useState(0);
  const theme = useTheme();
  
  return (
    <Box sx={{
      mt: 3,
      '& label': {
        color: 'text.primary',
        fontSize: '1rem'
      }
    }}>
      <InputLabel sx={{
        mb: 2,
        color: error ? 'error.main' : 'text.primary'
      }}>
        Amount
      </InputLabel>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid',
        borderColor: error ? 'error.main' : 'divider',
        py: 1,
      }}>
        <Box
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: '75%',
            pr: 2
          }}
        >
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                sx={{ 
                  width: '100%',
                  color: 'text.primary',
                  '& .MuiInputBase-input': {
                    color: 'text.primary',
                    '&::placeholder': {
                      color: 'text.secondary',
                      opacity: 1
                    }
                  }
                }}
                onChange={(ev) => {
                  setAmountInAsset(Number(ev.target.value));
                  field.onChange(ev);
                }}
                error={error}
                placeholder="Type amount"
                defaultValue={defaultValue}
                inputComponent={NumberInput as any}
                inputProps={{
                  prefix: Currency.dollar,
                  style: {
                    color: error ? theme.palette.error.main : 'inherit'
                  }
                }}
              />
            )}
          />
        </Box>

        <Box sx={{
          width: '30%'
        }}>
          <Typography 
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 'medium'
            }}
          >
            {formatNumber(amountInAsset * rate, true)}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}