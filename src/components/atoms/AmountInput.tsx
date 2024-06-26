import { Box, InputLabel, InputBase, Typography } from "@mui/material";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { formatNumber } from "@/helpers";

type IProps = {
  control: Control<any>;
  defaultValue: string;
  selectedAsset: string;
  error: boolean;
  rate: number;
}

export function AmountInput({ control, defaultValue, selectedAsset, error, rate }: IProps){
  const [amountInAsset, setAmountInAsset] = useState(0);
  
  return (
    <Box sx={{
      mt: 3,
      '& label': {
        color: 'white',
        fontSize: '1rem'
      }
    }}>
      <InputLabel sx={{
        mb: 2,
      }}>Amount in {selectedAsset}</InputLabel>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid',
        borderColor: '#6a6868',
        py: 1,
      }}>
        <Box
          sx={{
            borderRight: 1,
            borderColor: '#6a6868',
            width: '75%'
          }}
        >
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                type="number"
                sx={{ width: '100%' }}
                onChange={(ev) => {
                  setAmountInAsset(Number(ev.target.value));

                  field.onChange(ev);
                }}
                error={error}
                placeholder="Type amount"
                defaultValue={defaultValue}
              />
            )}
            rules={{ required: true }}
          />
        </Box>

        <Box sx={{
          width: '30%'
        }}>
          <Typography variant="body1">
            {formatNumber(amountInAsset * rate, true)}
          </Typography>
        </Box>

      </Box>
    </Box>
  )
}