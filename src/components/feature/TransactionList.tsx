"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "@/services/api";
import { Status, Transaction } from '@/type';
import { Backdrop, Box, CircularProgress, Divider, IconButton } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useAlert, useConfirm } from '@/hooks';
import { useState } from 'react';
import { Tabs } from '../atoms';

const StatusColorMapper = {
  "successful": "#19966C",
  "pending": "#BCAC1B",
  "failed": "#FF0318",
}

type ITableActions = {
  id?: string;
}

export function TableActions({ id }: ITableActions) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { mutate } = useMutation({
    mutationFn: (data: { status: Status }) => Api.put(`/transactions/${id}`, data)
  });

  const { showDialog } = useConfirm();
  const { showNotification } = useAlert();

  const queryClient = useQueryClient();

  function handleClick(status: Status) {
    showDialog({
      title: 'Confirm Transaction',
      onConfirm: () => {
        handleOpen()
        mutate({
          status
        }, {
          onSuccess: () => {
            showNotification({
              message: 'Transaction Updated!',
              type: 'success'
            });

            queryClient.invalidateQueries(['transactions'])
          },
          onError: () => {
            showNotification({
              message: 'Transaction Failed to update!',
              type: 'error'
            })
          },
          onSettled: () => handleClose()
        });
      }
    })
  }

  return (
  <>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center'
      }}
    >
      <IconButton onClick={() => handleClick(Status.FAILED)}>
        <ClearRoundedIcon color='error'/>
      </IconButton>

      <IconButton onClick={() => handleClick(Status.SUCCESSFUL)}>
        <CheckRoundedIcon color='success' />
      </IconButton>
    </Box>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </>
  )
}

type ITransactionTable = {
  transactions?: Transaction[];
  type: 'sell' | 'buy';
}

export function TransactionTable({ transactions, type }: ITransactionTable) {
  const tableHeader = [
    {
      title: 'Date',
      align: 'left'
    },
    {
      title: 'Asset',
      align: 'left'
    },
    {
      title: 'Transaction',
      align: 'left'
    },
    {
      title: 'Rate',
      align: 'left'
    },
    {
      title: 'Bank Account',
      align: 'left'
    },
    {
      title: 'Bank Name',
      align: 'left'
    },
    {
      title: 'Bank Holder\'s Name',
      align: 'left'
    },
    {
      title: 'Wallet Address',
      align: 'left'
    },
    {
      title: 'Status',
      align: 'left'
    },
    {
      title: 'Phone Number',
      align: 'left'
    },
    {
      title: 'Amount',
      align: 'left'
    }
  ].filter((item) => {
    if(type === 'sell') {
      return item.title !== 'Wallet Address';
    }
    return item.title !== 'Bank Account' && item.title !== 'Bank Name' && item.title !== 'Bank Holder\'s Name'
  });

  return (
    <TableContainer component={Paper} sx={{
      backgroundColor: 'transparent'
    }} elevation={0}>
      <Divider sx={{ borderColor: '#2A2F45' }} />
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{
            '& .MuiTableCell-root': {
              borderColor: '#2A2F45'
            }
          }}>
            {
              tableHeader.map((item) => (
                <TableCell key={item.title} align={item.align as any}>{item.title}</TableCell>
              ))
            }
            <TableCell />
          </TableRow>
        </TableHead>
      <TableBody>
        {transactions?.map((row) => (
          <TableRow
            key={row.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '& .MuiTableCell-root': {
                borderColor: '#2A2F45'
              }
            }}
          >
            <TableCell align="left">
              {`${row.date}`}
            </TableCell>
            <TableCell align="left">{row.asset}</TableCell>
            <TableCell align="left">{row.transactionType}</TableCell>
            <TableCell align="left">{row.rate}</TableCell>
            {
              type === 'sell' ? (
                <>
                  <TableCell align="left">{row.bankAccount}</TableCell>
                  <TableCell align="left">{row.bankName}</TableCell>
                  <TableCell align="left">{row.holdersName}</TableCell>
                </>
              ) : null
            }
            {type === 'buy' ? <TableCell align="left">{row.walletAddress}</TableCell> : null}
            <TableCell align="left" sx={{ color: StatusColorMapper[row.status as keyof typeof StatusColorMapper] }}>{row.status}</TableCell>
            <TableCell align="left">{row.phoneNumber}</TableCell>
            <TableCell align="left">{row.amount}</TableCell>
            <TableCell align="left">
              {
                row.status !== Status.SUCCESSFUL && row.status !== Status.FAILED ? (
                  <TableActions id={row.id}/>
                ) : <div />
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>

  )
}

export function TransactionList(){

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => (await Api.get('/transactions')).data
  });

  return (
    <Box sx={{
      '& .MuiTabs-flexContainer': {
        justifyContent: 'center !important'
      }
    }}>
      <Tabs
        tabs={[
          {
            title: 'Sell',
            content: <TransactionTable type='sell' transactions={transactions} />
          },
          {
            title: 'Buy',
            content: <TransactionTable type='buy' transactions={transactions} />
          }
        ]}
      />
    </Box>
  )
}