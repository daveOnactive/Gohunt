'use client'

import Api from "@/services/api";
import { CryptoData } from "@/type/CryptoData";
import { createContext, PropsWithChildren, useMemo } from "react"
import { useQuery } from "react-query";

export const CryptoApiContext = createContext<{
  bitcoinData?: CryptoData[];
  ethData?: CryptoData[];
  usdtData?: CryptoData[];
  isLoadingCryptoData?: boolean;
}>({});

function filterCryptoData(symbol: string, data?: CryptoData[]) {
  return data?.filter((value) => value.symbol === symbol)
}

export function CryptoApiProvider({ children }: PropsWithChildren) {

  const { data, isLoading } = useQuery({
    queryKey: ['cryptoApi'],
    queryFn: async () => (await Api.get<CryptoData[]>('/crypto')).data,
    // refetchInterval: 100,
    // gcTime: 0,
  });

  const cryptoData = (data?.slice(0, 4) || [])

  const bitcoinData = useMemo(() => filterCryptoData('BTC', cryptoData), [cryptoData]);
  const ethData = useMemo(() => filterCryptoData('ETH', cryptoData), [cryptoData]);
  const usdtData = useMemo(() => filterCryptoData('USDT', cryptoData), [cryptoData]);


  return (
    <CryptoApiContext.Provider
      value={{
        bitcoinData,
        ethData,
        usdtData,
        isLoadingCryptoData: isLoading
      }}
    >
      {children}
    </CryptoApiContext.Provider>
  )
}