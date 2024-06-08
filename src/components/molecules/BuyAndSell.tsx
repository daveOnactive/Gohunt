import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Card, Typography } from "@mui/material";
import connect from '../../../public/svg/connect.svg';
import wallet from '../../../public/svg/wallet.svg';
import bank from '../../../public/svg/bank.svg';
import Image from "next/image";
import { Tabs } from "../atoms";
import { TradeAsset } from "../feature";

const content = [
  {
    title: 'Connect your wallet',
    icon: connect
  },
  {
    title: 'Link your bank',
    icon: bank
  },
  {
    title: 'Start buying and selling',
    icon: wallet
  }
];

const tabs = [
  {
    title: 'Sell',
    content: (
      <TradeAsset tradeType="sell" />
    )
  },
  {
    title: 'Buy',
    content: (
      <TradeAsset tradeType="buy" />
    )
  }
]

function ContentSection() {
  return (
    <Box sx={{
      width: { sm: '50%' }
    }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>One click, instant sell & buy crypto.</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod neque nisi.
      </Typography>

      <Box mt={2.5}>
        {
          content.map((item, index) => (
            <Box key={item.title} sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 4,
              ml: { sm: index * 7 }
            }}>
              <Box sx={{
                background: '#132D46',
                width: { sm: '60px', xs: '40px'},
                height: { sm: '60px', xs: '40px'},
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image
                  alt={item.title}
                  src={item.icon}
                  style={{
                    width: '45%'
                  }}
                />
              </Box>

              <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

function CardSection() {

  return (
    <Card sx={{
      width: { sm: '30%', xs: '100%' },
      py: { sm: 2.5, xs: 2 },
      px: { sm: 1.8, xs: 1.3 },
    }}>
      <Tabs
        tabs={tabs}
      />
    </Card>
  )
}

export function BuyAndSell(){
  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: { sm: 'row', xs: 'column'},
      gap: 5,
      width: '100%'
    }}>
      <ContentSection />
      <CardSection />
    </Box>
  )
}