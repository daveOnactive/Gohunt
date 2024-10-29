'use client'
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import World from '../../../public/svg/world.svg';   
import World2 from '../../../public/svg/world2.svg';  // Add your light mode world image
import Shield from '../../../public/svg/Shield.svg';
import Show from '../../../public/svg/Show.svg';
import User from '../../../public/svg/User.svg';
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import Ellipse5 from '../../../public/svg/ellipse-5.svg';
import { Ellipse } from "../atoms";
import { useStaggerAnimation } from "@/hooks";
import { Element } from 'react-scroll';

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
    description: 'We support the crypto community, putting data in the hands which need it most.',
    icon: User
  }
]

export function WhyChooseUse() {
  const { scope } = useStaggerAnimation({
    className: ".stagger-why-choose-use",
    position: 'vertical'
  });

  const theme = useTheme();  // Use theme to detect light or dark mode
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box 
      component={Element}
      name='Why Choose Us'
      sx={{
        padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        display: 'flex',
        flexDirection: { sm: 'row', xs: 'column' },
        alignItems: 'center',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Conditionally render the correct world image based on the theme */}
      <Ellipse
        src={isLightMode ? World2 : World}
        alt='world'
        style={{
          width: '100%',
          transition: 'opacity 0.5s ease-in-out'  // Smooth transition
        }}
      />

      <Box ref={scope}>
        <Typography variant="h5" fontWeight='bold' mb={1.3}>Why Choose Us</Typography>
        <Typography variant="body1" mb={3.5}>
          Discover the Advantages of Trading with Us and Experience Unmatched Reliability, Security, and Support
        </Typography>

        {options.map(({ title, description, icon }) => (
          <Box
            className='stagger-why-choose-use'
            key={title}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Box
              sx={{
                width: '7rem',
                height: '7rem',
                borderRadius: '12px',
                background: isLightMode ? '#FFFFFF' : '#2F3241',  // Change background color based on light or dark mode
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: 2
              }}
            >
              <Image alt={title} src={icon} />
            </Box>

            <Box sx={{ width: { sm: '60%' } }}>
              <Typography variant="h6" fontWeight='bold' mb={1}>{title}</Typography>
              <Typography variant="body1">{description}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Ellipse
        sx={{
          position: "absolute",
          bottom: '-5%',
          left: 0,
          zIndex: -1
        }}
        src={Ellipse5}
      />
    </Box>
  );
}
