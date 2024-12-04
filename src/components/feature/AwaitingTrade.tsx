'use client'
import { Status, Transaction } from "@/type";
import { Box, Button, Divider, Typography } from "@mui/material";
import { convertToTime, formatDate, formatNumber } from "@/helpers";
import { useRouter } from "next/navigation";
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import { Countdown, DownloadButton, TransactionStatus } from "../atoms";
import { PrintTrade } from "../molecules";
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { AwaitingTradeSkeleton } from "../skeleton";
import { TransactionContext } from "@/providers";
import { useContext } from "react";

type IProps = {
  type: 'sell' | 'buy';
  id?: string;
}

export function AwaitingTrade({ type, id }: IProps) {

  const { push } = useRouter();

  const { transaction } = useContext(TransactionContext);

  const value = transaction as Transaction;
  const isBuy = type === 'buy';

  const tradeIsSuccessful = value?.status === Status.SUCCESSFUL;

  const tradeInfo = [
    {
      title: 'Ref Number',
      value: `#${id?.slice(0, 7)}`
    },
    {
      title: 'Payment Time',
      value: `${formatDate(value?.date)} - ${convertToTime(value?.date)}`
    },
    {
      title: 'Payment Method',
      value: isBuy ? 'Bank Transfer' : 'Wallet'
    },
    {
      title: 'Trade Type',
      value: value?.transactionType
    },
    {
      title: 'Amount',
      value: formatNumber(value?.equivalentAmount, true)
    },
    {
      title: 'Order Status',
      value: <TransactionStatus type={value?.status as Status} />
    },
  ]

  return (
    <Box>
      {
        tradeIsSuccessful ? (
          <TaskAltRoundedIcon
            sx={({ palette }) => ({
              display: 'flex',
              margin: '2rem auto',
              fontSize: '6rem',
              color: 'white',
              background: palette.success.main,
              borderRadius: '100%',
              p: 2
            })}
          />
        ) : (
            <HistoryToggleOffRoundedIcon sx={({ palette }) => ({
              display: 'flex',
              margin: '2rem auto',
              fontSize: '6rem',
              color: 'white',
              background: palette.primary.main,
              borderRadius: '100%',
              p: 2
            })} />
        )
      }

      <Typography mt={3} variant='body1' fontWeight='bold' textAlign='center'>{tradeIsSuccessful ? 'Trade Completed' : 'Pending Trade'}</Typography>

      {!tradeIsSuccessful ? (
        <Typography mt={1} variant='subtitle1' fontWeight='bold' textAlign='center'>{value?.date ? <Countdown minute={15} startTime={value?.date as any} /> : null} Minutes Remaining to Complete Your Transaction</Typography>
      ) : null}

      <Divider sx={{
        my: 2
      }} />

      {
        tradeInfo.map(item => (
          <Box 
            key={item.title}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              my: 2
            }}
          >
            <Typography>
              {item.title}
            </Typography>
            <Typography>
              <b>
                {item.value}
              </b>
            </Typography>
          </Box>
        ))
      }

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: 2
        }}
      >
        <Typography>
          {isBuy ? 'Your Wallet Address: ' : 'Your Bank Account: '}
        </Typography>
        <Typography>
          <b>
            {isBuy ? `${value?.walletAddress} (${value?.network})` : `${value?.bankAccount} ${value?.bankName} (${value?.holdersName})`}
          </b>
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}>
        <DownloadButton
          downloadContent={<PrintTrade value={value} />}
          filename={`transaction-${formatDate(value?.date)}`}
        />
        <Button size='large' onClick={() => push('/trade')} variant="contained">Dismiss</Button>
      </Box>

    </Box>
  );
};