import { Box, Button, Typography } from "@mui/material";
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import Image from "next/image";
import { Assets } from "@/type";
import { AssetsIconMapper, formatNumber } from "@/helpers";

type IProps = {
  data: Assets;
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
        alignItems: { xs: 'self-end', sm: 'center' },
        mb: 1.5,
        flexDirection: { sm: 'row', xs: 'column-reverse'}
      }}>

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
          <Image alt={data.assetName} src={AssetsIconMapper[data.assetName.toLowerCase() as keyof typeof AssetsIconMapper]} />

          <Box width='100%'>
            <Typography variant="h6" pb={.5}>
              {data.assetName}
            </Typography>

            <Typography variant="body2" sx={{ opacity: .7 }}>
              {`Updated: 22-01-2024`}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body2">
            <strong>Sell Rate- </strong>
            {formatNumber(data.rate.sell, true)}
          </Typography>

          <Typography variant="body2">
            <strong>Buy Rate- </strong>
            {formatNumber(data.rate.buy, true)}
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}