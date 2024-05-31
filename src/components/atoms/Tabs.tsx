"use client"

import { Tabs as MuiTabs, Tab as MuiTab, Box } from '@mui/material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

type IProps = {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
}

export function Tabs({ tabs }: IProps) {
  
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="sell-and-buy-tab"
          sx={{
            '& button': {
              width: '50% !important',
              fontWeight: 'bold',
              color: '#fff',
              textTransform: 'capitalize',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'unset !important'
            }
          }}
        >
          {
            tabs.map((tab, index) => (
              <MuiTab key={tab.title} label={tab.title} {...a11yProps(index)} />
            ))
          }
        </MuiTabs>
      </Box>
      {
        tabs.map((tab, index) => (
          <CustomTabPanel key={tab.title} value={value} index={index}>
            {tab.content}
          </CustomTabPanel>
        ))
      }
    </>
  )
}