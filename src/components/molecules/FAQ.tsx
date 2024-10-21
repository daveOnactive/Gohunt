"use client"
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { useStaggerAnimation } from "@/hooks";
import { Element } from 'react-scroll';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

const faqs = [
  {
    title: 'How does GoHut Work?',
    content: `
        <p>
          To start trading crypto on our app, follow these simple steps:
        </p>
        <br />
        <ol>
          <li><b>Enter the Amount:</b> Specify how much you want to invest or trade.</li>
          <li><b>Choose the Type of Crypto:</b> Select from a range of cryptocurrencies available on our platform.</li>
          <li><b>Provide Banking or Wallet Details:</b> Enter your banking information or wallet address to complete the transaction.</li>
        </ol>
        <br />
        <p>Once you’ve completed these steps, your trade will be processed, and you’ll receive confirmation.</p>
    `,
    isHtml: true
  },
  {
    title: 'What cryptocurrencies are available for trading?',
    content: 'We offer a diverse selection of cryptocurrencies, including popular ones like Bitcoin (BTC), Ethereum (ETH), and Tether (USDT), among others. For a full list of available cryptocurrencies, please check the “Markets” section of our app.'
  },
  {
    title: 'How secure is my information?',
    content: 'We prioritize your security. Our app uses advanced encryption and security protocols to protect your personal and financial information. We also offer two-factor authentication (2FA) for added protection.'
  },
  {
    title: 'How can I contact customer support?',
    content: 'If you have any questions or need assistance, our customer support team is available 24/7. You can reach us via the “Support” section in the app, email us at support@gohuntfx.com, or use the live chat feature on our website.'
  }
];

export function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { scope } = useStaggerAnimation({
    className: ".stagger-accordion",
    position: 'vertical'
  });

  return (
    <Box 
      component={Element}
      name='FAQ'
      sx={{
        padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        width: '100%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>Frequently Asked Questions</Typography>
      <Typography variant="body1" textAlign="center" mb={4} sx={{
        width: { sm: '600px', xs: '100%' },
        display: 'flex',
        mx: 'auto',
        opacity: .7,
      }}>Find answers to common questions about using our platform and trading cryptocurrencies. If you need further assistance, our support team is here to help!</Typography>

      <Box ref={scope} mt={5}>
        {
          faqs.map(({ title, content, isHtml }, index ) => (
            <Accordion 
              key={title}
              className="stagger-accordion"
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                my: 2,
              }}
              expanded={expanded === title} 
              onChange={handleChange(title)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: theme.palette.text.primary}} />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box
                  sx={{
                    borderImage: 'linear-gradient(to left, #1F719D, #EC3363)',
                    width: '20px',
                    height: '20px',
                    borderWidth: 1,
                    borderRadius: 100,
                    borderStyle: 'solid',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '.7rem',
                    marginRight: 2,
                    borderImageSlice: 1,
                    color: theme.palette.text.primary,
                  }}
                >
                  {index + 1}
                </Box>
                {title}
              </AccordionSummary>
              <AccordionDetails>
                {!isHtml ? (
                  <Typography color={theme.palette.text.primary}>{content}</Typography>
                ) : (
                  <div 
                    dangerouslySetInnerHTML={{__html: content}} 
                    style={{color: theme.palette.text.primary}}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))
        }
      </Box>
    </Box>
  )
}