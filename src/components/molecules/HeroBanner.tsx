'use client'
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { motion } from "framer-motion";
import { useStaggerAnimation } from "@/hooks";
import { Carousel } from ".";
import { useTheme } from "../../contexts/ThemeContext";

export function HeroBanner() {
  const { isDarkMode } = useTheme();
  const bannerImg = '/img/banner.png'; // Move image to public folder
  const Dollar = '/svg/dollar.svg';    // Move SVG to public folder

  const { scope } = useStaggerAnimation({
    className: ".stagger-element",
    position: 'vertical'
  });

  return (
    <Box
      sx={{
        background: `url(${bannerImg}) center/cover no-repeat`,
        height: { sm: 700, xs: 'fit-content' },
        width: '100%',
        paddingTop: { sm: 20, xs: 10 },
        paddingX: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
          zIndex: 1
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { sm: 'row', xs: 'column', xl: 'row' },
          maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
          mx: 'auto',
          position: 'relative',
          zIndex: 2
        }}>

        <Box
          ref={scope}
          sx={{
            width: { sm: '50%', xs: '100%' }
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
              width={24}
              height={24}
            />
            <Typography 
              variant="body1" 
              ml='8px' 
              sx={{ 
                fontSize: { xs: '.8rem', sm: '1rem' },
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}>
              Discover a new ways to enjoy your World!
            </Typography>
          </Box>
          <Typography 
            sx={({ breakpoints }) => ({
              [breakpoints.down('md')]: {
                fontSize: '2.2rem'
              },
              color: isDarkMode ? '#FFFFFF' : '#000000'
            })}
            fontWeight='bold'
            className='stagger-element'
            variant="h2" 
            mb={"35px"}>
            Discover, Trade, and 
            <Box
              component='span'
              sx={({ palette }) => ({
                color: palette.primary.main,
                mx: 1,
              })}
            >
              Thrive in
            </Box>
            Crypto Markets with
            <Box
              component='span'
              sx={({ palette }) => ({
                color: palette.primary.main,
                mx: 1
              })}
            >
              GoHunt
            </Box>
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: .25 }}
          viewport={{ once: true }}
          sx={{
            zIndex: 2,
            width: { sm: '50%', xs: '100%' }
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
          left: 0,
          zIndex: 1
        }}
      />
    </Box>
  )
}