import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Divider, Typography } from "@mui/material";
import Fb from '../../../public/svg/fb.svg';
import X from '../../../public/svg/x.svg';
import Insta from '../../../public/svg/insta.svg';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    icon: Fb,
    href: '#'
  },
  {
    icon: X,
    href: '#'
  },
  {
    icon: Insta,
    href: '#'
  }
]

const links = [
  {
    label: 'OUR ASSET',
    href: '#'
  },
  {
    label: 'OUR Service',
    href: '#'
  },
  {
    label: 'WHY CHOOSE US',
    href: '#'
  },
  {
    label: 'TESTIMONIAL',
    href: '#'
  },
  {
    label: 'FAQ',
    href: '#'
  }
]

export function Footer() {
  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING }
    }}>
      <Box mb={3} display='flex' alignItems='center' justifyContent='space-between'>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          {
            socials.map(({ href, icon }, index) => (
              <Box key={`key-${index}`} sx={{
                width: '3rem',
                height: '3rem',
                borderRadius: 100,
                background: '#2F3241',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image
                  alt={`social-${index}`}
                  src={icon}
                />
              </Box>
            ))
          }
        </Box>

        <Box sx={{
          display: 'flex',
          gap: 2
        }}>
          {
            links.map(({ href, label }) => (
              <Link href={href} key={label} style={{
                fontSize: '.9rem',
                color: 'white',
              }}>{label}</Link>
            ))
          }
        </Box>
      </Box>
      
      <Divider sx={{ background: 'white' }}/>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 3
      }}>
        <Typography variant="body2">
          Copyright © 2024GoHunt. All rights reserved.
        </Typography>

        <Box>
          <Box sx={{
            backgroundColor: '#EC3363',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 0.5,
          }}>
            <KeyboardArrowUpRoundedIcon sx={{ color: 'white'}} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}