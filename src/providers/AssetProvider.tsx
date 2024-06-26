'use client'

import { formatNumber } from "@/helpers";
import { useDataSnapshot } from "@/hooks";
import Api from "@/services/api";
import { Assets, Bank } from "@/type";
import { useSearchParams } from "next/navigation";
import { createContext, PropsWithChildren } from "react";
import { useQuery } from "react-query";

type IAssetProvide = {
  data: Assets[];
  isLoading: boolean;
  getAssetRate: any;
  filterAssets: any;
  bank: Bank;
  isLoadingBank: boolean;
  asset: Assets;
  isLoadingAsset: boolean;
}

export const AssetContext = createContext<Partial<IAssetProvide>>({});

function filterAssets(assets: Assets[], name: string) {
  return assets?.filter((asset) => asset.abbr === name)[0];
}

function getAssetRate(abbr: string, assets?: Assets[]) {

  const asset = filterAssets(assets as Assets[], abbr);

  return { buy: formatNumber(asset?.rate?.buy, true), sell: formatNumber(asset?.rate?.sell, true) }
};

export function AssetProvider({ children }: PropsWithChildren) {

  const params = useSearchParams();
  const id = params.get('id');

  const { data: assets } = useDataSnapshot<Assets>({
    path: 'assets'
  })

  const { data: bank } = useDataSnapshot<Bank>({
    path: 'bank'
  });

  const { isLoading: isLoadingAsset, data: asset } = useQuery<Assets>({
    queryKey: ['asset', id],
    queryFn: async () => (await Api.get(`/assets/${id?.toString()}`)).data,
    enabled: !!id,
  });

  return (
    <AssetContext.Provider
      value={{
        data: assets,
        isLoading: assets === undefined,
        getAssetRate,
        filterAssets,
        bank: bank?.[0],
        isLoadingBank: bank === undefined,
        asset,
        isLoadingAsset
      }}
    >
      {children}
    </AssetContext.Provider>
  )
 }