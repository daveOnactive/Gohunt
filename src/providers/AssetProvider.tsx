'use client'

import { formatNumber } from "@/helpers";
import Api from "@/services/api";
import { Assets, Bank } from "@/type";
import { createContext, PropsWithChildren } from "react";
import { useQuery } from "react-query";

type IAssetProvide = {
  data: Assets[];
  isLoading: boolean;
  getAssetRate: any;
  filterAssets: any;
  bank: Bank;
  isLoadingBank: boolean;
}

export const AssetContext = createContext<Partial<IAssetProvide>>({});

function filterAssets(assets: Assets[], name: string) {
  return assets?.filter((asset) => asset.abbr === name)[0];
}

function getAssetRate(abbr: string, assets?: Assets[]) {

  const asset = filterAssets(assets as Assets[], abbr);

  return { buy: formatNumber(asset.rate.buy, true), sell: formatNumber(asset.rate.sell, true) }
};

export function AssetProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useQuery<Assets[]>({
    queryKey: ['assets'],
    queryFn: async () => (await Api.get('/assets')).data
  });

  const { data: bank, isLoading: isLoadingBank } = useQuery<Bank[]>({
    queryKey: ['bank'],
    queryFn: async () => (await Api.get('/bank')).data
  });

  return (
    <AssetContext.Provider
      value={{
        data,
        isLoading,
        getAssetRate,
        filterAssets,
        bank: bank?.[0],
        isLoadingBank,
      }}
    >
      {children}
    </AssetContext.Provider>
  )
 }