import { Box, Button, Typography } from "@mui/material";
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import { Bank } from "@/type";

type IProps = {
  data?: Bank;
  onClick: (data: any) => void;
}
export function BankDetailsCard({ data, onClick }: IProps) {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: '#132D46',
      borderRadius: '0.5rem',
      padding: 2,
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5
      }}>
        <Typography variant="body2">
          My Account Details
        </Typography>

        <Button
          size="large"
          endIcon={(
            <HistoryEduRoundedIcon />
          )}
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
        <Typography variant="h6">
          {data?.bankName}
        </Typography>

        <Typography variant="body2">
          {data?.accountNumber}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{
        color: '#EB832E'
      }}>
        {data?.holdersName}
      </Typography>

    </Box>
  )
}