'use client'

import { formatNumber } from "@/helpers";
import Api from "@/services/api";
import { Assets } from "@/type";
import { createContext, PropsWithChildren } from "react";
import { useQuery } from "react-query";

export const AssetContext = createContext<any>({});

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

  return (
    <AssetContext.Provider
      value={{
        data,
        isLoading,
        getAssetRate,
        filterAssets
      }}
    >
      {children}
    </AssetContext.Provider>
  )
 }