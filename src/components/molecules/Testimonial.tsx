import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Quote from '../../../public/svg/quote.svg';
import Ellipse6 from '../../../public/svg/ellipse-5.svg';
import { Ellipse } from "../atoms";

type Testimonial = {
  testimony: string;
  name: string;
}
type ITestimonialCard = {
  testimonial: Testimonial;
}

const testimonials: Testimonial[] = [
  {
    testimony: 'As a newcomer to crypto trading, the educational resources here were a game-changer. The secure wallet and real-time data made trading seamless. Highly recommended!',
    name: 'Chinedu Okafor'
  },
  {
    testimony: 'This platform has revolutionized my trading experience. The advanced tools and 24/7 support are top-notch. It\'s the best I\'ve used in years!',
    name: 'Aisha Adeyemi'
  }
]

function TestimonialCard({ testimonial }: ITestimonialCard) {
  return (
    <Card sx={{
      width: '100%',
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
        {testimonial.testimony}
      </Typography>

      <Typography variant="h6" fontWeight="bold" textAlign="center">{testimonial.name}</Typography>
    </Card>
  )
}

export function Testimonial() {
  return (
    <Box 
      id='Testimonial'
    sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      position: 'relative'
      }}>
      <Ellipse
        sx={{
          position: "absolute",
          bottom: '-10%',
          right: '5%',
          zIndex: -1
        }}
        src={Ellipse6}
      />
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>What People says about Us</Typography>
      <Typography variant="body1" textAlign="center" mb={4} sx={{
        width: { sm: '400px', xs: '100%' },
        display: 'flex',
        mx: 'auto',
        opacity: .7,
      }}>Hear from Our Satisfied Users: Real Testimonials, Real Success Stories</Typography>

        <Box
          sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: 2,
          flexDirection: { sm: 'row', xs: 'column' }
        }}>
          {
            testimonials.map(item => (
              <TestimonialCard
                key={item.name}
                testimonial={item}
              />
            ))
          }
        </Box>
    </Box>
  )
}