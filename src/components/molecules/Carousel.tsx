"use client"
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Phone from '../../../public/img/phone.png';
import Macbook from '../../../public/img/macbook.png';
import GohuntDesign from '../../../public/img/gohunt_design.png';
import { Autoplay, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';

interface CarouselProps { }

const images = [
  {
    bg: GohuntDesign.src,
    alt: 'hero-banner',
    index: 0,
  },
  {
    bg: Phone.src,
    alt: 'hero-banner',
    index: 1,
  },
  {
    bg: Macbook.src,
    alt: 'hero-banner',
    index: 2,
  },
];

export function Carousel(props: CarouselProps) {

  return (
    <Box
      component={Swiper}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
      modules={[Autoplay, Pagination]}
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}
    >
      {
        images.map((image) => (
          <SwiperSlide key={image.index}>
            <img
              src={image.bg}
              height={300}
              width={300}
              alt={image.alt}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain'
              }}
            />
          </SwiperSlide>
        ))
      }
    </Box>
  );
}