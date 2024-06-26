'use client'
import { Box, SxProps, Theme } from "@mui/material";
import { useAnimationFrame } from "framer-motion";
import { CSSProperties, useRef } from "react";
import Image from "next/image";

type IProps = {
  src: any;
  sx?: SxProps<Theme>;
  style?: CSSProperties;
  alt?: string;
}

export function Ellipse({ src, sx, style, alt }: IProps) {
  const ref = useRef<HTMLElement>(null);

  useAnimationFrame((time) => {
    // Convert time to seconds
    const seconds = time / 1000;

    // Calculate a sine wave for smooth up and down motion
    const amplitude = 50; // Maximum displacement in pixels
    const frequency = 0.2; // Adjust frequency for speed of movement
    const translateY = amplitude * Math.sin(frequency * seconds * 2 * Math.PI);

    if (ref.current) {
      ref.current.style.transform = `translateY(${translateY}px)`;
    }
  })
  
  return (
    <Box
      component={Image}
      sx={sx}
      src={src}
      alt={alt || 'ellipse'}
      ref={ref}
      style={style}
    />
  )
}