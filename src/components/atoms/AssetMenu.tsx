'use client'
import { Box, Button, IconButton, Menu, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import Bitcoin from '../../../public/svg/Bitcoin.svg';
import ETH from '../../../public/svg/ETH.svg';
import USDT from '../../../public/svg/USDT.svg';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useModal } from '@/hooks';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Networks as AssetNetworks } from '@/type';
import { AssetContext } from '@/providers';

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

type INetworks = {
  BTC: string[];
  USDT: string[];
  ETH: string[];
}

const Networks: INetworks = {
  'BTC': ['Bitcoin'],
  'USDT': ['ERC20', 'TRC20'],
  'ETH': ['ERC20']
}

type IProps = {
  onChange?: (value: string) => void;
  setSelectedNetwork?: (network: any) => void;
  selectedNetwork?: AssetNetworks;
}

type IChooseNetwork = {
  asset: string;
  onChange: (ev: SelectChangeEvent<unknown>) => void;
  handleModalClose?: () => void;
}

function ChooseNetwork({ asset, onChange, handleModalClose }: IChooseNetwork) {
  const [network, setNetwork] = useState('');
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <ErrorOutlineRoundedIcon color='info' sx={{
        mb: 2,
        fontSize: '3rem',
        display: 'flex',
        mx: 'auto'
      }} />

      <Typography mb={2} variant='h6' fontWeight='bold'>Notice</Typography>

      <Typography textAlign='center' mb={2} variant='body1'>Please confirm that you are depositing {asset} to the network you selected. Mismatched address information may result in the permanent loss of your asset.</Typography>

      <Typography variant='body1' fontWeight='bold'>
        Select Network
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        variant='outlined'
        sx={{
          width: '50%',
          my: 2,
          display: 'flex',
          mx: 'auto'
        }}
        size='small'
        color='success'
        label="Age"
        onChange={(ev) => {
          onChange?.(ev)
          setNetwork(ev.target?.value as string);
        }}
      >
        {
          Networks[asset as keyof typeof Networks]?.map(network => (
            <MenuItem key={network} value={network}>{network}</MenuItem>
          ))
        }
      </Select>

      <Button 
        disabled={!(!!network)}
        variant='contained' size='large' sx={{
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
}

export function AssetMenu({ onChange, setSelectedNetwork }: IProps) {

  const { data, filterAssets } = useContext(AssetContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { showModal, handleModalClose } = useModal();

  const [selectedValue, setSelectedValue] = useState<IMenu>(menu[0]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: IMenu) => {
    setAnchorEl(null);
    setSelectedValue((preValue) => value.value ? value : preValue);

    const filteredAsset = filterAssets(data, value.value);

    showModal(
      <ChooseNetwork
        asset={value.value}
        onChange={(ev: SelectChangeEvent<unknown>) => {
          const value = ev.target.value as string;

          function getValue(network: string) {
            return filteredAsset?.networks.filter((item: any) => {
              if (item.network === network) {
                return item;
              }
            }
            )[0];
          }

          const filteredNetwork = getValue(value);

          setSelectedNetwork?.(filteredNetwork);
        }}
        handleModalClose={handleModalClose}
      />
    )
    onChange?.(value.value);
  };

  return (
    <>
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
        <Typography variant='body1' sx={{
          fontSize: '14px',
          mx: 1
        }}>
          {selectedValue?.label}
        </Typography>

        <KeyboardArrowDownIcon />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(menu[0])}
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
    </>
  )
}