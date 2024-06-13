"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from "react-query";
import Api from "@/services/api";
import { Transaction } from '@/type';

const StatusColorMapper = {
  "successful": "#19966C",
  "pending": "#BCAC1B",
  "failed": "#FF0318",
}


export function TransactionList(){
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
  ];

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => (await Api.get('/transactions')).data
  });

  return (
      <TableContainer component={Paper} sx={{
        backgroundColor: 'transparent'
      }} elevation={0}>
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
              <TableCell align="left">{row.bankAccount}</TableCell>
              <TableCell align="left">{row.bankName}</TableCell>
              <TableCell align="left">{row.holdersName}</TableCell>
              <TableCell align="left">{row.walletAddress}</TableCell>
              <TableCell align="left" sx={{ color: StatusColorMapper[row.status as keyof typeof StatusColorMapper] }}>{row.status}</TableCell>
              <TableCell align="left">{row.phoneNumber}</TableCell>
              <TableCell align="left">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
  )
}