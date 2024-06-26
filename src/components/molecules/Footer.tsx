'use client'
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Divider, Typography } from "@mui/material";
import Fb from '../../../public/svg/fb.svg';
import X from '../../../public/svg/x.svg';
import Insta from '../../../public/svg/insta.svg';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Image from "next/image";
import Link from "next/link";
import { useStaggerAnimation } from "@/hooks";

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

  const { scope } = useStaggerAnimation({
    className: ".stagger-footer",
    position: 'vertical'
  });

  return (
    <Box ref={scope} sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      width: '100%'
    }}>
      <Box mb={3} sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { sm: 'row', xs: 'column' },
        justifyContent: 'space-between'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
          {
            socials.map(({ href, icon }, index) => (
              <Box className="stagger-footer" href={href} target="_blank" component={'a'} key={`key-${index}`} sx={{
                width: '3rem',
                height: '3rem',
                borderRadius: 100,
                background: '#2F3241',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  background: '#0F101E'
                }
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
          gap: 2,
          fontSize: { sm: '.9rem !important', xs: '.6rem !important'},
          mt: { xs: '1rem' }
        }}>
          {
            links.map(({ href, label }) => (
              <Link className="stagger-footer" href={href} key={label} style={{
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
        <Typography className="stagger-footer" variant="body2">
          Copyright © 2024GoHunt. All rights reserved.
        </Typography>

        <Box className="stagger-footer" >
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