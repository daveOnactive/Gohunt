import { Transaction } from "@/type";
import { Box, Typography } from "@mui/material";
import Logo from '../../../public/img/logo.png'
import { formatNumber } from "@/helpers";

type IProp = {
  value: Transaction;
}

export function PrintTrade({ value }: Partial<IProp>) {
  const defaultTradeContent = [
    {
      label: 'Your Phone Number:',
      value: value?.phoneNumber,
    },
    {
      label: 'Transaction Status:',
      value: value?.status,
    }
  ]

  const buyTradeContent = [
    {
      label: 'Expected Coin: ',
      value: `${(Number(value?.amount) / Number(value?.rate)).toFixed(3)} ${value?.asset}`
    },
    {
      label: 'Amount Sent: ',
      value: `${formatNumber(Number(value?.amount), true)}`
    },
    {
      label: 'Your Wallet Address: ',
      value: value?.walletAddress
    },
    ...defaultTradeContent
  ];

  const sellTradeContent = [
    {
      label: 'Coin Sent: ',
      value: `${(Number(value?.amount) / Number(value?.rate)).toFixed(3)} ${value?.asset}`
    },
    {
      label: 'Expected Amount: ',
      value: `${formatNumber(Number(value?.amount), true)}`
    },
    {
      label: 'Your Bank Account: ',
      value: `${value?.bankAccount} ${value?.bankName} (${value?.holdersName})`
    },
    ...defaultTradeContent
  ];

  const content = value?.transactionType === 'sell' ? sellTradeContent : buyTradeContent;

  return (
    <Box>
      <img
        src={Logo.src}
        alt='Gohunt-logo'
        width={170}
        height={60}
        style={{
          objectFit: 'cover',
          display: 'flex',
          margin: '2rem auto',
          background: 'black'
        }}
      />

      <Typography style={{textAlign: 'center'}}>Transaction Details</Typography>

      {
        content.map((item) => (
          <Typography key={item.label} style={{
            color: 'black',
            padding: '0 2rem'
          }}>
            <strong>{item.label}</strong>{item.value}
          </Typography>
        ))
      }
    </Box>
  )
}