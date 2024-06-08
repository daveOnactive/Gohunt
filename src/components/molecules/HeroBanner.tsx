import { Box, Typography } from "@mui/material";
import BannerImg from '../../../public/img/banner.png';
import Image from "next/image";
import BannerSide from '../../../public/img/banner-side.png';
import Dollar from '../../../public/svg/dollar.svg';
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { SCREEN_MAX_WIDTH } from "@/constant/width";

export function HeroBanner(){
  return (
    <Box
      sx={{
        backgroundImage: `url(${BannerImg.src})`,
        height: { sm: 700, xs: 'fit-content'},
        width: '100%',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        paddingTop: 30,
        paddingX: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: { sm: 'row', xs: 'column', xl: 'row' },
        maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
        mx: 'auto'
      }}>

      <Box sx={{
        width: { sm: '629px', xs: '100%'}
      }}>
        <Box sx={{
          backgroundImage: 'linear-gradient(to right bottom, #1B5373, #1184C2)',
          width: 'fit-content',
          paddingX: '16px',
          paddingY: '8px',
          borderRadius: 100,
          marginBottom: '8px',
          display: 'flex',
        }}>
          <Image
            src={Dollar}
            alt="dollar"
            objectFit="contain"
          />
          <Typography variant="body1" ml='8px'>Discover a new ways to enjoy your World!</Typography>
        </Box>
        <Typography variant="h3" mb={"35px"}>A trusted and secure cryptocurrency exchange.</Typography>
        <Typography variant="body1">We have over 15 year exprience in business consultting arena. We have over 15 year exprience in business consultting arena and artficial intelligence.</Typography>
      </Box>

      <Image
        src={BannerSide.src}
        alt="Banner side"
        width={400}
        height={300}
        objectFit="contain"
      />
      </Box>
    </Box>
  )
}