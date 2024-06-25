"use client"
import { Box, Card, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { AssetsIconMapper, formatNumber } from "@/helpers";
import { useContext } from "react";
import { AssetContext } from "@/providers";
import Ellipse1 from '../../../public/svg/ellipse-1.svg';

export function OurAsset() {

  const assets = [
    {
      title: 'Bitcoin',
      icon: AssetsIconMapper['bitcoin'],
      abbr: 'BTC',
      price: 58000,
    },
    {
      title: 'Ethereum',
      icon: AssetsIconMapper['ethereum'],
      abbr: 'ETH',
      price: 58000,
    },
    {
      title: 'Tether',
      icon: AssetsIconMapper['tether'],
      abbr: 'USDT',
      price: 58000,
    }
  ]

  const { data, isLoading, getAssetRate } = useContext(AssetContext);

  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      width: '100%',
      position: 'relative'
    }}>
      <Box 
        component={Image}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
        src={Ellipse1}
        alt='ellipse'
      />
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>Our Asset</Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        justifyContent: 'center',
        flexDirection: { sm: 'row', xs: 'column' },
      }}>
        {
          assets.map((item) => (
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

                  <Typography mt={1.5} variant="caption" fontWeight={100} sx={{ opacity: .7 }}>
                    {item.title}
                  </Typography>
                </Box>

                <Box width='fit-content' minWidth='30%'>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <b>Sell Rate</b> - {!isLoading ?  getAssetRate(item.abbr, data)?.sell || '' : <Skeleton variant="text" width='30%' />}
                  </Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <b>Buy Rate</b> - {!isLoading ? getAssetRate(item.abbr, data)?.buy || '' : <Skeleton variant="text" width='30%' />}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems='center' justifyContent='space-between'>
                <Typography variant="h6">{formatNumber(item.price, true)}</Typography>
                <Typography variant="h6" fontWeight='light' sx={{ opacity: .7 }}>{item.abbr}</Typography>
              </Box>
            </Card>
          ))
        }
      </Box>
    </Box>
  )
}

