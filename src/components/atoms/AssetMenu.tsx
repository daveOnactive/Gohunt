'use client'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import Bitcoin from '../../../public/svg/Bitcoin.svg';
import ETH from '../../../public/svg/ETH.svg';
import USDT from '../../../public/svg/USDT.svg';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useModal } from '@/hooks';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

type IMenu = {
  value: string;
  label: string;
  icon: any;
};

const menu: IMenu[] = [
  {
    value: 'BTC',
    label: 'BTC',
    icon: Bitcoin
  },
  {
    value: 'ETH',
    label: 'ETH',
    icon: ETH
  },
  {
    value: 'USDT',
    label: 'USDT',
    icon: USDT
  }
];

type IProps = {
  onChange?: (value: string) => void;
}

export function AssetMenu({ onChange }: IProps) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { showModal, handleModalClose } = useModal();

  const [selectedValue, setSelectedValue] = useState<IMenu>(menu[0])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);

    if (open && !selectedValue) {
      setSelectedValue(menu[0])
    }
  };

  const handleClose = (value: IMenu) => {
    setAnchorEl(null);
    setSelectedValue(value);
    showModal(
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <ErrorOutlineRoundedIcon color='primary' sx={{
          mb: 2,
          fontSize: '3rem',
          display: 'flex',
          mx: 'auto'
        }}/>

        <Typography mb={2} variant='h6' fontWeight='bold'>Notice</Typography>

        <Typography textAlign='center' mb={2} variant='body1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit magni nisi non, a ullam inventore fugiat quia exercitationem incidunt in laudantium</Typography>

        <Button variant='contained' size='large' sx={{
            display: 'flex',
            mx: 'auto',
            width: '60%'
          }}
          onClick={handleModalClose}
        >
          Ok
        </Button>
      </Box>
    )
    onChange?.(value.value);
  };

  return (
    <div>
      <Box
        component={IconButton}
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <Image
          alt={selectedValue.value}
          src={selectedValue.icon}
          width={24}
          height={24}
        />
        <Typography variant='body1' color="white" sx={{
          fontSize: '14px',
          mx: 1
        }}>
          {selectedValue?.label}
        </Typography>

        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        elevation={0}
      >
        {
          menu.map((item) => (
            <MenuItem 
              key={item.value} 
              onClick={() => handleClose(item)}
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}
            >
              <Image
                alt={item.value}
                src={item.icon}
                width={15}
                height={15}
              />
              <Typography sx={{
                fontSize: '14px',
                mx: 1
              }}>
                {item.label}
              </Typography>
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}