import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Quote from '../../../public/svg/quote.svg';


function TestimonialCard() {
  return (
    <Card sx={{
      width: { sm: '600px', xs: '100%' },
      p: { sm: 4, xs: 2 }
    }}>
      <Box
        sx={{
          mb: 2
        }}
      >
        <Image
          alt='quote-icon'
          src={Quote}
        />
      </Box>

      <Typography textAlign="center" variant="body1" mb={2}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </Typography>

      <Typography variant="h6" fontWeight="bold" textAlign="center">john smith</Typography>
      <Typography textAlign="center" variant="body1" sx={{opacity: .7 }}>
        Founder of Awesomeux Technology
      </Typography>
    </Card>
  )
}

export function Testimonial() {
  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING }
    }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>What People says about Us</Typography>
      <Typography variant="body1" textAlign="center" mb={4} sx={{
        width: { sm: '400px', xs: '100%' },
        display: 'flex',
        mx: 'auto',
        opacity: .7,
      }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Typography>

      
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 2
      }}>
        <TestimonialCard />
        <TestimonialCard />
      </Box>
    </Box>
  )
}