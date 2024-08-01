'use client'
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { SelectButton } from "../atoms";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { Networks } from "@/type";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type IProps = {
  register: UseFormRegister<any>;
  control: Control<any, any>;
  value?: Networks[];
}
export function WalletAddress({ register, control, value }: IProps) {
  const { fields, append, remove} = useFieldArray({
    control,
    name: "networks",
  });

  const hasAppendValue = useRef(false);

  const networks = {
    'BTC': [
      {
        network: 'Bitcoin'
      }
    ],
    'ETH': [
      {
        network: 'ERC20'
      }
    ],
    'USDT': [
      {
        network: 'ERC20'
      },
      {
        network: 'TRC20'
      }
    ]
  }


  const params = useSearchParams();

  useEffect(() => {
    if (value && value?.length && !hasAppendValue.current) {
      value.forEach(item => {
        append({ network: item.network, value: item.value });
      });

      hasAppendValue.current = true;
    }
  }, [value]);

  const clonedNetwork = networks[params.get('name') as keyof typeof networks]

  return (
    <Box>
      {
        fields.map((field, index) => (
          <Box 
          key={field.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            my: 2
          }}>
            <Typography variant="body1">
              {(fields?.[index] as { network: string; id: string; }).network}
            </Typography>
            <TextField
              color='primary'
              variant="standard"
              fullWidth
              size='small'
              {...register(`networks.${index}.value`, {
                required: true,
                minLength: 5,
              })}
            />
            <IconButton onClick={() => remove(index)}>
              <HighlightOffRoundedIcon color='error' />
            </IconButton>
          </Box>
          
        ))
      }
      <SelectButton
        onClick={(value) => {
          append({ network: value, value: '' });
        }}
        data={
          clonedNetwork.filter((item) => clonedNetwork.includes(item))
        }
        sx={{
          my: 1.5
        }}
      >
        Add Network
      </SelectButton>
    </Box>
  );
}