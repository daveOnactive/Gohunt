"use client"
import { useMutation, useQueryClient } from "react-query";
import Api from "@/services/api";
import { Status, Transaction } from '@/type';
import { Box } from '@mui/material';
import { useAlert, useEmail, useModal } from '@/hooks';
import { Table, Tabs, TransactionStatus } from '../atoms';
import { formatDate, formatNumber } from '@/helpers';
import { TransactionDetails } from '@/components/molecules';
import React, { useCallback, useContext, useState } from 'react';
import { TransactionContext } from "@/providers";

type ITransactionTable = {
  transactions?: Transaction[];
  type: 'sell' | 'buy';
}

type TableColum = {
  field: string;
  align: string;
  headerName: string;
  valueGetter?: (value: Transaction) => string | React.ReactNode;
}

export function TransactionTable({ transactions, type }: ITransactionTable) {

  const defaultColumn: TableColum[] = [
    {
      field: 'date',
      align: 'left',
      headerName: 'Date',
      valueGetter: (value) => `${formatDate(`${value.date}`) }`
    },
    {
      field: 'asset',
      align: 'left',
      headerName: 'Asset',
    },
    {
      field: 'transactionType',
      align: 'left',
      headerName: 'Transaction',
    },
    {
      field: 'rate',
      align: 'left',
      headerName: 'Rate',
      valueGetter: (value) => `${formatNumber(Number(value.rate), true)}`
    },
    {
      field: 'amount',
      align: 'left',
      headerName: 'Amount in USD',
      valueGetter: (value) => `${formatNumber(value.amount, true, '$')}`
    },
    {
      field: 'equivalentAmount',
      align: 'left',
      headerName: 'Amount',
      valueGetter: (value) => `${formatNumber(value.equivalentAmount, true)}`
    },
    {
      field: 'status',
      align: 'left',
      headerName: 'Status',
      valueGetter: (value) => (
        <TransactionStatus
          type={value.status as Status}
        />
      )
    },
    {
      field: 'phoneNumber',
      align: 'left',
      headerName: 'Phone Number',
    },
  ]

  const sellTable = [
    ...defaultColumn,
    {
      field: 'bankAccount',
      align: 'left',
      headerName: 'Bank Account',
    },
    {
      field: 'bankName',
      align: 'left',
      headerName: 'Bank Name',
    },
    {
      field: 'holdersName',
      align: 'left',
      headerName: 'Bank Holder\'s Name',
    },
  ];

  const buyTable = [
    ...defaultColumn,
    {
      field: 'walletAddress',
      align: 'left',
      headerName: 'Wallet Address',
    },
    {
      field: 'network',
      align: 'left',
      headerName: 'Network Type',
    },
  ];

  const { showModal, handleModalClose } = useModal();

  const { showNotification } = useAlert();

  const [transaction, setTransaction] = useState<Transaction>();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: { status: Status }) => await Api.put(`/transactions/${transaction?.id}`, data)
  });

  const { buyOrderConfirm, sellOrderConfirm } = useEmail();

  function handleSentEmail(transaction: Transaction) {
    if (type === 'sell') {
      sellOrderConfirm(transaction);
    } else {
      buyOrderConfirm(transaction);
    }
  }

  function onApprove() {
    mutate({
      status: Status.SUCCESSFUL
    }, {
      onSuccess: (data) => {
        showNotification({
          message: 'Transaction Updated!',
          type: 'success'
        });

        handleSentEmail(data.data.data);
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
    }, [onApprove, showModal])

  return (
    <Table
      data={transactions?.filter((item) => item.transactionType === type)}
      columns={type === 'sell' ? sellTable : buyTable}
      handleClick={handleClick}
    />
  )
}

export function TransactionList(){

  const { transactions } = useContext(TransactionContext)

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