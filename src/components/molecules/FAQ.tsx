"use client"
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

const faqs = [
  {
    title: 'How does GoHut Work?',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    title: 'What is the value of GoHut?',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    title: 'What is the value of GoHut?',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    title: 'What is the value of GoHut?',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
  }
];

export function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  return (
    <Box sx={{
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      width: '100%'
    }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>Frequently Asked Questions</Typography>
      <Typography variant="body1" textAlign="center" mb={4} sx={{
        width: { sm: '400px', xs: '100%' },
        display: 'flex',
        mx: 'auto',
        opacity: .7,
      }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Typography>


      <Box mt={5}>
        {
          faqs.map(({ title, content }, index ) => (
            <Accordion 
              key={title} 
              sx={{
                backgroundColor: '#0F101E !important',
                my: 2
              }}
              expanded={expanded === title} onChange={handleChange(title)}
              >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: 'white'}} />}
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
                  }}
                >{index + 1}
                </Box>
                {title}
              </AccordionSummary>
              <AccordionDetails>
                {content}
              </AccordionDetails>
            </Accordion>
          ))
        }
      </Box>
    </Box>
  )
}