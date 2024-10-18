import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Whatsapp from '../../../public/img/whatsapp.png';

const whatsAppNumber = process.env.WHATSAPP_NUMBER;

export function WhatsAppBtn() {
  
  return (
    <Box
      component='a'
      href={`https://wa.me/${whatsAppNumber}`}
      target="_blank"
      sx={({ palette: { background, text }}) => ({
        position: 'fixed',
        right: '2%',
        bottom: '5%',
        background: background.paper,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: text.primary,
        padding: .7,
        borderRadius: 100,
        '& span': {
          display: 'none',
        },
        '&:hover': {
          '& span': {
            display: 'block',
          },
        },
      })}
    >
      <Image
        src={Whatsapp.src}
        height={32}
        width={32}
        alt='whatsapp_icon'
      />
      <Typography component='span' variant="body1" fontWeight='bold'>Chat With us on WhatsApp</Typography>
    </Box>
  )
}