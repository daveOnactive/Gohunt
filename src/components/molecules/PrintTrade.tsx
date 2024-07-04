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
      label: 'Your Phone Number: ',
      value: value?.phoneNumber,
    },
    {
      label: 'Transaction Type: ',
      value: value?.transactionType,
    },
    {
      label: 'Transaction Status: ',
      value: value?.status,
    },
    {
      label: 'Rate: ',
      value: value?.rate,
    }
  ]

  const buyTradeContent = [
    {
      label: 'Expected Amount: ',
      value: `${formatNumber(Number(value?.amount), true, '$')}`
    },
    {
      label: 'Amount Sent: ',
      value: `${formatNumber(Number(value?.equivalentAmount), true)}`
    },
    {
      label: 'Your Wallet Address: ',
      value: value?.walletAddress
    },
    ...defaultTradeContent
  ];

  const sellTradeContent = [
    {
      label: 'Amount Sent: ',
      value: `${formatNumber(Number(value?.amount), true, '$') }`
    },
    {
      label: 'Expected Amount: ',
      value: `${formatNumber(Number(value?.equivalentAmount), true)}`
    },
    {
      label: 'Your Bank Account: ',
      value: `${value?.bankAccount} ${value?.bankName} (${value?.holdersName})`
    },
    ...defaultTradeContent
  ];

  const content = value?.transactionType === 'sell' ? sellTradeContent : buyTradeContent;

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        style={{
          width: '80%',
          borderRadius: '10px',
          padding: '1rem',
          marginTop: '4rem',
          border: '1px solid #ccc'
        }}
      >
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

        <Typography style={{textAlign: 'center'}}>
          <strong>
            Transaction Details
          </strong>
        </Typography>
        <div style={{
          margin: '1rem 0',
          background: '#ccc',
          height: '1px',
          width: '100%'
        }}/>
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
    </Box>
  )
}