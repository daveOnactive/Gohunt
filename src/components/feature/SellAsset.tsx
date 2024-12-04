'use client'
import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import { AccountInput, AwaitingTrade, UploadInput, WalletAddressInput } from "..";
import { useContext, useMemo, useState } from "react";
import { AssetContext, BankVerificationContext } from "@/providers";
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useAlert, useEmail, useModal } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "react-query";
import Api from "@/services/api";
import { Assets, Bank, BankAccounts, Transaction } from "@/type";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '@/services';
import { AmountInput } from "../atoms/AmountInput";

type IForm = {
  phoneNumber?: string;
  amount?: string;
}

export function SellAsset() {
  const { data, filterAssets, isLoading: isLoadingAsset } = useContext(AssetContext);
  const searchParams = useSearchParams();
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');
  const { control, formState: { errors }, handleSubmit } = useForm();
  const { handleModalClose, showModal } = useModal();
  const [bankDetails, setBankDetails] = useState<Partial<Bank>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();

  const asset = useMemo(() => filterAssets(data, selectedAsset), [data, filterAssets, selectedAsset]) as Assets;

  const { banks, accountDetails, setQueryParams, queryParams, isLoadingAccountDetails, isAccountDetailsError } = useContext(BankVerificationContext);

  function handleBankChange(value: string | BankAccounts | undefined, key: 'bankName' | 'accountNumber') {
    if (typeof value === 'string' && key === 'accountNumber' && value.length === 10) {
      setBankDetails({
        ...bankDetails,
        [key]: value,
      })

      setQueryParams({
        ...queryParams,
        account_number: value
      })
    }

    if (key === 'bankName' && typeof value !== 'string') {
      setQueryParams({
        ...queryParams,
        bank_code: value?.code
      })

      setBankDetails({
        ...bankDetails,
        bankName: value?.name
      })
    }
  }

  const { push } = useRouter();
  const { showNotification } = useAlert();

  const { mutate } = useMutation({
    mutationFn: (data: any) => Api.post(`/transactions/`, data)
  });

  const { sellOrderPlaced } = useEmail();

  const onSubmit: SubmitHandler<IForm> = (value) => {
    const isBank = bankDetails?.bankName && accountDetails?.account_name
    const isReadyToSubmit = value.phoneNumber && value.amount && isBank && selectedFile?.name

    if (isReadyToSubmit) {
      setIsLoading(true);
      const formValue = {
        asset: asset.assetName,
        transactionType: 'sell',
        rate: asset.rate.sell,
        phoneNumber: value?.phoneNumber,
        amount: value?.amount,
        bankAccount: bankDetails?.accountNumber,
        bankName: bankDetails?.bankName,
        holdersName: accountDetails?.account_name || 'Default_name',
      }

      const storageRef = ref(storage, `files/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on('state_changed', null, null, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          mutate({ ...formValue, screenshotUrl: downloadURL }, {
            onSuccess: (data) => {
              sellOrderPlaced(data.data.data as Transaction)
              showNotification({ message: 'Requested to sell', type: 'success' });
              push(`/trade?tradeId=${data.data.data.id}&type=sell`);
            },
            onSettled: () => setIsLoading(false)
          });
        });
      })
    } else {
      showModal(
        <Box>
          <Typography variant="h6">
            You Have to Complete the Following Field Before Submitting
          </Typography>
          <ul>
            {value.phoneNumber ? null : <li>Sellers Phone Number</li>}
            {value.amount ? null : <li>Amount</li>}
            {isBank ? null : <li>Sellers Account Details</li>}
            {selectedFile?.name ? null : <li>Transaction screenshot</li>}
          </ul>
          <Button
            sx={{
              display: 'flex',
              m: 'auto'
            }}
            onClick={handleModalClose}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      )
    }
  }

  if (searchParams.get('tradeId') && searchParams.get('type') === 'sell') {
    return <AwaitingTrade type="sell" id={searchParams.get('tradeId') as string}/>;
  }

  return (
    <Box
      component='form' 
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box mt={3.5}>
        {
          isLoadingAsset ? (
            <Skeleton
              width='100%'
              height={60}
            />
          ) : (
            <WalletAddressInput
              asset={asset}
              onAssetChange={(value) => setSelectedAsset(value)}
            />
          )
        }
      </Box>

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field} 
            label="Seller's Phone Number" 
            fullWidth
            sx={{ 
              mt: 2,
              '& .MuiInputLabel-root': {
                color: 'text.primary'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'primary.main'
              },
              '& .MuiInputLabel-root.Mui-error': {
                color: 'error.main'
              }
            }} 
            variant="standard" 
            error={!!errors.phoneNumber}
            placeholder="Type seller's phone number"
          />
        )}
      />

      <AmountInput
        control={control}
        selectedAsset={selectedAsset}
        defaultValue={searchParams.get('amount') as string}
        error={!!errors?.amount}
        rate={asset?.rate?.sell}
      />
        
      <Box mt={3}>
        <AccountInput
          onBankChange={(bank) => handleBankChange(bank, 'bankName')}
          onChange={(value) => handleBankChange(value, 'accountNumber')}
          banks={banks}
          bankHolderName={accountDetails?.account_name}
          isLoadingHolderName={isLoadingAccountDetails}
          isHolderNameError={isAccountDetailsError}
        />
      </Box>

      <Box my={3}>
        <UploadInput
          getFile={(file) => setSelectedFile(file)}
        />
      </Box>

      <Button
        variant="contained" 
        fullWidth 
        disabled={isLoading}
        type='submit'
      >
        Sell
      </Button>
    </Box>
  )
}