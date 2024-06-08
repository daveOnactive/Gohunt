"use client"
import { Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from '@/constant/padding';
import { usePathname } from 'next/navigation';
import { SCREEN_MAX_WIDTH } from '@/constant/width';


const breadcrumbNameMap: { [key: string]: string } = {
  '/trade': 'Trade',
  '/dashboard': 'Dashboard',
  '/dashboard/bank-details': 'Edit Bank Details',
  '/dashboard/wallet-details': 'Edit Wallet Details'
};


export function Breadcrumbs() {

  const pathnames = usePathname().split('/').filter((x) => x);

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" sx={{
        color: '#1F719D'
      }} />}
      aria-label="breadcrumb"
      sx={{
        width: '100%',
        position: 'relative',
        top: '80px',
        paddingX: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
        margin: 'auto'
      }}
    >
      <Link underline="hover" key="1" href="/" color="primary">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link underline="hover" color="primary" href={to} key={to}>
          {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  )
}