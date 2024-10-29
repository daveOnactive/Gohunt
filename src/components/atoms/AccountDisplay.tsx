import { Box, InputLabel, Typography, useTheme } from "@mui/material";
import { Copy } from ".";

type IProps = {
  bankName?: string;
  bankAccount?: string;
  holdersName?: string;
}

export function AccountDisplay({ bankAccount, bankName, holdersName }: IProps) {
  const theme = useTheme();
  
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        '& label': {
          color: theme.palette.text.primary,  // This fixes the label color
          fontSize: '1rem'
        }
      }}>
        <InputLabel>Buyer&apos;s Account Details</InputLabel>
      </Box>

      <Box sx={{
        borderBottom: 1,
        borderColor: '#6a6868',
        width: '100%',
        display: 'flex',
        py: 1
      }}>
        <Box sx={{
          width: '100%',
          height: 30,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 2
        }}>
          <Typography variant="body1">{bankName}</Typography>
          <Typography variant="body1">{bankAccount}</Typography>
          <Copy
            name='Bank'
            value={bankAccount || ''}
          />
        </Box>
      </Box>

      <Typography 
        variant="h6"
        fontWeight='bold'
        sx={{
          color: '#EB832E'
        }}>
        {holdersName}
      </Typography>
    </Box>
  )
}