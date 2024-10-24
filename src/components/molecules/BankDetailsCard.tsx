import { Box, Button, Typography, useTheme } from "@mui/material";
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { Bank } from "@/type";

type IProps = {
  data?: Bank;
  onClick: (data: any) => void;
}

export function BankDetailsCard({ data, onClick }: IProps) {
  const theme = useTheme();

  return (
    <Box sx={{
      width: '100%',
      backgroundColor: theme.palette.mode === 'light' 
        ? theme.palette.background.paper 
        : '#132D46',
      borderRadius: '0.5rem',
      padding: 2,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[1],
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5
      }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
        >
          My Account Details
        </Typography>

        <Button
          size="large"
          endIcon={<HistoryEduRoundedIcon />}
          onClick={() => onClick(data)}
        >
          Edit
        </Button>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Typography 
          variant="h6"
          color="text.primary"
        >
          {data?.bankName}
        </Typography>

        <Typography 
          variant="body2"
          color="text.primary"
        >
          {data?.accountNumber}
        </Typography>
      </Box>

      <Typography 
        variant="h6" 
        sx={{
          color: theme.palette.mode === 'light' 
            ? '#D15F00'  // Darker orange for light mode
            : '#EB832E', // Original orange for dark mode
        }}
      >
        {data?.holdersName}
      </Typography>
    </Box>
  );
}