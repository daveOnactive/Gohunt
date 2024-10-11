'use client'

import Api from "@/services/api";
import { CryptoData } from "@/type/CryptoData";
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react"
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

  const [data, setData] = useState<CryptoData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const response = await Api.get('/crypto');
        const result = await response.data;
        setData(result);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();

    intervalId = setInterval(fetchData, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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