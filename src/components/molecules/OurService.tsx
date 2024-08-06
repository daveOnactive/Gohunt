import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Typography } from "@mui/material";
import { Ellipse, Timeline } from "..";
import Ellipse2 from '../../../public/svg/ellipse-2.svg';
import Ellipse3 from '../../../public/svg/ellipse-3.svg';


const services = [
  {
    title: ' Cryptocurrency Trading',
    content: 'Easily buy, sell, and trade a wide variety of cryptocurrencies on our user-friendly platform. Enjoy real-time market data and seamless transactions.'
  },
  {
    title: 'Good Rates',
    content: 'Get competitive and transparent rates for all your cryptocurrency transactions. Our platform offers up-to-date exchange rates with no hidden fees, ensuring you get the best value.'
  },
  {
    title: 'Security and Compliance',
    content: 'Rest assured knowing your transactions are secure and compliant with industry standards. Our platform adheres to strict regulatory guidelines and employs advanced security measures to protect your data and assets.'
  },
  {
    title: '24/7 Customer Support',
    content: 'Get assistance whenever you need it with our dedicated 24/7 customer support. Our knowledgeable team is here to help you with any questions or issues you may encounter.'
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
      }}>Explore Our Comprehensive Suite of Services Designed to Enhance Your Crypto Trading Experience.</Typography>

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