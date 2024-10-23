"use client"

import { Tabs as MuiTabs, Tab as MuiTab, Box } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

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
  handleClick?: (tab: string) => void;
  activeTab?: number;
}

export function Tabs({ tabs, handleClick, activeTab = 0 }: IProps) {
  const [value, setValue] = useState(activeTab);
  const theme = useTheme();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
              color: theme.palette.mode === 'light' ? '#000' : '#fff', // Black in light mode, white in dark mode
              textTransform: 'capitalize',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'unset !important',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <MuiTab
              key={tab.title}
              label={tab.title}
              {...a11yProps(index)}
              onClick={() => handleClick?.(tab.title)}
            />
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={tab.title} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </>
  );
}
