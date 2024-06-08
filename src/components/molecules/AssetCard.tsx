import { Box, Button, Typography } from "@mui/material";
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import Image from "next/image";

type IProps = {
  data: any;
  onClick: (data: any) => void;
}

export function AssetCard({ data, onClick }: IProps) {
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
        mb: 1.5,
        flexDirection: { sm: 'row', xs: 'column-reverse'}
      }}>
        <Typography variant="body2">
          <strong>{`Wallet Address: `}</strong>
          <span style={{ opacity: .7 }}>{data.walletAddress}</span>
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
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: {sm: 'center', xs: 'start'},
          width: '50%',
          gap: 2,
          flexDirection: {xs: 'column', sm: 'row' }
        }}>
          <Image alt={data.assetName} src={data.icon} />

          <Box width='100%'>
            <Typography variant="h6" pb={.5}>
              {data.assetName}
            </Typography>

            <Typography variant="body2" sx={{ opacity: .7 }}>
              {`Updated: ${data.lastUpdated}`}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body2">
            <strong>Sell Rate- </strong>
            {data.rate.sell}
          </Typography>

          <Typography variant="body2">
            <strong>Buy Rate- </strong>
            {data.rate.buy}
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}