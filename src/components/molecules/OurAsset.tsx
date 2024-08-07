"use client"
import { Box, Card, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { AssetsIconMapper, formatNumber } from "@/helpers";
import { useContext, useMemo } from "react";
import { AssetContext, CryptoApiContext } from "@/providers";
import Ellipse1 from '../../../public/svg/ellipse-1.svg';
import { Ellipse } from "..";
import { useStaggerAnimation } from "@/hooks";
import { Element } from 'react-scroll';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { green, red } from "@mui/material/colors";

export function OurAsset() {

  // const { scope } = useStaggerAnimation({
  //   className: ".stagger-card",
  //   position: 'vertical'
  // });

  const {
    bitcoinData,
    ethData,
    usdtData,
    isLoadingCryptoData
  } = useContext(CryptoApiContext);

  const assets = useMemo(() => 
    [
      {
        title: 'Bitcoin',
        icon: AssetsIconMapper['bitcoin'],
        abbr: 'BTC',
        price: bitcoinData?.[0]?.quote?.USD?.price as number,
        percentageChange: bitcoinData?.[0]?.quote?.USD?.percent_change_1h
      },
      {
        title: 'Ethereum',
        icon: AssetsIconMapper['ethereum'],
        abbr: 'ETH',
        price: ethData?.[0]?.quote?.USD?.price as number,
        percentageChange: ethData?.[0]?.quote?.USD?.percent_change_1h
      },
      {
        title: 'Tether',
        icon: AssetsIconMapper['tether'],
        abbr: 'USDT',
        price: usdtData?.[0]?.quote?.USD?.price as number,
        percentageChange: usdtData?.[0]?.quote?.USD?.percent_change_1h
      }
    ], [bitcoinData, ethData, usdtData, AssetsIconMapper])

  const { data, isLoading, getAssetRate } = useContext(AssetContext);

  return (
    <Box
      component={Element}
      name='Our Asset'
      sx={{
        padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        width: '100%',
        position: 'relative'
      }}>
      <Ellipse
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
        src={Ellipse1}
      />
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>Our Asset</Typography>

      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
          justifyContent: 'center',
          flexDirection: { sm: 'row', xs: 'column' },
        }}>
        {
          assets.map((item) => (
            <Card
              className='stagger-card'
              key={item.title} 
              elevation={0} 
              sx={{
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
                {
                  isLoadingCryptoData ? null : (
                    <Box sx={{
                      display: 'flex',
                      gap: .5,
                      alignItems: 'center',
                      flexDirection: { sm: 'row', xs: 'column' }
                    }}>
                      <Typography variant="h6">{formatNumber(item.price, true, '$')}</Typography>

                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        <Box sx={{
                          color: Number(item?.percentageChange) <= 0 ? red[500] : green[500]
                        }}>{Number(item?.percentageChange).toFixed(2)} %</Box>
                        <ArrowDropUpRoundedIcon sx={{
                          color: Number(item?.percentageChange) <= 0 ? red[500] : green[500],
                          transform: Number(item?.percentageChange) <= 0 ? 'rotate(180deg)' : 'unset'
                        }}/>
                      </Box>
                    </Box>
                  )
                }
                <Typography variant="h6" fontWeight='light' sx={{ opacity: .7 }}>{item.abbr}</Typography>
              </Box>
            </Card>
          ))
        }
      </Box>
    </Box>
  )
}

