import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const data = [
  {
    id: 1,
    date: '23-03-2024',
    asset: 'Bitcoin',
    transaction: 'Sell',
    rate: 1000,
    bankAccount: '0987654321',
    bankName: 'Access bank',
    holdersName: 'Chido',
    walletAddress: 'fmibgurbgrbgr',
    status: 'Successful',
    phoneNumber: '09088763354',
    amount: 500000
  },
  {
    id: 2,
    date: '23-03-2024',
    asset: 'Bitcoin',
    transaction: 'Sell',
    rate: 1000,
    status: 'Pending',
    phoneNumber: '09088763354',
    amount: 500000,
    bankAccount: '0987654321',
    bankName: 'Access bank',
    holdersName: 'Chido',
    walletAddress: 'fmibgurbgrbgr',
  },
  {
    id: 3,
    date: '23-03-2024',
    asset: 'Bitcoin',
    transaction: 'Sell',
    rate: 1000,
    status: 'Failed',
    phoneNumber: '09088763354',
    amount: 500000,
    bankAccount: '0987654321',
    bankName: 'Access bank',
    holdersName: 'Chido',
    walletAddress: 'fmibgurbgrbgr',
  }
];

const StatusColorMapper = {
  "Successful": "#19966C",
  "Pending": "#BCAC1B",
  "Failed": "#FF0318",
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
          {data.map((row) => (
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
                  {row.date}
                </TableCell>
                <TableCell align="left">{row.asset}</TableCell>
                <TableCell align="left">{row.transaction}</TableCell>
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