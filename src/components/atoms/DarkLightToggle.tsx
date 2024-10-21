import { Box, SxProps, Theme } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useTheme } from "../../contexts/ThemeContext";

import './dark-light-toggle.css';

type IProps = {
  sx?: SxProps<Theme>;
}

export function DarkLightToggle({ sx }: IProps) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
      }}
    >
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <DarkModeRoundedIcon fontSize='small' className='fa-moon' />
        <LightModeRoundedIcon fontSize='small' className="fa-sun" />
        <span className="ball"></span>
      </label>
    </Box>
  )
}