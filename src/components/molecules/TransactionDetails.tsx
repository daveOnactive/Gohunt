import { formatDate, formatNumber } from "@/helpers";
import { Transaction } from "@/type";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

type IProps = {
  transaction: Transaction;
  onApprove: () => void;
}
export function TransactionDetails({ transaction, onApprove }: IProps) {

  const defaultTradeContent = [
    {
      label: 'Phone Number: ',
      value: transaction?.phoneNumber,
    },
    {
      label: 'Transaction Status: ',
      value: transaction?.status,
    }
  ]

  const buyTradeContent = [
    {
      label: 'Coin to Send: ',
      value: `${(Number(transaction?.amount) / Number(transaction?.rate)).toFixed(3)} ${transaction?.asset}`
    },
    {
      label: 'Amount Received: ',
      value: `${formatNumber(Number(transaction?.amount), true)}`
    },
    {
      label: 'Wallet Address: ',
      value: transaction?.walletAddress
    },
    ...defaultTradeContent
  ];

  const sellTradeContent = [
    {
      label: 'Coin Received: ',
      value: `${(Number(transaction?.amount) / Number(transaction?.rate)).toFixed(3)} ${transaction?.asset}`
    },
    {
      label: 'Amount to Send: ',
      value: `${formatNumber(Number(transaction?.amount), true)}`
    },
    {
      label: 'Bank Details: ',
      value: `${transaction?.bankAccount} ${transaction?.bankName} (${transaction?.holdersName})`
    },
    ...defaultTradeContent
  ];

  const content = transaction?.transactionType === 'sell' ? sellTradeContent : buyTradeContent;

  return (
  <>
    <Box p={2}>
      <Typography variant="subtitle1" mb={2} textAlign='center'>Approve Trade ({formatDate(transaction?.date || '')})</Typography>

      {
        content.map((item, index) => (
          <Typography mb={2} key={index}>
            <strong>{item.label}</strong>{item.value}
          </Typography>
        ))
      }

      <Typography textAlign='center' mb={2}>Payment Screenshot</Typography>
      <Image 
        src={transaction?.screenshotUrl || ''}
        alt={transaction?.transactionType || ''}
        width={200}
        height={200}
        style={{
          objectFit: 'contain',
          display: 'flex',
          margin: 'auto',
        }}
      />

      <Button 
        size='large' 
        color='success' 
        variant="contained" 
        sx={{
          display: 'flex',
          m: 'auto'
        }}
        onClick={onApprove}
        >Approve</Button>
    </Box>
  </>
  );
};