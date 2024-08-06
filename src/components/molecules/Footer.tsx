'use client'
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Box, Divider, Typography } from "@mui/material";
import Fb from '../../../public/svg/fb.svg';
import X from '../../../public/svg/x.svg';
import Insta from '../../../public/svg/insta.svg';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Image from "next/image";
import { useStaggerAnimation } from "@/hooks";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";

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

const links = ['Our Asset', 'Our Service', 'Why Choose Us', 'Testimonial', 'FAQ']

export function Footer() {

  const { scope } = useStaggerAnimation({
    className: ".stagger-footer",
    position: 'vertical'
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            links.map((link) => (
              <Box
                component={Link}
                className="stagger-footer"
                key={link}
                sx={{
                  color: '#fff',
                  cursor: 'pointer',
                  mx: 1,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                activeClass="active"
                to={link}
                smooth
                offset={50}
                duration={500}
              >
                {link}
              </Box>
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

        <Box className="stagger-footer" onClick={scrollToTop}>
          <Box sx={{
            backgroundColor: '#EC3363',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 0.5,
            cursor: 'pointer',
          }}>
            <KeyboardArrowUpRoundedIcon sx={{ color: 'white'}} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}