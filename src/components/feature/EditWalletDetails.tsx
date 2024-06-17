"use client"
import { Card, Typography, Button, TextField, Skeleton } from "@mui/material";
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Api from "@/services/api";
import { useAlert } from "@/hooks";
import { Assets } from "@/type";
import { useContext } from "react";
import { AssetContext } from "@/providers";

type IForm = {
  assetAddress: string;
  buy: number;
  sell: number;
}

export function EditWalletDetails() {
  
  const params = useSearchParams();
  const id = params.get('id');

  const { asset: data, isLoadingAsset } = useContext(AssetContext);

  const { control, formState: { errors }, handleSubmit } = useForm<IForm>({
    defaultValues: {
      assetAddress: data?.assetAddress,
      buy: data?.rate?.buy,
      sell: data?.rate?.sell
    }
  });


  const { push } = useRouter();

  const { showNotification } = useAlert();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: IForm) => Api.put(`/assets/${id}`, data)
  });

  const onSubmit: SubmitHandler<IForm> = (value) => {
    mutate({ ...value, sell: Number(value.sell), buy: Number(value.buy) }, {
      onSuccess: () => {
        showNotification({ message: 'Wallet Details Edited!', type: 'success' });
        queryClient.invalidateQueries('assets')
        push('/dashboard');
      }
    });
  }

  return (
    <Card 
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      elevation={0}
      sx={{
        borderRadius: '28px',
        px: { sm: 9.5, xs: 4 },
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        width: { sm: '50%', xs: '100%' },
        mt: 7
      }}>
      <Typography color='primary' variant="h6" textAlign='center' fontWeight='bold' mb={6.5}>{`Wallet Details (${params.get('name') })`}</Typography>
      {
        isLoadingAsset ? (
          <Skeleton variant="rounded" width='100%' height={30} sx={{ my: 2 }}/>
        ) : (
            <Controller
              name="assetAddress"
              control={control}
              defaultValue={data?.assetAddress}
              render={({ field }) => (
                <TextField {...field} label='Wallet Address' fullWidth sx={{ my: 2 }} variant="standard" disabled={isLoadingAsset} error={!!errors.assetAddress} defaultValue={data?.assetAddress} />
              )}
              rules={{ required: true }}
            />
        )
      }

      <Typography variant="body1" fontWeight='bold'>Rates</Typography>

      {
        isLoadingAsset ? (
          <>
            <Skeleton variant="rounded" width='100%' height={30} sx={{ my: 2 }} />
            <Skeleton variant="rounded" width='100%' height={30} sx={{ my: 2 }} />
          </>
        ) : (
          <>
            <Controller
              name="sell"
              control={control}
                defaultValue={data?.rate?.sell}
              render={({ field }) => (
                <TextField {...field} label='Sell' fullWidth sx={{ my: 2 }} type="number" variant="standard" disabled={isLoadingAsset} error={!!errors.sell} defaultValue={data?.rate?.sell} />
              )}
              rules={{ required: true }}
            />

            <Controller
              name="buy"
              control={control}
              defaultValue={data?.rate?.buy}
              render={({ field }) => (
                <TextField {...field} label='Buy' fullWidth sx={{ my: 2 }} type="number" variant="standard" disabled={isLoadingAsset} error={!!errors.buy} defaultValue={data?.rate?.buy} />
              )}
              rules={{ required: true }}
            />
          </>
        )
      }


      <Button disabled={isLoading} type='submit' variant="contained" color='primary' fullWidth sx={{ mt: 6.5 }}>Save Changes</Button>
    </Card>
  )
}