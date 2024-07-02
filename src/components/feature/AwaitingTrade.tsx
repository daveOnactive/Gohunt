'use client'
import { Status, Transaction } from "@/type";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from 'react-query';
import Api from '@/services/api';
import { formatDate, formatNumber } from "@/helpers";
import { useRouter } from "next/navigation";
import { StatusColorMapper } from "@/constant/statusColorMapper";
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import { Countdown, DownloadButton } from "../atoms";
import { PrintTrade } from "../molecules";
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { AwaitingTradeSkeleton } from "../skeleton";

type IProps = {
  trade?: Transaction;
  type: 'sell' | 'buy';
  id?: string;
}

export function AwaitingTrade({ trade, type, id }: IProps) {

  const { push } = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['transaction'],
    queryFn: async () => (await Api.get(`/transactions/${id}`)).data,
    onSuccess: (data) => {
      if(!data.data) {
        push('/trade')
      }
    },
    refetchInterval: 7000,
  });

  const value = data?.data as Transaction;
  const isBuy = type === 'buy';

  const tradeIsSuccessful = value?.status === Status.SUCCESSFUL;

  if (isLoading) return <AwaitingTradeSkeleton />;

  return (
    <Box>
      {
        tradeIsSuccessful ? (
          <TaskAltRoundedIcon
          color = 'success' 
          sx = {{
            display: 'flex',
            margin: '2rem auto',
            fontSize: '6rem'
          }}
          />
        ) : (
          <HistoryToggleOffRoundedIcon color='primary' sx={{
            display: 'flex',
            margin: '2rem auto',
            fontSize: '6rem'
          }} />
        )
      }

      {tradeIsSuccessful ? (
        <Typography mt={3} variant='subtitle1' fontWeight='bold' textAlign='center'>Trade Successful</Typography>
      ) : (
        <Typography mt={3} variant='subtitle1' fontWeight='bold' textAlign='center'>{value?.date ? <Countdown minute={15} startTime={value?.date as any} /> : null} Minutes Remaining to Complete Your Transaction</Typography>
      )}
        
      
      <Typography my={2}><b>Rate: </b>{formatNumber(Number(value?.rate || 0), true)}</Typography>

      <Typography variant="body1" my={2}><b>{isBuy ? 'Expected Amount:' : 'Amount Sent:'} </b>{formatNumber(value?.amount, true, '$')}</Typography>

      <Typography my={2}><b>{isBuy ? 'Amount Sent:' : 'Expected Amount:'} </b>{formatNumber(Number(value?.equivalentAmount), true)}</Typography>

      {isBuy ? (
        <Typography my={2}><b>Your Wallet Address: </b>{value?.walletAddress}</Typography>
      ) : (
        <Typography my = { 2 }><b>Your Bank Account: </b>{ value?.bankAccount } { value?.bankName } ({ value?.holdersName })</Typography >
      )}

      <Typography my={2}><b>Your Phone Number: </b>{value?.phoneNumber}</Typography>

      <Typography mb={3}><b>Transaction Status: </b><span style={{ color: StatusColorMapper[value?.status as keyof typeof StatusColorMapper] }}>{value?.status}</span></Typography>

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