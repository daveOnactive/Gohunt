"use client"
import { Box } from "@mui/material";
import { AssetCard, BankDetailsCard } from "../molecules";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { AssetContext } from "@/providers";
import { DashboardCardSkeleton } from "../skeleton";

export function DashboardCards() {

  const { push } = useRouter();

  const { data, isLoading, bank, isLoadingBank } = useContext(AssetContext);

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {sm: '1fr 1fr', xs: '1fr'},
      gap: 3,
      width: '100%',
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      mt: { xs: 2 }
    }}>
      {
        isLoading && isLoadingBank ? (
          <DashboardCardSkeleton />
        ) : (
          <>
              {
                data?.map(item => (
                  <AssetCard key={item.id} data={item} onClick={() => push(`/dashboard/wallet-details?id=${item.id}&name=${item.abbr}`)} />
                ))
              }
              <BankDetailsCard data={bank} onClick={() => push(`/dashboard/bank-details?id=${bank?.id}`)} />
          </>
        )
      }
    </Box>
  )
}