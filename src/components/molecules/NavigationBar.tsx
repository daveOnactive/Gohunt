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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { SCREEN_MAX_WIDTH } from '@/constant/width';
import { Breadcrumbs } from '../atoms';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  isNavBg?: boolean;
  showBreadcrumbs?: boolean;
}

const drawerWidth = 240;
const navItems = ['Our Asset', 'Our Service', 'Why Choose Us', 'Testimonial', 'FAQ'];

export function NavigationBar(props: React.PropsWithChildren<Props>) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isNavBg, setIsNavBg] = React.useState(props?.isNavBg);
  const [container, setContainer] = React.useState<HTMLElement>();

  const router = useRouter()

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
      <Box
      >
        <Image
          src={require('../../../public/img/logo.png')}
          alt='Gohunt-logo'
          style={{
            width: 150,
            height: 50,
            objectFit: 'contain',
            cursor: 'pointer'
          }}
          onClick={() => router.push('/')}
        />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0} sx={{ background: isNavBg ? '#0F101E' : 'none', }}>
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' }, display: 'flex', alignItems: 'center', width: '100%', margin: 'auto' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Image
              src={require('../../../public/img/logo.png')}
              alt='Gohunt-logo'
              style={{
                width: 150,
                height: 50,
                objectFit: 'contain',
                cursor: 'pointer'
              }}
              onClick={() => router.push('/')}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>

          <Button variant='contained' onClick={() => router.push('/trade', { scroll: false })}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" width='100%'>
        {props?.showBreadcrumbs ? <Breadcrumbs /> : null}
        {props.children}
      </Box>
    </Box>
  );
}
