'use client'
import { Box, Button, TextField } from "@mui/material";
import { AccountDisplay, UploadInput, WalletAddressInput } from "../atoms";
import { useAlert } from "@/hooks";
import { AssetContext } from "@/providers";
import { Assets } from "@/type";
import { useRouter } from "next/navigation";
import { useContext, useState, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import Api from "@/services/api";

type IForm = {
  phoneNumber?: string;
  amount?: string;
}

export function BuyAsset(){
  const { data, filterAssets, bank } = useContext(AssetContext);

  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  const { control, formState: { errors }, handleSubmit } = useForm();

  const [walletAddress, setWalletAddress] = useState<string>();

  const asset = useMemo(() => filterAssets(data, selectedAsset), [data, filterAssets, selectedAsset]) as Assets;

  function handleInput(value: string) {
    setWalletAddress(value);
  }

  const { push } = useRouter();

  const { showNotification } = useAlert();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => Api.post(`/transactions/`, data)
  });

  const onSubmit: SubmitHandler<IForm> = (value) => {
    const formValue = {
      asset: asset.assetName,
      transactionType: 'buy',
      rate: asset.rate.buy,
      phoneNumber: value?.phoneNumber,
      amount: value?.amount,
      walletAddress: walletAddress,
    }

    mutate(formValue, {
      onSuccess: () => {
        showNotification({ message: 'Requested to buy', type: 'success' });
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
        <AccountDisplay
          bankAccount={bank?.accountNumber}
          bankName={bank?.bankName}
          holdersName={bank?.holdersName}
        />
      </Box>

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Buyer’s Phone Number"
            fullWidth
            sx={{ mt: 2 }}
            variant="standard"
            error={!!errors.assetAddress}
            placeholder="Type buyer’s phone number"
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
        <WalletAddressInput 
          isInput
          type="buy"
          asset={asset}
          onAssetChange={(value) => setSelectedAsset(value)}
          onInputChange={(value) => handleInput(value)}
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
        Buy
      </Button>
    </Box>
  )
}