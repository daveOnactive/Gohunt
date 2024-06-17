'use client'
import { Box, Button, TextField } from "@mui/material";
import { AccountInput, UploadInput, WalletAddressInput } from "..";
import { useContext, useMemo, useState } from "react";
import { AssetContext } from "@/providers";
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useAlert } from "@/hooks";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import Api from "@/services/api";
import { Assets, Bank } from "@/type";

type IForm = {
  phoneNumber?: string;
  amount?: string;
}

export function SellAsset() {

  const { data, filterAssets } = useContext(AssetContext);

  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  const { control, formState: { errors }, handleSubmit } = useForm();

  const [bankDetails, setBankDetails] = useState<Partial<Bank>>();

  const asset = useMemo(() => filterAssets(data, selectedAsset), [data, filterAssets, selectedAsset]) as Assets;

  function handleBankChange(value: string, key: 'bankName' | 'accountNumber') {
    setBankDetails({
      ...bankDetails,
      [key]: value,
    })
  }

  const { push } = useRouter();

  const { showNotification } = useAlert();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => Api.post(`/transactions/`, data)
  });

  const onSubmit: SubmitHandler<IForm> = (value) => {
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
    mutate(formValue, {
      onSuccess: () => {
        showNotification({ message: 'Requested to sell', type: 'success' });
        // push('/dashboard');
      }
    });
  }

  return (
    <Box
      component='form' 
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box mt={3.5}>
        <WalletAddressInput
          asset={asset}
          onAssetChange={(value) => setSelectedAsset(value)}
        />
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
        <UploadInput />
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