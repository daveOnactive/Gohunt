"use client"
import { formatDate, formatNumber } from "@/helpers";
import { Status, Transaction } from "@/type";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { DownloadButton } from "../atoms";
import { PrintTrade } from ".";

type IProps = {
  transaction: Transaction;
  onApprove: () => void;
}
export function TransactionDetails({ transaction, onApprove }: IProps) {

  const defaultTradeContent = [
    {
      label: 'Rate: ',
      value: `${formatNumber(Number(transaction?.rate), true)}`
    },
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
      label: 'Amount to Send: ',
      value: `${formatNumber(Number(transaction?.amount), true, '$')}`
    },
    {
      label: 'Amount Received: ',
      value: `${formatNumber(Number(transaction?.equivalentAmount), true)}`
    },
    {
      label: 'Wallet Address: ',
      value: transaction?.walletAddress
    },
    ...defaultTradeContent
  ];

  const sellTradeContent = [
    {
      label: 'Amount Received: ',
      value: `${formatNumber(Number(transaction?.amount), true, '$')}`
    },
    {
      label: 'Amount to Send: ',
      value: `${formatNumber(Number(transaction?.equivalentAmount), true)}`
    },
    {
      label: 'Bank Details: ',
      value: `${transaction?.bankAccount} ${transaction?.bankName} (${transaction?.holdersName})`
    },
    ...defaultTradeContent
  ];

  const content = transaction?.transactionType === 'sell' ? sellTradeContent : buyTradeContent;

  const renderContent = (
    <>
      <Typography variant="subtitle1" mb={2} textAlign='center'>Approve Trade ({formatDate(transaction?.date || '')})</Typography>

      {
        content.map((item, index) => (
          <Typography mb={2} key={index}>
            <strong>{item.label}</strong>{item.value}
          </Typography>
        ))
      }
    </>
  )

  return (
  <>
    <Box p={2}>
      {renderContent}
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

      {transaction.status !== Status.SUCCESSFUL ?  (
        <Button
          size='large'
          color='success'
          variant="contained"
          sx={{
            display: 'flex',
            m: 'auto',
            mt: 2
          }}
          onClick={onApprove}
        >Approve</Button>
      ) : (
        <DownloadButton
          downloadContent={<PrintTrade value={transaction} />}
          filename={`transaction-${formatDate(transaction?.date)}`}
          sx={{
            display: 'flex',
            m: 'auto'
          }}
        />
      )}
    </Box>
  </>
  );
};