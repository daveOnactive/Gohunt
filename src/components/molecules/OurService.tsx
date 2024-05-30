import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Card, Grid, Typography } from "@mui/material";
import { Timeline } from "..";


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
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING }
    }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>Our service</Typography>
      <Typography variant="body1" textAlign="center" mb={4} sx={{
        width: { sm: '400px', xs: '100%'},
        display: 'flex',
        mx: 'auto'
      }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam quia sint officiis labore corporis.</Typography>

      <Timeline
        items={services}
      />
    </Box>
  )
}