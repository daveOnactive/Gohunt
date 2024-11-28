'use client'
import { BankAccounts } from "@/type";
import { Box, InputLabel, InputBase, Typography, Skeleton, useTheme } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

type IValue = {
  accountNumber: string;
  holdersName: string;
  bankName: string;
}

type IProps = {
  onChange?: (value: string) => void;
  onBankChange?: (bank?: BankAccounts) => void;
  value?: Partial<IValue>;
  banks?: BankAccounts[];
  bankHolderName?: string;
  isLoadingHolderName?: boolean;
  isHolderNameError?: boolean;
}

export function AccountInput({ 
  value, 
  onChange, 
  onBankChange, 
  banks, 
  bankHolderName, 
  isLoadingHolderName, 
  isHolderNameError 
}: IProps) {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        '& label': {
          color: theme.palette.text.primary,  
          fontSize: '1rem'
        }
      }}>
        <InputLabel
          sx={{
            color: theme.palette.text.primary, 
            fontSize: '1rem',
          }}
        >
          Seller&apos;s Account Details
        </InputLabel>

      </Box>
      
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider',
        width: '100%',
        display: 'flex',
        py: 1,
        mb: 1
      }}>
        <Box sx={{
          width: '70%',
          borderRight: 1,
          borderColor: 'divider',
          height: 30,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 2
        }}>
          <InputBase
            type="number"
            fullWidth
            placeholder='Type the account number'
            defaultValue={value?.accountNumber}
            onChange={(ev) => onChange?.(ev.target.value)}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              '& .MuiInputBase-input': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                '&::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 0.7
                }
              }
            }}
          />
        </Box>

        <Box sx={{
          display: 'flex',
          mx: 'auto',
          overflowX: 'hidden'
        }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={banks?.map(bank => bank.name) || []}
            defaultValue={value?.bankName}
            onChange={(_ev, value) => {
              const bank = banks?.filter(bank => bank.name === value)[0]
              onBankChange?.(bank);
            }}
            sx={{
              display: 'inline-block',
              '& input': {
                width: 200,
                overflowX: 'hidden',
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                '&::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 0.7
                }
              },
              '& .MuiAutocomplete-listbox': {
                bgcolor: theme.palette.background.paper,
                color: theme.palette.mode === 'dark' ? '#fff' : '#000'
              },
              '& .MuiAutocomplete-option': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                '&:hover': {
                  bgcolor: theme.palette.action.hover
                },
                '&[aria-selected="true"]': {
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText
                }
              }
            }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input 
                  type="text" 
                  {...params.inputProps} 
                  style={{
                    outline: 'none',
                    border: 'none',
                    width: '100%',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    background: 'transparent',
                    padding: '8px 12px',
                    overflowX: 'hidden'
                  }}
                  placeholder="Select bank"
                />
              </div>
            )}
          />
        </Box>
      </Box>
      
      {isLoadingHolderName ? (
        <Skeleton 
          variant="text" 
          height={45} 
          width='30%' 
          sx={{ bgcolor: theme.palette.action.hover }} 
        />
      ) : (
        <Typography 
          variant='h6' 
          fontWeight='bold' 
          sx={{
            color: isHolderNameError ? theme.palette.error.main : theme.palette.primary.main
          }}
        >
          {isHolderNameError ? 'Invalid account number or bank' : bankHolderName}
        </Typography>
      )}
    </Box>
  )
}