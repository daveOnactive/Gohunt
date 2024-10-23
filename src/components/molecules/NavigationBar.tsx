"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SCREEN_MAX_WIDTH } from '@/constant/width';
import { Breadcrumbs, Ellipse, WhatsAppBtn, DarkLightToggle } from '../atoms';
import { Link } from 'react-scroll';
import CurrencyBitcoinRoundedIcon from '@mui/icons-material/CurrencyBitcoinRounded';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Typography } from '@mui/material';
import Ellipse1 from '../../../public/svg/ellipse-1.svg';
import AuthButton from '../feature/AuthButton.client';
import { useTheme } from '@mui/material/styles';


interface Props {
  window?: () => Window;
  isNavBg?: boolean;
  showBreadcrumbs?: boolean;
  isDashboard?: boolean;
}

const drawerWidth = 240;
const navItems = ['Our Asset', 'Our Service', 'Why Choose Us', 'Testimonial', 'FAQ'];

const navIcon = [
  <CurrencyBitcoinRoundedIcon color='primary' sx={{ fontSize: '2.2rem' }} key={1} />, 
  <LanRoundedIcon color='primary' sx={{ fontSize: '2.2rem' }} key={2} />, 
  <VolunteerActivismRoundedIcon color='primary' sx={{ fontSize: '2.2rem' }} key={3} />, 
  <SentimentSatisfiedRoundedIcon color='primary' sx={{ fontSize: '2.2rem' }} key={4} />, 
  <HelpOutlineRoundedIcon color='primary' sx={{ fontSize: '2.2rem' }} key={5} />
];

export function NavigationBar(props: React.PropsWithChildren<Props>) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isNavBg, setIsNavBg] = React.useState(props?.isNavBg);
  const [container, setContainer] = React.useState<HTMLElement>();
  const { isDashboard } = props;
  const router = useRouter();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (props?.isNavBg) return;
    if (window.scrollY > 10) setIsNavBg(true);
    else setIsNavBg(false);
  };

  React.useEffect(() => {
    handleScroll();
    if (window) setContainer(window.document.body);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box>
        <Image
          src={isNavBg || theme.palette.mode !== 'light' 
            ? require('../../../public/img/logo.png') // Default logo when scrolled or in dark mode
            : require('../../../public/img/logo2.png') // Light mode logo when not scrolled
          }
          alt='Gohunt-logo'
          style={{ width: 150, height: 50, objectFit: 'contain', cursor: 'pointer' }}
          onClick={() => router.push('/')}
        />
      </Box>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={`${item}-${index}`} disablePadding>
            <Box
              component={Link}
              activeClass="active"
              to={item}
              onClick={() => setMobileOpen(false)}
              smooth
              offset={50}
              duration={500}
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                my: 1,
                flexDirection: 'column',
                gap: .5,
                alignItems: 'center',
                color: isNavBg || theme.palette.mode !== 'light' 
                  ? '#fff'  // White when scrolled or in dark mode
                  : '#000', // Black in light mode (when not scrolled)
              }}>
              {navIcon[index]}
              <Typography variant='subtitle2'>{item}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleSetActive = (to: any) => {
    console.log({ to });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          background: isNavBg
            ? '#0F101E'
            : theme.palette.mode === 'light'
              ? '#fff'
              : 'none',
          boxShadow: theme.palette.mode === 'light'
            ? '0px 8px 10px 0px hsla(0, 0%, 81%, 0.25)'
            : 'none',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            margin: 'auto',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Image
              src={isNavBg || theme.palette.mode !== 'light' 
                ? require('../../../public/img/logo.png') // Default logo when scrolled or in dark mode
                : require('../../../public/img/logo2.png') // Light mode logo when not scrolled
              }
              alt='Gohunt-logo'
              style={{ width: 150, height: 50, objectFit: 'contain', cursor: 'pointer' }}
              onClick={() => router.push('/')}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Box
                component={Link}
                key={item}
                sx={{
                  color: isNavBg || theme.palette.mode !== 'light' 
                    ? '#fff'  // White when scrolled or in dark mode
                    : '#000', // Black in light mode when not scrolled
                  cursor: 'pointer',
                  mx: 1,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                activeClass="active"
                to={item}
                smooth
                offset={50}
                duration={500}
                onSetActive={handleSetActive}
              >
                {item}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DarkLightToggle />
            {isDashboard ? <AuthButton /> : (
              <Button variant='contained' onClick={() => router.push('/trade', { scroll: false })}>
                Get Started
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: '#0F0F12',
            },
            position: 'relative',
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box component="main" width='100%'>
        {props?.showBreadcrumbs ? <Breadcrumbs /> : null}
        {props.children}
      </Box>

      <WhatsAppBtn />
    </Box>
  );
}
