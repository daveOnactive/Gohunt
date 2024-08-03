'use client'
import { AccountDetails, BankAccounts } from "@/type";
import axios from "axios";
import { createContext, PropsWithChildren, useState } from "react";
import { useQuery } from "react-query";

export const BankVerificationContext = createContext<Partial<{
  banks: BankAccounts[];
  accountDetails: AccountDetails;
  isLoadingBanks: boolean;
  isLoadingAccountDetails: boolean;
  setQueryParams: any;
  queryParams: QueryParams;
}>>({});

const Api = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    'Authorization': 'Bearer sk_test_0ff1cabe532b186f1c4e79d2b63fcb29ae6777e3'
  }
})

type QueryParams = {
  account_number?: string;
  bank_code?: string;
}

export function BankVerificationProvider({ children }: PropsWithChildren) {

  const [queryParams, setQueryParams] = useState<QueryParams>({ account_number: '', bank_code: '' });

  const { data: banks, isLoading: isLoadingBanks } = useQuery<{ data: BankAccounts[]}>({
    queryFn: async () => (await Api.get('/bank')).data,
    queryKey: ['nigeria_banks']
  });

  const { data: accountDetails, isLoading: isLoadingAccountDetails } = useQuery<{ data: AccountDetails }>({
    queryFn: async () => (await Api.get(`/bank/resolve?account_number=${queryParams.account_number}&bank_code=${queryParams.bank_code}`)).data,
    queryKey: ['account_details', queryParams],
    enabled: !!queryParams.account_number && !!queryParams.bank_code
  });

  return (
    <BankVerificationContext.Provider
      value={{
        banks: banks?.data || [],
        accountDetails: accountDetails?.data,
        isLoadingBanks,
        isLoadingAccountDetails,
        setQueryParams,
        queryParams
      }}
    >
      {children}
    </BankVerificationContext.Provider>
  )
}