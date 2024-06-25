import { Box, Typography } from "@mui/material";
import Image from "next/image";
import World from '../../../public/svg/world.svg';
import Shield from '../../../public/svg/Shield.svg';
import Show from '../../../public/svg/Show.svg';
import User from '../../../public/svg/User.svg';
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import Ellipse5 from '../../../public/svg/ellipse-5.svg';


const options = [
  {
    title: 'Clarity',
    description: 'We help you make sense of the coins, the terms, the dense charts and market changes.',
    icon: Show
  },
  {
    title: 'Confidence',
    description: 'Our markets are always up to date, sparking curiosity with real-world relevance.',
    icon: Shield
  },
  {
    title: 'Community',
    description: 'We supports the crypto community, putting data in the hands which need it most.',
    icon: User
  }
]

export function WhyChooseUse() {
  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      display: 'flex',
      flexDirection: { sm: 'row', xs: 'column' },
      alignItems: 'center',
      width: '100%',
      position: 'relative'
    }}>
      <Box>
        <Image
          alt='world'
          src={World}
          style={{
            width: '100%'
          }}
        />
      </Box>

      <Box>
        <Typography variant="h5" fontWeight='bold' mb={1.3}>Why Choose Us</Typography>
        <Typography variant="body1" mb={3.5}>Become a crypto owner in minutes using your debit or credit card and quickly purchase top cryptocurrencies.</Typography>

        {
          options.map(({ title, description, icon }) => (
            <Box key={title} sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <Box sx={{
                width: '7rem',
                height: '7rem',
                borderRadius: '12px',
                background: '#2F3241',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: 2,
              }}>
                <Image
                  alt={title}
                  src={icon}
                />
              </Box>

              <Box sx={{
                width: { sm: '60%' }
              }}>
                <Typography variant="h6" fontWeight='bold' mb={1}>{title}</Typography>
                <Typography variant="body1">{description}</Typography>
              </Box>
            </Box>
          ))
        }
      </Box>

      <Box
        component={Image}
        sx={{
          position: "absolute",
          bottom: '-5%',
          left: 0,
          zIndex: -1
        }}
        src={Ellipse5}
        alt='ellipse'
      />
    </Box>
  )
}