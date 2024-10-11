'use client'
import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import { AccountDisplay, UploadInput, WalletAddressInput } from "../atoms";
import { useAlert, useModal } from "@/hooks";
import { AssetContext } from "@/providers";
import { Assets, Transaction } from "@/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import Api from "@/services/api";
import { storage } from "@/services";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AwaitingTrade } from "./AwaitingTrade";
import { AmountInput } from "../atoms/AmountInput";

type IForm = {
  phoneNumber?: string;
  amount?: string;
}

export function BuyAsset(){
  const { data, filterAssets, bank, isLoadingBank } = useContext(AssetContext);

  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  const { control, formState: { errors }, handleSubmit } = useForm();

  const { handleModalClose, showModal } = useModal();

  const [walletAddress, setWalletAddress] = useState<string>();

  const asset = useMemo(() => filterAssets(data, selectedAsset), [data, filterAssets, selectedAsset]) as Assets;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<any>();

  const searchParams = useSearchParams();

  const [selectedNetwork, setSelectedNetwork] = useState<any>({
    network: "Bitcoin"
  });

  function handleInput(value: string) {
    setWalletAddress(value);
  }

  const { push } = useRouter();

  const { showNotification } = useAlert();

  const { mutate } = useMutation({
    mutationFn: (data: any) => Api.post(`/transactions/`, data)
  });

  const onSubmit: SubmitHandler<IForm> = (value) => {
    const wallet = walletAddress && selectedNetwork?.network;
    const isReadyToSubmit = value.phoneNumber && value.amount && wallet && selectedFile?.name;

    if (isReadyToSubmit) {
      setIsLoading(true);
      const formValue = {
        asset: asset.assetName,
        transactionType: 'buy',
        rate: asset.rate.buy,
        phoneNumber: value?.phoneNumber,
        amount: value?.amount,
        walletAddress: walletAddress,
      }

      const storageRef = ref(storage, `files/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      const network = selectedNetwork?.network;

      uploadTask.on('state_changed', null, null, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          mutate({ ...formValue, screenshotUrl: downloadURL, network }, {
            onSuccess: (data) => {
              showNotification({ message: 'Requested to buy', type: 'success' });
              push(`/trade?tradeId=${data.data.data.id}&type=buy`);
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
            {wallet ? null : <li>Wallet Address</li>}
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

  if (searchParams.get('tradeId') && searchParams.get('type') === 'buy') {
    return <AwaitingTrade type="buy" id={searchParams.get('tradeId') as string} />;
  }

  
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box mt={3.5}>
        {
          isLoadingBank ? (
            <Skeleton
              width='100%'
              height={60}
            />
          ) : (
              <AccountDisplay
                bankAccount={bank?.accountNumber}
                bankName={bank?.bankName}
                holdersName={bank?.holdersName}
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
            label="Buyer’s Phone Number"
            fullWidth
            sx={{ mt: 2 }}
            variant="standard"
            error={!!errors.phoneNumber}
            placeholder="Type buyer’s phone number"
          />
        )}
        // rules={{ required: true }}
      />

      <AmountInput
        control={control}
        selectedAsset={selectedAsset}
        defaultValue={searchParams.get('amount') as string}
        error={!!errors?.amount}
        rate={asset?.rate?.buy}
      />

      <Box mt={3}>
        <WalletAddressInput 
          isInput
          type="buy"
          asset={asset}
          onAssetChange={(value) => setSelectedAsset(value)}
          onInputChange={(value) => handleInput(value)}
          getSelectedNetwork={(value) => setSelectedNetwork(value)}
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
        Buy
      </Button>
    </Box>
  )
}