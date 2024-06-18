'use client'
import { Box, Button, Skeleton, TextField } from "@mui/material";
import { AccountInput, AwaitingTrade, UploadInput, WalletAddressInput } from "..";
import { useContext, useMemo, useState } from "react";
import { AssetContext } from "@/providers";
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useAlert } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "react-query";
import Api from "@/services/api";
import { Assets, Bank, Transaction } from "@/type";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '@/services';

type IForm = {
  phoneNumber?: string;
  amount?: string;
}

export function SellAsset() {

  const { data, filterAssets, isLoading: isLoadingAsset } = useContext(AssetContext);
  
  const searchParams = useSearchParams();

  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  const { control, formState: { errors }, handleSubmit } = useForm();

  const [bankDetails, setBankDetails] = useState<Partial<Bank>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<any>();

  const asset = useMemo(() => filterAssets(data, selectedAsset), [data, filterAssets, selectedAsset]) as Assets;

  const [trade, setTrade] = useState<Transaction>();


  function handleBankChange(value: string, key: 'bankName' | 'accountNumber') {
    setBankDetails({
      ...bankDetails,
      [key]: value,
    })
  }

  const { push } = useRouter();

  const { showNotification } = useAlert();

  const { mutate } = useMutation({
    mutationFn: (data: any) => Api.post(`/transactions/`, data)
  });

  const onSubmit: SubmitHandler<IForm> = (value) => {

    if (bankDetails?.accountNumber && bankDetails?.bankName) {
      setIsLoading(true);
      const formValue = {
        asset: asset.assetName,
        transactionType: 'sell',
        rate: asset.rate.sell,
        phoneNumber: value?.phoneNumber,
        amount: value?.amount,
        bankAccount: bankDetails?.accountNumber,
        bankName: bankDetails?.bankName,
        holdersName: bankDetails?.holdersName || 'Default_name', 
      }
  
      const storageRef = ref(storage, `files/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
      uploadTask.on('state_changed', null, null, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          mutate({ ...formValue, screenshotUrl: downloadURL }, {
            onSuccess: (data) => {
              showNotification({ message: 'Requested to sell', type: 'success' });
              setTrade(data.data.data);
              push(`/trade?tradeId=${data.data.data.id}&type=sell`);
            },
            onSettled: () => setIsLoading(false)
          });
        });
      })
    }
  }


  if (searchParams.get('tradeId') && searchParams.get('type') === 'sell') {
    return <AwaitingTrade trade={trade} type="sell" id={searchParams.get('tradeId') as string}/>;
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
            label="Seller’s Phone Number" 
            fullWidth
            sx={{ mt: 2 }} 
            variant="standard" 
            error={!!errors.assetAddress}
            placeholder="Type seller’s phone number"
          />
        )}
        rules={{ required: true }}
      />

      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Amount"
            fullWidth
            sx={{ mt: 2 }}
            variant="standard"
            error={!!errors.assetAddress}
            type="number"
            placeholder="Type amount"
            defaultValue={searchParams.get('amount')}
          />
        )}
        rules={{ required: true }}
      />

      <Box mt={3}>
        <AccountInput 
          onBankChange={(value) => handleBankChange(value, 'bankName')} 
          onChange={(value) => handleBankChange(value, 'accountNumber')}
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