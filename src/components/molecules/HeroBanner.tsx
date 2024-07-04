'use client'
import { Box, Typography } from "@mui/material";
import BannerImg from '../../../public/img/banner.png';
import Image from "next/image";
import Dollar from '../../../public/svg/dollar.svg';
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { motion } from "framer-motion";
import { useStaggerAnimation } from "@/hooks";
import { Carousel } from ".";

export function HeroBanner(){

  const { scope } = useStaggerAnimation({
    className: ".stagger-element",
    position: 'vertical'
  });

  return (
    <Box
      sx={{
        backgroundImage: `url(${BannerImg.src})`,
        height: { sm: 700, xs: 'fit-content'},
        width: '100%',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        paddingTop: { sm: 20, xs: 10 },
        paddingX: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        position: 'relative',
      }}
    >
      <Box
        sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: { sm: 'row', xs: 'column', xl: 'row' },
        maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
        mx: 'auto'
      }}>

      <Box
        ref={scope}
        sx={{
        width: { sm: '50%', xs: '100%'}
      }}>
        <Box 
          className='stagger-element'
          sx={{
            backgroundImage: 'linear-gradient(to right bottom, #1B5373, #1184C2)',
            width: 'fit-content',
            paddingX: '16px',
            paddingY: '8px',
            borderRadius: 100,
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Image
            src={Dollar}
            alt="dollar"
            objectFit="contain"
          />
          <Typography variant="body1" ml='8px' sx={{ fontSize: { xs: '.8rem', sm: '1rem' }}}>Discover a new ways to enjoy your World!</Typography>
        </Box>
        <Typography className='stagger-element' variant="h3" mb={"35px"}>A trusted and secure cryptocurrency exchange.</Typography>
        <Typography className='stagger-element' variant="body1">We have over 15 year exprience in business consultting arena. We have over 15 year exprience in business consultting arena and artficial intelligence.</Typography>
      </Box>
      
      <Box 
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: .25 }}
        viewport={{ once: true }}
        sx={{
          zIndex: 2,
          width: { sm: '50%', xs: '100%'}
        }}
      >
        <Carousel />
      </Box>


      </Box>

      <Box
        sx={{
          backgroundImage: 'linear-gradient(180deg, rgba(15, 15, 18, 0.00) -8.82%, #0F0F12 63.66%)',
          width: '100%',
          height: '238px',
          position: 'absolute',
          bottom: 0,
          left: 0
        }}
      />
    </Box>
  )
}