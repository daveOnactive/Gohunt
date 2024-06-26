import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Typography } from "@mui/material";
import { Ellipse, Timeline } from "..";
import Ellipse2 from '../../../public/svg/ellipse-2.svg';
import Ellipse3 from '../../../public/svg/ellipse-3.svg';


const services = [
  {
    title: 'Excessive Speed',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Good Rate',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Liability',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Trust Worthy',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  }
];

export function OurService(){
  return (
    <Box
      id='Our Service'
      sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      position: 'relative'
    }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>Our service</Typography>
      <Typography variant="body1" textAlign="center" mb={4} sx={{
        width: { sm: '400px', xs: '100%'},
        display: 'flex',
        mx: 'auto',
        opacity: .7
      }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam quia sint officiis labore corporis.</Typography>

      <Timeline
        items={services}
      />
      <Ellipse
        sx={{
          position: "absolute",
          bottom: 0,
          left: '-25%',
          zIndex: -1
        }}
        src={Ellipse2}
      />
      <Ellipse
        sx={{
          position: "absolute",
          right: '-25%',
          bottom: '20%',
          zIndex: -1
        }}
        src={Ellipse3}
      />
    </Box>
  )
}