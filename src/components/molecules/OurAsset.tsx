import { Box, Card, Typography } from "@mui/material";
import BTC from '../../../public/svg/Bitcoin.svg';
import ETH from '../../../public/svg/ETH.svg';
import USDT from '../../../public/svg/USDT.svg';
import Image from "next/image";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";

export function OurAsset() {

  const asset = [
    {
      title: 'Bitcoin',
      icon: BTC,
      abbr: 'BTC',
      rate: {
        sell: 1000,
        buy: 1000,
      },
      price: 58000,
    },
    {
      title: 'Ethereum',
      icon: ETH,
      abbr: 'ETH',
      rate: {
        sell: 1000,
        buy: 1000,
      },
      price: 58000,
    },
    {
      title: 'Tether',
      icon: USDT,
      abbr: 'USDT',
      rate: {
        sell: 1000,
        buy: 1000,
      },
      price: 58000,
    }
  ]

  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING }
    }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>Our Asset</Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        justifyContent: 'center',
        flexDirection: { sm: 'row', xs: 'column' }
      }}>
        {
          asset.map((item) => (
            <Card key={item.title} elevation={0} sx={{
              width: { sm: '364px', xs: '100%'},
              padding: 1.5
            }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}>
                  <Image
                    src={item.icon}
                    alt={item.title}
                  />

                  <Typography mt={1.5} variant="caption" fontWeight={100}>
                    {item.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography>
                    <b>Sell Rate</b> - {item.rate.sell}
                  </Typography>
                  <Typography>
                    <b>Buy Rate</b> - {item.rate.buy}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems='center' justifyContent='space-between'>
                <Typography variant="h6">{item.price}</Typography>
                <Typography variant="h6" fontWeight='light'>{item.abbr}</Typography>
              </Box>
            </Card>
          ))
        }
      </Box>
    </Box>
  )
}