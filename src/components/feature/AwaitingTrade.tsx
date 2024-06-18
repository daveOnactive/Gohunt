'use client'
import { Transaction } from "@/type";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from 'react-query';
import Api from '@/services/api';
import { formatNumber } from "@/helpers";
import { useRouter } from "next/navigation";
import { StatusColorMapper } from "@/constant/statusColorMapper";

type IProps = {
  trade?: Transaction;
  type: 'sell' | 'buy';
  id?: string;
}

export function AwaitingTrade({ trade, type, id }: IProps) {

  const { push } = useRouter();

  const { data } = useQuery({
    queryKey: ['transaction'],
    queryFn: async () => (await Api.get(`/transactions/${id}`)).data,
    onSuccess: (data) => {
      if(!data.data) {
        push('/trade')
      }
    },
  });

  const value = trade || data?.data;

  return (
    <Box>
      <Typography mt={3} variant='h6' fontWeight='bold' textAlign='center'>Trade Status</Typography>

      <Typography my={2}><b>Amount: </b>{formatNumber(Number(value?.amount), true)}</Typography>

      {
        type === 'sell' ? (
          <Typography my={2}><b>Bank Account: </b>{value?.bankAccount} {value?.bankName} ({value?.holdersName})</Typography>
        ) : (
          <Typography my={2}><b>Wallet Address: </b>{value?.walletAddress}</Typography>
        )
      }
      <Typography mb={3}><b>Status: </b><span style={{ color: StatusColorMapper[value?.status as keyof typeof StatusColorMapper] }}>{value?.status}</span></Typography>

      <Button onClick={() => push('/trade')} fullWidth variant="contained">Dismiss</Button>
    </Box>
  );
};