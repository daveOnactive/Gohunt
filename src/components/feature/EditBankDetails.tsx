'use client'
import { Button, Card, Typography } from "@mui/material";
import { AccountInput } from "../atoms";
import { AssetContext } from "@/providers";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Api from "@/services/api";
import { useAlert } from "@/hooks";
import { useQueryClient, useMutation } from "react-query";

type IForm = {
  bankName: string;
  accountNumber: string;
  holdersName: string;
  id?: string;
}

export function EditBankDetails(){

  const { bank } = useContext(AssetContext);

  const [bankDetails, setBankDetails] = useState<Partial<IForm>>();

  const { push } = useRouter();

  const { showNotification } = useAlert();

  const queryClient = useQueryClient();

  useEffect(() => {
    setBankDetails({
      bankName: bank?.bankName,
      accountNumber: bank?.accountNumber,
      holdersName: bank?.holdersName,
    });
  }, [bank]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Partial<IForm>) => Api.patch(`/bank`, data)
  });

  function handleBankDetails(value: string, key: 'bankName' | 'accountNumber') {
    setBankDetails({
      ...bankDetails,
      [key]: value,
    });
  }

  const onSubmit = () => {
    if (bankDetails?.accountNumber && bankDetails.bankName) {
      mutate({ ...bankDetails, id: bank?.id }, {
        onSuccess: () => {
          showNotification({ message: 'Bank Details Edited!', type: 'success' });
          queryClient.invalidateQueries(['bank'])
          push('/dashboard');
        }
      });
    }
  }

  return (
    <Card elevation={0} sx={{
      borderRadius: '28px',
      px: { sm: 9.5, xs: 4 },
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      mx: 'auto',
      width: { sm: '50%', xs: '100%' },
      mt: 7
    }}>
      <Typography color='primary' variant="h6" textAlign='center' fontWeight='bold' mb={6.5}>Bank Details</Typography>

      <AccountInput
        value={{
          holdersName: bank?.holdersName,
          accountNumber: bank?.accountNumber,
          bankName: bank?.bankName
        }}
        onBankChange={(value) => handleBankDetails(value?.name as string, 'bankName')}
        onChange={(value) => handleBankDetails(value, 'accountNumber')}
      />

      <Button disabled={isLoading} variant="contained" color='primary' fullWidth sx={{ mt: 6.5 }} onClick={onSubmit}>Save Changes</Button>
    </Card>
  )
}