'use client'
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Card, Typography, useTheme } from "@mui/material";
import connect from '../../../public/svg/connect.svg';
import wallet from '../../../public/svg/wallet.svg';
import bank from '../../../public/svg/bank.svg';
import Image from "next/image";
import { Ellipse, Tabs } from "../atoms";
import { TradeAsset } from "../feature";
import Ellipse4 from '../../../public/svg/ellipse-4.svg';
import { useStaggerAnimation } from "@/hooks";
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

const content = [
  {
    title: 'Enter the Amount',
    icon: connect
  },
  {
    title: 'Choose Your Cryptocurrency',
    icon: wallet
  },
  {
    title: 'Provide Your Banking or Wallet Details',
    icon: bank
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
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  const { scope } = useStaggerAnimation({
    className: ".stagger-icon",
    position: 'horizontal'
  });

  return (
    <Box
      ref={scope}
      sx={{
        width: { sm: '50%' },
        color: theme.palette.text.primary
      }}>
      <Typography className='stagger-icon' variant="h5" fontWeight="bold" mb={2}>One click, instant sell & buy crypto.</Typography>
      <Typography className='stagger-icon'>
        Effortlessly Trade Your Favorite Cryptocurrencies in Three Simple Steps
      </Typography>

      <Box mt={2.5}>
        {
          content.map((item, index) => (
            <Box 
              key={item.title} 
              className='stagger-icon'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
                ml: { sm: index * 7 }
              }}>
              <Box sx={{
                background: isDarkMode ? '#132D46' : '#E0E0E0',
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

      <Ellipse
        sx={{
          position: "absolute",
          top: '60%',
          right: '-2%',
          zIndex: -1
        }}
        src={Ellipse4}
      />
    </Box>
  )
}

function CardSection() {
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  const { scope } = useStaggerAnimation({
    className: ".stagger-tab",
    position: 'horizontal'
  });

  return (
    <Card
      ref={scope}
      className="stagger-tab"
      sx={{
        width: { sm: '30%', xs: '100%' },
        py: { sm: 2.5, xs: 2 },
        px: { sm: 1.8, xs: 1.3 },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}>
      <Tabs
        tabs={tabs}
      />
    </Card>
  )
}

export function BuyAndSell(){
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: { sm: 'row', xs: 'column'},
      gap: 5,
      width: '100%',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    }}>
      <ContentSection />
      <CardSection />
    </Box>
  )
}