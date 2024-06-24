"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMutation, useQuery, useQueryClient } from "react-query";
import Api from "@/services/api";
import { Status, Transaction } from '@/type';
import { Box, Button, Divider, TablePagination} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useAlert, useModal } from '@/hooks';
import { Tabs } from '../atoms';
import { formatDate, formatNumber } from '@/helpers';
import { TransactionDetails } from '@/components/molecules';
import { useCallback, useState } from 'react';

const StatusColorMapper = {
  "successful": "#19966C",
  "pending": "#BCAC1B",
  "failed": "#FF0318",
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

  const { showModal, handleModalClose } = useModal();

  const { showNotification } = useAlert();

  const [transaction, setTransaction] = useState<Transaction>();

  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { mutate } = useMutation({
    mutationFn: async (data: { status: Status }) => await Api.put(`/transactions/${transaction?.id}`, data)
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function onApprove() {
    mutate({
      status: Status.SUCCESSFUL
    }, {
      onSuccess: () => {
        showNotification({
          message: 'Transaction Updated!',
          type: 'success'
        });

        queryClient.invalidateQueries(['transactions'])

        handleModalClose?.();
      },
      onError: () => {
        showNotification({
          message: 'Transaction Failed to update!',
          type: 'error'
        })
      },
    });
  }

  const handleClick = useCallback(
    function handleClick(transaction: Transaction) {
      setTransaction(transaction)
      showModal(
        <TransactionDetails
          onApprove={onApprove}
          transaction={transaction}
        />
      )
    }, [transaction])

  return (
    <TableContainer component={Paper} sx={{
      backgroundColor: '#132D46'
    }} elevation={0}>
      <Divider sx={{ borderColor: 'paper' }} />
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{
            '& .MuiTableCell-root': {
              borderColor: 'paper'
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
          {transactions?.filter((item) => item.transactionType === type)?.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => handleClick(row)}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '& .MuiTableCell-root': {
                borderColor: 'paper'
              },
              cursor: 'pointer',
              '&:hover': {
                opacity: .7,
                background: '#111'
              }
            }}
          >
            <TableCell align="left">
              {formatDate(`${row.date}`)}
            </TableCell>
            <TableCell align="left">{row.asset}</TableCell>
            <TableCell align="left">{row.transactionType}</TableCell>
            <TableCell align="left">{formatNumber(Number(row.rate), true)}</TableCell>
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
            <TableCell align="left">{formatNumber(row.amount, true)}</TableCell>
            <TableCell align="left">
              {
                row.status !== Status.SUCCESSFUL && row.status !== Status.FAILED ? (
                    <Button 
                      onClick={() => handleClick(row)} 
                      variant='contained' 
                      color='success' 
                      endIcon={<CheckRoundedIcon />}>
                      Approve Trade
                    </Button>
                ) : <div />
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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