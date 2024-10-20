import { Box, SxProps, Theme } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { ChangeEventHandler } from 'react';

import './dark-light-toggle.css';

type IProps = {
  sx?: SxProps<Theme>;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
}
export function DarkLightToggle({ sx, value, onChange, checked }: IProps) {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
      }}
    >
      <input type="checkbox" className="checkbox" id="checkbox" value={value} onChange={onChange} checked={checked} />
      <label htmlFor="checkbox" className="checkbox-label">
        <DarkModeRoundedIcon fontSize='small' className='fa-moon' />
        <LightModeRoundedIcon fontSize='small' className="fa-sun" />
        <span className="ball"></span>
      </label>
    </Box>
  )
}