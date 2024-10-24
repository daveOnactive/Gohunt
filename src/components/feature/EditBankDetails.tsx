'use client'
import { Button, Card, Typography, useTheme } from "@mui/material";
import { AccountInput } from "../atoms";
import { AssetContext, BankVerificationContext } from "@/providers";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Api from "@/services/api";
import { useAlert } from "@/hooks";
import { useQueryClient, useMutation } from "react-query";
import { BankAccounts } from "@/type";

type IForm = {
  bankName: string;
  accountNumber: string;
  holdersName: string;
  id?: string;
}

export function EditBankDetails() {
  const { bank } = useContext(AssetContext);
  const { banks, isAccountDetailsError, isLoadingAccountDetails, accountDetails, setQueryParams } = useContext(BankVerificationContext);
  const [bankDetails, setBankDetails] = useState<Partial<IForm>>();
  const { push } = useRouter();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  
  const theme = useTheme();  // Get theme to handle light/dark mode
  
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

  function handleBankChange(bank?: BankAccounts) {
    setQueryParams({
      account_number: bankDetails?.accountNumber,
      bank_code: bank?.code,
    });

    setBankDetails({
      ...bankDetails,
      bankName: bank?.name
    });
  }

  const onSubmit = () => {
    if (bankDetails?.accountNumber && accountDetails?.account_name) {
      mutate({ ...bankDetails, id: bank?.id, holdersName: accountDetails.account_name }, {
        onSuccess: () => {
          showNotification({ message: 'Bank Details Edited!', type: 'success' });
          queryClient.invalidateQueries(['bank']);
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
      mt: 7,
      bgcolor: theme.palette.background.paper,  // Dynamic background for light/dark mode
      color: theme.palette.text.primary          // Dynamic text color
    }}>
      <Typography 
        color='primary' 
        variant="h6" 
        textAlign='center' 
        fontWeight='bold' 
        mb={6.5}
      >
        Bank Details
      </Typography>

      <AccountInput
        value={{
          holdersName: bank?.holdersName,
          accountNumber: bank?.accountNumber,
          bankName: bank?.bankName
        }}
        onBankChange={handleBankChange}
        onChange={(value) => handleBankDetails(value, 'accountNumber')}
        banks={banks}
        isHolderNameError={isAccountDetailsError}
        isLoadingHolderName={isLoadingAccountDetails}
        bankHolderName={accountDetails?.account_name}
      />

      <Button 
        disabled={isLoading} 
        variant="contained" 
        color='primary' 
        fullWidth 
        sx={{ mt: 6.5 }} 
        onClick={onSubmit}
      >
        Save Changes
      </Button>
    </Card>
  );
}
